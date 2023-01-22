import { HydratedDocument, model, Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

export type IUser = {
   name: string
   email: string
   password: string
}

interface UserModel extends Model<IUser> {
   login: (login: string, password: string) => HydratedDocument<IUser>
   signup: (name: string, login: string, password: string) => HydratedDocument<IUser>
}

const userSchema = new Schema<IUser, UserModel>({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
})

userSchema.statics.login = async function (login: string, password: string) {
   if (!login || !password) throw Error('Wszytskie pola muszą być wypełnione')

   const user: HydratedDocument<IUser> | null = await this.findOne({ $or: [{ name: login }, { email: login }] })

   if (!user) throw Error('Niepoprawny email lub nazwa użytkownika')

   const match = await bcrypt.compare(password, user.password)

   if (!match) throw Error('Niepoprawne hasło')

   return user
}

userSchema.statics.signup = async function (name: string, email: string, password: string) {
   if (!name || !email || !password) throw Error('Wszytskie pola muszą być wypełnione')
   if (validator.default.contains(name, ' ')) throw Error('Nazwa użytkownika nie może zawierać spacji')
   if (!validator.default.isEmail(email)) throw Error('Niepoprawny email')
   if (!validator.default.isStrongPassword(password)) throw Error('Hasło nie jest wystarczająco silne - musi zawierać co najmniej jedną dużą i małą literę, jeden symbol, jedną liczbę oraz mieć co najmniej 8 znaków')

   const nameExists = await this.findOne({ name })

   if (nameExists) throw Error('Nazwa użytkownika jest już w użyciu')

   const emailExists = await this.findOne({ email })

   if (emailExists) throw Error('Email jest już w użyciu')

   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password, salt)

   const user: HydratedDocument<IUser> = await this.create({ name, email, password: hash })
   return user
}

const UserModel = model<IUser, UserModel>('User', userSchema)
export default UserModel
