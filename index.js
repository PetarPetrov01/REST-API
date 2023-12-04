const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const session = require('./middlewares/session');
const trimBody = require('./middlewares/trimBody');
const queryParams = require('./middlewares/queryParams');

const userController = require('./controllers/userController');
const propertyController = require('./controllers/propertyController');
const profileController = require('./controllers/profileController');

const connectionString = process.env.DATABASE_URL || 'mongodb://localhost:27017/luxliving';
start();

async function start() {
    const conn = await mongoose.connect(connectionString);
    console.log(conn.connection.host);
    console.log('Connected to database');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(session());
    app.use(trimBody());
    app.use(queryParams());

    app.use('/users', userController);
    app.use('/data/catalog', propertyController);
    app.use('/profile', profileController);

    app.listen(3030, () => console.log(`Server started on ${process.env.PORT}`));
}

