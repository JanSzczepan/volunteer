import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

import eventRoutes from './routes/events.js'
import collectionRoutes from './routes/collections.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(express.json())

app.use('/events', eventRoutes)
app.use('/collection', collectionRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
   res.send('APP IS RUNNING.')
})

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URI)
   .then(() => app.listen(PORT, () => console.log(`Listening for request on port ${PORT}`)))
   .catch((error) => console.log(error.message))