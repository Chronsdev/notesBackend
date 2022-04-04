const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')
const usersRoute = require('./controllers/users')
const loginRoute = require('./controllers/logins')
const noteRoute = require('./controllers/notes')
const middlewares = require('./utils/middlewares')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI).then(() => {
	logger.info('Connected to MongoDB')
}).catch(err => logger.error('Failed to connect to MongoDB', err.message))

app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)

app.use('/api/users', usersRoute)
app.use('/api/login', loginRoute)
app.use('/api/notes', noteRoute)

app.use(middlewares.unknowEndpoint)

module.exports = app