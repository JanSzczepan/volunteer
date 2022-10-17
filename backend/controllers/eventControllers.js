import mongoose from 'mongoose'

import EventModel from '../models/event.js'

export const getUpcomingEvents = async (req, res) => {
   
   const today = new Date()
   const tomorrow = new Date((new Date()).setDate(today.getDate() + 1))
   const endOfToday = new Date((new Date()).setHours(23, 59, 59, 59))
   const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 59))
   
   try {
      const todayEvents = await EventModel.find({ date: {$gte:today.toISOString(),$lt:endOfToday.toISOString()} }).sort({ date: 1 })
      const tomorrowEvents = await EventModel.find({ date: {$gte:endOfToday.toISOString(),$lt:endOfTomorrow.toISOString()} }).sort({ date: 1 })

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

export const getYourEvents = async (req, res) => {
   
   const today = new Date()

   try {
      const _id = req.user._id.toString()

      const authorEvents = await EventModel.find({ $and:[{ creator: _id }, { date: {$gte: today.toISOString()} }]}).sort({ date: 1 })
      const participantEvents = await EventModel.find({ $and: [{ participants: { $in: [_id] } }, { creator: { $ne: _id } }, { date: {$gte: today.toISOString()}}] }).sort({ date: 1 })
   
      const authorArchivalEvents = await EventModel.find({ $and:[{ creator: _id }, { date: {$lte: today.toISOString()} }]}).sort({ date: 1 })
      const participantArchivalEvents = await EventModel.find({ $and: [{ participants: { $in: [_id] } }, { creator: { $ne: _id } }, { date: {$lte: today.toISOString()}}] }).sort({ date: 1 })

      res.status(200).json({ data: { authorEvents, participantEvents, authorArchivalEvents, participantArchivalEvents } })
   } catch (error) {
      res.status(404).json({ error: error.message })
   }
}

export const getEventBySearch = async (req, res) => {
   
   const { search } = req.query
   const searchQuery = search ? new RegExp(search, "i") : null
   
   try {
      const event = await EventModel.find({ $or: [{ title: searchQuery }, { cathegory: searchQuery }, { city: searchQuery }, { address: searchQuery }] })

      res.status(200).json({ data: event })
   } catch (error) {
      res.status(404).json({ error: error.message })
   }
}

export const createEvent = async (req, res) => {

   const { title, description, date, cathegory, city } = req.body

   let emptyFields = []

   if (!title)
      emptyFields.push('title')
   if (!description)
      emptyFields.push('description')
   if (!date)
      emptyFields.push('date')
   if (!cathegory)
      emptyFields.push('cathegory')
   if (!city)
      emptyFields.push('city')

   if (emptyFields.length > 0)
      return res.status(400).json({error: {errorMessage: 'Wypełnij wszystkie wymagane pola', emptyFields}})

   try {
      const event = { ...req.body, participants: [req.user._id], participantsNames: [req.user.name], creator: req.user._id }

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

      const banned = event.banned.findIndex((id) => id === String(req.user._id)) === -1 ? false : true

      if (banned) 
         return res.status(404).json({ error: 'You have already resigned from this event' })

      const index = event.participants.findIndex((id) => id === String(req.user._id))

      if (index === -1) {

         if (!motivation)
            return res.status(404).json({ error: 'Quote your motivation' })
         
         event.participants.push(req.user._id)
         event.participantsNames.push(req.user.name)
         event.motivations.push(motivation)
      } else {

         if (!resignation)
            return res.status(404).json({ error: 'Quote your resignation' })
   
         event.participants = event.participants.filter((id) => id !== String(req.user._id))
         event.participantsNames = event.participantsNames.filter((n) => n !== String(req.user.name))
         event.resignations.push(resignation)
         event.banned.push(req.user._id)
      }

      const updatedEvent = await EventModel.findByIdAndUpdate(id, event, { new: true })
      
      res.status(200).json(updatedEvent)
   } catch (error) {
      res.status(404).json({ error: error.message })
   }
}