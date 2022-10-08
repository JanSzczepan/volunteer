import mongoose from 'mongoose'

import EventModel from '../models/event.js'

export const getUpcomingEvents = async (req, res) => {
   
   const today = new Date()
   const tomorrow = new Date((new Date()).setDate(today.getDate() + 1))
   const endOfToday = new Date((new Date()).setHours(23, 59, 59, 59))
   const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 59))
   
   try {
      const todayEvents = await EventModel.find({ date: {$gte:today.toISOString(),$lt:endOfToday.toISOString()} })
      const tomorrowEvents = await EventModel.find({ date: {$gte:endOfToday.toISOString(),$lt:endOfTomorrow.toISOString()} })

      res.status(200).json({ data: { todayEvents, tomorrowEvents } })
   } catch (error) {
      res.status(404).json({ error: error.message })
   }
}

export const getAllEvents = async (req, res) => {
   try {
      const events = await EventModel.find().sort({ date: 1 })

      res.status(200).json({ data: events })
   } catch (error) {
      res.status(404).json({ error: error.message })
   }
}

export const getEvent = async (req, res) => {
   const { id } = req.params

   try {
      if(!mongoose.isValidObjectId(id))
         return res.status(404).json({ error: 'Event id is not valid' })
   
      const event = await EventModel.findById(id)

      res.status(200).json({ data: event })
   } catch (error) {
      res.status(404).json({ error: error.message })
   }
}

export const createEvent = async (req, res) => {
   try {
      const event = req.body

      const newEvent = await EventModel.create({ ...event })

      res.status(201).json({ data: newEvent })
   } catch (error) {
      res.status(409).json({ error: error.message })
   }
}