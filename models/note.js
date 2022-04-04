const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	homework: {
		type: String,
		require: true
	},
	date: Date,
	checked: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)