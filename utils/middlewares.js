const logger = require('./logger')

const requestLogger = (req, res, next) => {
	logger.info('Method: ', req.method)
	logger.info('Path: ', req.path)
	logger.info('body: ', req.body)

	next()
}

const unknowEndpoint = (req, res) => {
	res.status(404).end()
}

const errorHandler = (error, req, res, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformetted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).send({ error: error.message })
	} else if (error.name === 'JsonWebTokenErro') {
		return res.status(400).send({ error: 'invalid token' })
	}

	next(error)
}


module.exports = {
	requestLogger,
	unknowEndpoint
}