import mysql, { PoolOptions } from 'mysql2/promise';

require('dotenv').config();

export default async function updateUserRankInDatabase(
  email: string,
  newRank: string,
): Promise<object | void> {
  const access: PoolOptions = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  };

  const db = mysql.createPool(access);

  const connection = await db.getConnection();

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await connection.query('SET SESSION innodb_lock_wait_timeout = 50');
      await connection.beginTransaction();

      const [result] = await connection.query(
        'UPDATE users SET user_rank=? WHERE email=?',
        [newRank, email],
      );

      await connection.commit();
      break;
    } catch (error) {
      if (error.code === 'ER_LOCK_WAIT_TIMEOUT') {
        attempt++;
        if (attempt >= maxRetries) {
          return { errorMessage: 'Max retries reached, aborting.' };
        }
      } else {
        return { errorMessage: error.message };
      }
    } finally {
      connection.release();
    }
  }
}
