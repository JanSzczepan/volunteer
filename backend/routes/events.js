import express from 'express'

import { getUpcomingEvents, getAllEvents, getEvent, createEvent, joinEvent } from '../controllers/eventControllers.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.get('/upcoming', getUpcomingEvents)
router.get('/all', getAllEvents)
router.get('/:id', getEvent)

// auth
router.post('/', auth, createEvent) 
router.patch('/:id/join', auth, joinEvent)

export default router