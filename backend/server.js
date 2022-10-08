import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import eventRoutes from './routes/events.js'
import collectionRoutes from './routes/collections.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()

app.use('/events', eventRoutes)
app.use('/collection', collectionRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
   .then(() => app.listen(PORT, () => console.log(`Listening for request on port ${PORT}`)))
   .catch((error) => console.log(error.message))