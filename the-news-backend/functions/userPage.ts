import mysql, { PoolOptions } from 'mysql2/promise';

require('dotenv').config();

const access: PoolOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const pool = mysql.createPool(access);

export async function getUserData(email: string) {
  const connection = await pool.getConnection();

  connection.beginTransaction();
  const [rows] = await pool.query(
    `SELECT email, level, exp, user_rank AS \`rank\`, current_streak AS currentStreak, 
    longest_streak AS longestStreak, badge FROM users WHERE email = ?`,
    [email],
  );

  connection.commit();
  connection.release();
  return rows[0];
}

export async function getListArray(email: string) {
  const connection = await pool.getConnection();

  connection.beginTransaction();
  const [rankingRows]: any = await pool.query(
    `SELECT email, badge, user_rank AS \`rank\` FROM users WHERE type='user' ORDER BY user_rank LIMIT 5`,
  );

  const [historyRows]: any = await pool.query(
    `SELECT date AS date, newsletter_id AS post_id FROM users_newsletters WHERE user_email = ? 
    ORDER BY date DESC LIMIT 5`,
    [email],
  );
  connection.commit();
  connection.release();

  return [
    {
      listHeader: { title: 'Usuários Mais Engajados', type: 'Dessa Semana' },
      data: rankingRows.map((row: any) => ({
        leftData: row.email,
        additional: row.badge,
        rightData: `Rank: #${row.rank}`,
      })),
    },
    {
      listHeader: {
        title: 'Histórico de leitura',
        subtitle: `total lido: ${historyRows.length}`,
        type: 'Mais Recente',
      },
      data: historyRows.map((row: any) => ({
        leftData: row.date,
        rightData: `#${row.post_id}`,
      })),
    },
  ];
}

export async function getGraphArray(email: string) {
  const connection = await pool.getConnection();

  connection.beginTransaction();

  const [periodRows]: any = await connection.query(
    `SELECT created_at AS date, COUNT(*) AS count FROM newsletters
    GROUP BY date ORDER BY created_at`,
  );

  const [weekdayRows]: any = await pool.query(
    `SELECT DAYNAME(created_at) AS weekday, COUNT(*) AS count FROM newsletters
    GROUP BY weekday`,
  );

  const [streakRows]: any = await pool.query(
    `SELECT current_streak, longest_streak FROM users WHERE email = ? AND type='user'`,
    [email],
  );

  connection.commit();
  connection.release();

  const currentStreak = streakRows[0]?.current_streak || 0;

  const [currentStreakNewsletters]: any = await pool.query(
    `SELECT DATE_FORMAT(date, '%d-%m-%Y') AS date, COUNT(*) AS count 
     FROM users_newsletters 
     WHERE user_email = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
     GROUP BY date
     ORDER BY date`,
    [email, currentStreak],
  );

  const [allTimeNewsletters]: any = await pool.query(
    `SELECT DATE_FORMAT(date, '%d-%m-%Y') AS date, COUNT(*) AS count 
     FROM users_newsletters 
     WHERE user_email = ?
     GROUP BY date
     ORDER BY date`,
    [email],
  );

  return [
    {
      graphHeader: {
        title: 'Gráfico de Período',
        type: 'line',
        options: ['Mais velho x Mais Novo'],
      },
      data: [
        {
          option: 'Mais velho x Mais Novo',
          xName: 'data',
          yName: 'quantidade',
          graphData: periodRows.map((row: any) => ({
            x: row.date,
            y: row.count,
          })),
        },
      ],
    },
    {
      graphHeader: {
        title: 'Gráfico de Estatísticas',
        type: 'bar',
        options: [
          'Dia da Semana Mais Ativo',
          'Sequência Atual',
          'Todo o Tempo',
        ],
      },
      data: [
        {
          option: 'Dia da Semana Mais Ativo',
          xName: 'dia da semana',
          yName: 'quantidade',
          graphData: weekdayRows.map((row: any) => ({
            x: row.weekday,
            y: row.count,
          })),
        },
        {
          option: 'Sequência Atual',
          xName: 'dia',
          yName: 'quantidade',
          graphData: currentStreakNewsletters.map((row: any) => ({
            x: row.date,
            y: row.count,
          })),
        },
        {
          option: 'Todo o Tempo',
          xName: 'dia',
          yName: 'quantidade',
          graphData: allTimeNewsletters.map((row: any) => ({
            x: row.date,
            y: row.count,
          })),
        },
      ],
    },
  ];
}

export default async function main(email: string) {
  const userObject = await getUserData(email);
  const listArray = await getListArray(email);
  const graphArray = await getGraphArray(email);

  return {
    message: 'Done!',
    objects: { userObject, listArray, graphArray },
  };
}
