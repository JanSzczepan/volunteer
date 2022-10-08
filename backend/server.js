import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
   .then(() => app.listen(PORT, () => console.log(`Listening for request on port ${PORT}`)))
   .catch((error) => console.log(error.message))