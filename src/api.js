"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const user = require ('./routes/user')
const organization = require ('./routes/organization')
const interests = require ('./routes/interests')
const domain = require ('./routes/domain')
const conversation = require ('./routes/conversation')
const message = require ('./routes/message')
const match = require ('./routes/match')


const appointment = require('./routes/appointment')
const ice_questions = require('./routes/ice_questions')

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Backend for peeroulete'
    });
});

// API routes
api.use('/auth'  , auth);
api.use('/user', user);
api.use('/organization', organization);
api.use('/interests', interests);
api.use('/domain', domain);
api.use('/conversation', conversation);
api.use('/message', message);
api.use('/appointment', appointment);
api.use('/match', match);

api.use('/ice_questions', ice_questions);

module.exports = api;
