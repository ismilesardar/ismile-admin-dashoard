/**
 * Date: 09/07/2023
 * Subject: E-comers Project server app.js
 * Auth: Ismile Sardar
 */

//core module require
const path = require('path');
const {readdirSync} = require('fs');
//Third-parity module require
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimite = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

//All Third-parity modules use middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//route limiter
const limiter = rateLimite({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);

readdirSync('./routes').map(fill => app.use('/api/v1', require(`./routes/${fill}`)));
//undefine router
app.use('*',(req,res) => {
    res.status(404).send('This is Rong Router');
});
//Database connected
mongoose.connect(process.env.DATA_BASE)
        .then((value) =>{
            console.log('Database Connected');
        })
        .catch((err) => {
            console.log(err);
        });

//module exports
module.exports = app;  