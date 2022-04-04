const config = require('../utils/config')
const loginRoute = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')


loginRoute.post('/', async (req, res) => {
	const { body } = req

	const user = await User.findOne({username:body.username})
	const passwordCorrect = user === null
	? false
	: await bcrypt.compare(body.password, user.passwordHash)


	if (!user || !passwordCorrect) {
		res.status(402).send({error: 'username or password invalid'})
	}

	const tokenInfo = {
		username: user.username,
		name: user.name,
		id: user.id
	}

	const token = jwt.sign(tokenInfo, config.SECRET)

	res.status(202).send({
		token, username: user.username, name: user.name, age: user.age
	})
})

module.exports = loginRoute