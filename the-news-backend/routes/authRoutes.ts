// src/routes/authRoutes.ts
import { Router, Request, Response } from 'express';
import mysql, { PoolOptions } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const poolOptions: PoolOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};
const pool = mysql.createPool(poolOptions);
const JWT_SECRET = process.env.JWT_SECRET || 'thenewsisthebest';

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email required' });
      return;
    }
    const [rows]: any = await pool.query(
      'SELECT email, type FROM users WHERE email = ? AND type = "user"',
      [email],
    );
    if (!rows.length) {
      res.status(401).json({ error: 'User not found' });
      return;
    }
    const user = rows[0];
    const token = jwt.sign({ email: user.email, type: user.type }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ message: 'Logged in as user' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/admin/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }
    const [rows]: any = await pool.query(
      'SELECT email, password, type FROM users WHERE email = ? AND type = "admin"',
      [email],
    );
    if (!rows.length) {
      res.status(401).json({ error: 'Admin not found' });
      return;
    }
    const admin = rows[0];
    if (admin.password !== password) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign(
      { email: admin.email, type: admin.type },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ message: 'Logged in as admin' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out' });
});

router.get('/verify', (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const redirectPath =
      decoded.type === 'admin' ? 'admin-dashboard' : 'user-dashboard';
    res.json({ redirect: redirectPath, user: decoded });
  });
});

module.exports = router;
