import express from 'express'

import { getUpcomingEvents, getAllEvents, getEvent, createEvent } from '../controllers/eventControllers.js'

const router = express.Router()

router.get('/upcoming', getUpcomingEvents)
router.get('/all', getAllEvents)
router.get('/:id', getEvent)

// auth
router.post('/', createEvent)

export default router