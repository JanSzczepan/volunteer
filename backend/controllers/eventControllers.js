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

   const today = new Date()

   try {
      const events = await EventModel.find({ date: {$gte: today.toISOString()} }).sort({ date: 1 })

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

export const joinEvent = async (req, res) => {
   try {

      const { id } = req.params
      const { motivation, resignation } = req.body

      if(!mongoose.isValidObjectId(id))
         return res.status(404).json({ error: 'Event id is not valid' })

      const event = await EventModel.findById(id)

      const banned = event.banned.findIndex((id) => id === String(req.user)) === -1 ? false : true

      if (banned) 
         return res.status(404).json({ error: 'You have already resigned from this event' })

      const index = event.participants.findIndex((id) => id === String(req.user))

      if (index === -1) {

         if (!motivation)
            return res.status(404).json({ error: 'Quote your motivation' })

         event.participants.push(req.user)
         event.motivations.push(motivation)
      } else {

         if (!resignation)
            return res.status(404).json({ error: 'Quote your resignation' })

         event.participants = event.participants.filter((id) => id !== String(req.user))
         event.resignations.push(resignation)
         event.banned.push(req.user)
      }

      const updatedEvent = await EventModel.findByIdAndUpdate(id, event, { new: true })
      
      res.status(200).json(updatedEvent)
   } catch (error) {
      res.status(404).json({ error: error.message })
   }
}