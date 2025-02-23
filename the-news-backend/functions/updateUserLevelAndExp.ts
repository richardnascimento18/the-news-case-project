import UserLevelAndExp from '../interfaces/UserLevelAndExp';
import mysql, { PoolOptions } from 'mysql2/promise';
import determineUserLevelAndExp from './determineUserLevelAndExp';

require('dotenv').config();

async function updateUserLevelAndExp(user: UserLevelAndExp): Promise<void> {
  const updatedUser = determineUserLevelAndExp(user);

  const access: PoolOptions = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  };

  const db = mysql.createPool(access);

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      'UPDATE users SET level=?,exp=? WHERE email=?',
      [updatedUser.level, updatedUser.exp, updatedUser.email],
    );

    await connection.commit();
  } finally {
    connection.release();
  }
}

export default updateUserLevelAndExp;
