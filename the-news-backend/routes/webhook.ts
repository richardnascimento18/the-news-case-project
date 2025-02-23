const webhookExpress = require('express');
const webhookRouter = webhookExpress.Router();

require('dotenv').config();

import { Request, Response } from 'express';
import mysql, { PoolOptions } from 'mysql2/promise';
import determineUserBadge from '../functions/determineUserBadge';
import { determineUserRank } from '../functions/determineUserRank';
import User from '../interfaces/User';
import updateUsersRank from '../functions/updateUsersRank';
import updateUserLevelAndExp from '../functions/updateUserLevelAndExp';
import UserLevelAndExp from '../interfaces/UserLevelAndExp';
import updateUserBadge from '../functions/updateUserBadge';
import determineStreak from '../functions/determineStreak';
import updateUserStreak from '../functions/updateUserStreak';

const access: PoolOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
};

const db = mysql.createPool(access);

webhookRouter.get('/', async (req: Request, res: Response) => {
  try {
    const {
      email,
      post_id,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_channel,
    } = req.query;

    if (!email || !post_id) {
      return res
        .status(400)
        .json({ error: 'Email and post_id params are required' });
    }

    const connection = await db.getConnection();
    const emailExists: any = await db.query(
      'SELECT email FROM users WHERE email=?',
      [email],
    );

    const relationShipExists: any = await db.query(
      'SELECT * FROM users_newsletters WHERE user_email=? AND newsletter_id=?',
      [email, post_id],
    );

    const newsletterExists: any = await db.query(
      'SELECT id FROM newsletters WHERE id=?',
      [post_id],
    );

    if (
      !emailExists[0].length &&
      !newsletterExists[0].length &&
      !relationShipExists[0].length
    ) {
      const userBadge = determineUserBadge(0);
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '/');

      const user: User = {
        email,
        newslettersRead: 1,
        currentRank: '000',
      };

      const userLevelAndExp: UserLevelAndExp = {
        email,
        amountOfNewslettersRead: 1,
        level: 0,
        exp: 0,
      };

      const users: any = await db.query(`
        SELECT 
          u.email,
          COUNT(un.newsletter_id) AS newslettersRead,
          u.user_rank AS currentRank
        FROM 
          users u
        LEFT JOIN 
          users_newsletters un ON u.email = un.user_email
        GROUP BY 
          u.email, u.user_rank;
      `);

      const updatedUsersRank = determineUserRank(users[0], user);

      await connection.beginTransaction();

      await connection.query(
        'INSERT INTO users (email,badge,created_at) VALUES (?,?,?)',
        [email, userBadge, today],
      );

      await connection.query(
        'INSERT INTO users_newsletters (user_email, newsletter_id, date) VALUES (?, ?, ?)',
        [email, post_id, today],
      );

      await connection.query(
        'INSERT INTO newsletters (id, utm_source, utm_medium, utm_campaign, utm_channel, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [
          post_id,
          utm_source || null,
          utm_medium || null,
          utm_campaign || null,
          utm_channel || null,
          today,
        ],
      );

      await connection.commit();
      connection.release();

      const userReadNewsletters: any = await db.query(
        `
          SELECT 
            user_email AS email,
            newsletter_id AS post_id,
            date AS date
          FROM 
            users_newsletters
          WHERE 
            user_email = ?;
        `,
        [email],
      );

      const currentUserStreak: any = await db.query(
        `
          SELECT 
            email AS email,
            current_streak AS currentStreak,
            longest_streak AS longestStreak,
            viewed_today AS viewedToday
          FROM 
            users
          WHERE 
            email=?;
        `,
        [email],
      );

      const updatedUserStreak = determineStreak(
        userReadNewsletters[0],
        currentUserStreak[0][0],
      );

      await updateUserStreak(updatedUserStreak);

      await updateUsersRank(updatedUsersRank);
      await updateUserLevelAndExp(userLevelAndExp);
    } else if (
      emailExists[0].length > 0 &&
      newsletterExists[0].length > 0 &&
      !relationShipExists[0].length
    ) {
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      await connection.beginTransaction();

      await connection.query(
        'INSERT INTO users_newsletters (user_email, newsletter_id, date) VALUES (?, ?, ?)',
        [email, post_id, today],
      );

      const user: any = await db.query(
        `
        SELECT 
          u.email,
          COUNT(un.newsletter_id) AS newslettersRead,
          u.user_rank AS currentRank
        FROM 
          users u
        LEFT JOIN 
          users_newsletters un ON u.email = un.user_email
        WHERE
          u.email = ?`,
        [email],
      );

      const users: any = await db.query(`
        SELECT 
          u.email,
          COUNT(un.newsletter_id) AS newslettersRead,
          u.user_rank AS currentRank
        FROM 
          users u
        LEFT JOIN 
          users_newsletters un ON u.email = un.user_email
        GROUP BY 
          u.email, u.user_rank;
      `);

      await connection.commit();
      connection.release();

      const userLevelAndExp: any = await db.query(
        `
        SELECT 
          u.email,
          COUNT(un.newsletter_id) AS amountOfNewslettersRead,
          u.level,
          u.exp
        FROM 
          users u
        LEFT JOIN 
          users_newsletters un ON u.email = un.user_email
        WHERE
          u.email = ?`,
        [email],
      );

      const userReadNewsletters: any = await db.query(
        `
          SELECT 
            user_email AS email,
            newsletter_id AS post_id,
            date AS date
          FROM 
            users_newsletters
          WHERE 
            user_email = ?;
        `,
        [email],
      );

      const currentUserStreak: any = await db.query(
        `
          SELECT 
            email AS email,
            current_streak AS currentStreak,
            longest_streak AS longestStreak,
            viewed_today AS viewedToday
          FROM 
            users
          WHERE 
            email=?;
        `,
        [email],
      );

      const updatedUserStreak = determineStreak(
        userReadNewsletters[0],
        currentUserStreak[0][0],
      );

      await updateUserStreak(updatedUserStreak);

      const updatedUsersRank = determineUserRank(users, user);
      await updateUsersRank(updatedUsersRank);
      await updateUserLevelAndExp(userLevelAndExp[0][0]);
      await updateUserBadge(userLevelAndExp[0][0]);
    } else if (
      emailExists[0].length > 0 &&
      !newsletterExists[0].length &&
      !relationShipExists[0].length
    ) {
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      await connection.beginTransaction();

      await connection.query(
        'INSERT INTO users_newsletters (user_email, newsletter_id, date) VALUES (?, ?, ?)',
        [email, post_id, today],
      );

      await connection.query(
        'INSERT INTO newsletters (id, utm_source, utm_medium, utm_campaign, utm_channel, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [
          post_id,
          utm_source || null,
          utm_medium || null,
          utm_campaign || null,
          utm_channel || null,
          today,
        ],
      );

      await connection.commit();
      connection.release();

      const users: any = await db.query(`
        SELECT 
          u.email,
          COUNT(un.newsletter_id) AS newslettersRead,
          u.user_rank AS currentRank
        FROM 
          users u
        LEFT JOIN 
          users_newsletters un ON u.email = un.user_email
        GROUP BY 
          u.email, u.user_rank;
      `);

      const userLevelAndExp: any = await db.query(
        `
        SELECT 
          u.email,
          COUNT(un.newsletter_id) AS amountOfNewslettersRead,
          u.level,
          u.exp
        FROM 
          users u
        LEFT JOIN 
          users_newsletters un ON u.email = un.user_email
        WHERE
          u.email = ?`,
        [email],
      );

      const userReadNewsletters: any = await db.query(
        `
          SELECT 
            user_email AS email,
            newsletter_id AS post_id,
            date AS date
          FROM 
            users_newsletters
          WHERE 
            user_email = ?;
        `,
        [email],
      );

      const currentUserStreak: any = await db.query(
        `
          SELECT 
            email AS email,
            current_streak AS currentStreak,
            longest_streak AS longestStreak,
            viewed_today AS viewedToday
          FROM 
            users
          WHERE 
            email=?;
        `,
        [email],
      );

      const updatedUserStreak = determineStreak(
        userReadNewsletters[0],
        currentUserStreak[0][0],
      );

      await updateUserStreak(updatedUserStreak);

      const updatedUsersRank = determineUserRank(users[0]);
      await updateUsersRank(updatedUsersRank);

      await updateUserLevelAndExp(userLevelAndExp[0][0]);
      await updateUserBadge(userLevelAndExp[0][0]);
    } else if (
      !emailExists[0].length &&
      newsletterExists[0].length > 0 &&
      !relationShipExists[0].length
    ) {
      const userBadge = determineUserBadge(0);
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      await connection.beginTransaction();

      await connection.query(
        'INSERT INTO users_newsletters (user_email, newsletter_id, date) VALUES (?, ?, ?)',
        [email, post_id, today],
      );

      await connection.query(
        'INSERT INTO users (email,badge,created_at) VALUES (?,?,?)',
        [email, userBadge, today],
      );

      await connection.commit();
      connection.release();

      const users: any = await db.query(`
        SELECT 
          u.email,
          COUNT(un.newsletter_id) AS newslettersRead,
          u.user_rank AS currentRank
        FROM 
          users u
        LEFT JOIN 
          users_newsletters un ON u.email = un.user_email
        GROUP BY 
          u.email, u.user_rank;
      `);

      const userLevelAndExp: UserLevelAndExp = {
        email,
        amountOfNewslettersRead: 1,
        level: 0,
        exp: 0,
      };

      const userReadNewsletters: any = await db.query(
        `
          SELECT 
            user_email AS email,
            newsletter_id AS post_id,
            date AS date
          FROM 
            users_newsletters
          WHERE 
            user_email = ?;
        `,
        [email],
      );

      const currentUserStreak: any = await db.query(
        `
          SELECT 
            email AS email,
            current_streak AS currentStreak,
            longest_streak AS longestStreak,
            viewed_today AS viewedToday
          FROM 
            users
          WHERE 
            email=?;
        `,
        [email],
      );

      const updatedUserStreak = determineStreak(
        userReadNewsletters[0],
        currentUserStreak[0][0],
      );

      await updateUserStreak(updatedUserStreak);

      const updatedUsersRank = determineUserRank(users[0]);
      await updateUsersRank(updatedUsersRank);
      await updateUserLevelAndExp(userLevelAndExp);
    } else if (
      emailExists[0].length > 0 &&
      newsletterExists[0].length > 0 &&
      relationShipExists[0].length > 0
    ) {
      return res
        .status(400)
        .json({ error: 'User already read this newsletter' });
    }

    res.redirect('http://localhost:5173/?email=' + email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = webhookRouter;
