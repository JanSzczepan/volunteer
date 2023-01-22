import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

import UserModel from '../models/user.js'

export type UserToken = {
   email: string
   _id: Types.ObjectId
}

const createToken = (email: string, _id: Types.ObjectId) => jwt.sign({ email, _id } as UserToken, process.env.TOKEN_SECRET!, { expiresIn: '1h' })

export const login: RequestHandler = async (req, res) => {
   const { login, password } = req.body

   try {
      const user = await UserModel.login(login, password)

      const token = createToken(user.email, user._id)

      res.status(200).json({ user, token })
   } catch (err: any) {
      res.status(400).json({ err: err.message })
   }
}

export const signup: RequestHandler = async (req, res) => {
   const { name, email, password } = req.body

   try {
      const user = await UserModel.signup(name, email, password)

      const token = createToken(user.email, user._id)

      res.status(200).json({ user, token })
   } catch (err: any) {
      res.status(400).json({ err: err.message })
   }
}
