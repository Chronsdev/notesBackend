const usersRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRoute.get('/', async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

usersRoute.post('/', async (req, res) => {
	const { body } = req

	if (body.password.length <= 6) {
		return res.status(404).json({error: 'password is to less length'})
	} 

	const saltround = 10
	const passwordHash = await bcrypt.hash(body.password, saltround)

	if (body.age <= 13 || body.age >= 50) {
		return res.status(404).json({error: 'the age is to much old or to much young'})
	}

	const user = new User({
		username: body.username,
		name: body.name,
		age: body.age,
		passwordHash
	})

	const userSaved = await user.save()
	res.json(userSaved)
})

usersRoute.delete('/:id', async (req, res) => {
	await User.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = usersRoute