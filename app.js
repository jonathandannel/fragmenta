const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const appRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const protectedRouter = require('./routes/protected');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', appRouter);
app.use('/auth', authRouter);
app.use('/protected', protectedRouter);

module.exports = app;
