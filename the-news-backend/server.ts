import { authMiddleware } from './middleware/authMiddleware';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const webhookRouterModule = require('./routes/webhook');
const pingRouterModule = require('./routes/ping');
const userDashboardRouterModule = require('./routes/userdashboard');
const adminDashboardRouterModule = require('./routes/admindashboard');
const authRoutesRouterModule = require('./routes/authRoutes');

app.use('/webhook', webhookRouterModule);
app.use('/ping', pingRouterModule);
app.use('/user', authMiddleware, userDashboardRouterModule);
app.use('/admin', authMiddleware, adminDashboardRouterModule);
app.use('/auth', authRoutesRouterModule);

app.listen(port);
