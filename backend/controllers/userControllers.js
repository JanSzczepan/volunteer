import jwt from 'jsonwebtoken'

import UserModel from '../models/user.js'

const createToken = (email, _id) => jwt.sign({ email, _id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

export const login = async (req, res) => {

   const { login, password } = req.body

   try {
      const user = await UserModel.login(login, password)

      const token = createToken(user.email, user._id)

      res.status(200).json({ user, token })
   } catch (err) {
      res.status(400).json({ err: err.message })
   }
}

export const signup = async (req, res) => {
   const { name, email, password } = req.body

   try {
      const user = await UserModel.signup(name, email, password)

      const token = createToken(user.email, user._id)

      res.status(200).json({ user, token })
   } catch (err) {
      res.status(400).json({err: err.message})
   }
}