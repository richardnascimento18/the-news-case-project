import mysql, { PoolOptions } from 'mysql2/promise';
import axios from 'axios';

require('dotenv').config();

const access: PoolOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const pool = mysql.createPool(access);

async function getAdmin(email: string) {
  const [adminRows] = await pool.query(
    `SELECT email, 'admin' AS badge FROM users WHERE email = ? AND type = 'admin'`,
    [email],
  );
  return adminRows[0];
}

async function getStatisticsTable() {
  const [userCountRows]: any = await pool.query(
    `SELECT COUNT(*) AS userCount FROM users WHERE type='user'`,
  );

  const [newsletterCountRows]: any = await pool.query(
    `SELECT COUNT(*) AS newsletterCount FROM users_newsletters`,
  );

  const [utmSourceRows]: any = await pool.query(
    `SELECT utm_source, COUNT(*) AS count FROM newsletters GROUP BY utm_source ORDER BY count DESC LIMIT 1`,
  );

  const [lastNewsletterRows]: any = await pool.query(
    `SELECT id FROM newsletters ORDER BY created_at ASC LIMIT 1`,
  );

  let isWebsiteUp: boolean = false;
  const websiteHealthCall = await axios
    .get('http://localhost:3000/ping')
    .then((response) => {
      isWebsiteUp = response.data.isUp;
    })
    .catch(() => (isWebsiteUp = false));

  const statisticsTable = [
    {
      title: 'The News Atualizações',
      data: [
        {
          statisticName: 'Último Post Registrado:',
          statisticValue: lastNewsletterRows[0]?.id || 'N/A',
        },
        {
          statisticName: 'Site do Usuário no ar:',
          statisticValue: isWebsiteUp ? 'SIM' : 'NÃO',
        },
      ],
    },
    {
      title: 'Estátisticas',
      data: [
        {
          statisticName: '# Usuários:',
          statisticValue: userCountRows[0].userCount,
        },
        {
          statisticName: '# Newsletters Abertas:',
          statisticValue: newsletterCountRows[0].newsletterCount,
        },
        {
          statisticName: 'utm_source mais convertido:',
          statisticValue: utmSourceRows[0]?.utm_source || 'N/A',
        },
      ],
    },
  ];

  return statisticsTable;
}

async function getListArray() {
  const [engagedUsersRows]: any = await pool.query(
    `SELECT u.email, u.badge, COUNT(un.newsletter_id) AS newslettersRead
     FROM users u
     LEFT JOIN users_newsletters un ON u.email = un.user_email
     WHERE u.type = 'user'
     GROUP BY u.email, u.badge
     ORDER BY newslettersRead DESC
     LIMIT 5`,
  );

  const listArray = [
    {
      listHeader: {
        title: 'Usuários Mais Engajados',
        type: 'De Todo o Tempo',
      },
      data: engagedUsersRows.map((row: any) => ({
        leftData: row.email,
        additional: row.badge,
        rightData: `Lido: ${row.newslettersRead}`,
      })),
    },
  ];

  return listArray;
}

async function getGraphArray() {
  const [newUsersRows]: any = await pool.query(
    `SELECT created_at AS date, COUNT(*) AS count FROM users GROUP BY date ORDER BY created_at`,
  );

  const [weekdayActivityRows]: any = await pool.query(
    `SELECT DAYNAME(date) AS weekday, COUNT(*) AS count FROM users_newsletters GROUP BY weekday`,
  );

  const [utmActivityRows]: any = await pool.query(
    `SELECT utm_source, COUNT(*) AS count FROM newsletters GROUP BY utm_source`,
  );

  const graphArray = [
    {
      graphHeader: {
        title: 'Novos Usuários',
        type: 'line',
        options: ['Mais velho x Mais Novo'],
      },
      data: [
        {
          option: 'Mais velho x Mais Novo',
          xName: 'data',
          yName: 'quantidade',
          graphData: newUsersRows.map((row: any) => ({
            x: row.date,
            y: row.count,
          })),
        },
      ],
    },
    {
      graphHeader: {
        title: 'Gráfico de Estátisticas',
        type: 'bar',
        options: [
          'Dia da Semana Mais Ativo',
          'Quantidade por utm_source',
          'Maior Atividade (data mais antiga - data mais nova)',
        ],
      },
      data: [
        {
          option: 'Dia da Semana Mais Ativo',
          xName: 'dia da semana',
          yName: 'quantidade',
          graphData: weekdayActivityRows.map((row: any) => ({
            x: row.weekday,
            y: row.count,
          })),
        },
        {
          option: 'Quantidade por utm_source',
          xName: 'utm_source',
          yName: 'quantidade',
          graphData: utmActivityRows.map((row: any) => ({
            x: row.utm_source,
            y: row.count,
          })),
        },
        {
          option: 'Maior Atividade (data mais antiga - data mais nova)',
          xName: 'data',
          yName: 'quantidade',
          graphData: newUsersRows.map((row: any) => ({
            x: row.date,
            y: row.count,
          })),
        },
      ],
    },
  ];

  return graphArray;
}

export async function getAdminData(email: string) {
  const admin = await getAdmin(email);
  const statisticsTable = await getStatisticsTable();
  const listArray = await getListArray();
  const graphArray = await getGraphArray();

  return {
    admin,
    statisticsTable,
    listArray,
    graphArray,
  };
}

export default async function main(email: string) {
  const adminData = await getAdminData(email);

  return {
    message: 'Done!',
    objects: adminData,
  };
}
