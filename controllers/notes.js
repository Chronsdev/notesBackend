const config = require('../utils/config')
const notesRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req, res) => {
	const notes = await Note.find({})
	res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id)
	res.json(note)
})

const setToken = (req) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7) 
	}
	return null
} 

notesRouter.post('/', async (req, res) => {
	const { body } = req

	const token = setToken(req)
	const decodedToken = jwt.verify(token, config.SECRET)
	if (!token || !decodedToken.id) {
		return res.status(402).send({error: 'token mising or undefined'})
	}

	const user = await User.findById(decodedToken.id)

	const note = new Note({
		title: body.title,
		homework: body.homework,
		date: new Date(),
		checked: body.checked || false,
		user: user._id	
	})

	const noteSaved = await note.save()
	user.notes = user.notes.concat(noteSaved)
	await user.save()
	res.json(noteSaved)
})

notesRouter.put('/:id', async (req, res) => {
	const { body } = req

	const note = {
		title: body.title,
		homework: body.homework,
		date: Date(),
		checked: body.checked || false
	}

	const updateNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
	res.json(updateNote)
})

notesRouter.delete('/:id', async (req, res) => {
	await Note.findByIdAndRemove(req.params.id)
	res.status(204).end()
})



module.exports = notesRouter