import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   }
})

userSchema.statics.login = async function (login, password) {

   if (!login || !password) 
      throw Error('All fields must be filled')

   const user = await this.findOne({ $or: [{ name: login }, { email: login }] })

   if (!user) 
      throw Error('Incorrect email or name')

   const match = await bcrypt.compare(password, user.password)

   if (!match) 
      throw Error('Incorrect password')

   return user
}

userSchema.statics.signup = async function (name, email, password) {

   if(!name || !email || !password)
      throw Error('All fields must be filled in')
   if(validator.contains(name, ' ')) 
      throw Error('Name is not valid')
   if(!validator.isEmail(email))
      throw Error('Email is not valid')
   if(!validator.isStrongPassword(password))
      throw Error('Password is not strong enough')

   const nameExists = await this.findOne({name})

   if(nameExists)
      throw Error('Name already in use')

   const emailExists = await this.findOne({email})

   if(emailExists)
      throw Error('Email already in use')

   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password, salt)

   const user = await this.create({ name, email, password: hash })
   return user
}

const UserModel = mongoose.model('User', userSchema)
export default UserModel