import mysql, { PoolOptions } from 'mysql2/promise';
import UserStreak from '../interfaces/UserStreak';

require('dotenv').config();

async function updateUserStreak(user: UserStreak) {
  const access: PoolOptions = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  };

  const db = mysql.createPool(access);

  const connection: any = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      'UPDATE users SET current_streak=?,longest_streak=?,viewed_today=? WHERE email=?',
      [user.currentStreak, user.longestStreak, user.viewedToday, user.email],
    );

    await connection.commit();
  } finally {
    connection.release();
  }
}

export default updateUserStreak;
