const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)
server.listen(config.PORT, () => {
	logger.info(`The server is running on port ${config.PORT}`)
})