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
      throw Error('Wszytskie pola muszą być wypełnione')

   const user = await this.findOne({ $or: [{ name: login }, { email: login }] })

   if (!user) 
      throw Error('Niepoprawny email lub nazwa użytkownika')

   const match = await bcrypt.compare(password, user.password)

   if (!match) 
      throw Error('Niepoprawne hasło')

   return user
}

userSchema.statics.signup = async function (name, email, password) {

   if(!name || !email || !password)
      throw Error('Wszytskie pola muszą być wypełnione')
   if(validator.contains(name, ' ')) 
      throw Error('Nazwa użytkownika nie może zawierać spacji')
   if(!validator.isEmail(email))
      throw Error('Niepoprawny email')
   if(!validator.isStrongPassword(password))
      throw Error('Hasło nie jest wystarczająco silne')

   const nameExists = await this.findOne({name})

   if(nameExists)
      throw Error('Nazwa użytkownika jest już w użyciu')

   const emailExists = await this.findOne({email})

   if(emailExists)
      throw Error('Email jest już w użyciu')

   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password, salt)

   const user = await this.create({ name, email, password: hash })
   return user
}

const UserModel = mongoose.model('User', userSchema)
export default UserModel