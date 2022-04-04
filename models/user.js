const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		minLength: 4,
	},
	name: {
		type: String,
		minLength: 3,
		require: true
	},
	age: {
		type: Number,
		require: true
	},
	passwordHash: {
		type: String,
		require: true
	},
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
})
 
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})



module.exports = mongoose.model('User', userSchema)