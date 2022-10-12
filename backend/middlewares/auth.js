import jwt from 'jsonwebtoken'

import UserModel from '../models/user.js'

export const auth = async (req, res, next) => {
   const {authorization} = req.headers

   if(!authorization)
      return res.status(401).json({error: 'Authorization token required'})

   const token = authorization.split(' ')[1]
   
   try {
      const {_id} = jwt.verify(token, process.env.TOKEN_SECRET)

      req.user = await UserModel.findOne({_id}).select('_id name')

      next()
   } catch (error) {
      console.log(error)

      res.status(401).json({error: 'Request is not authorized'})
   }
}