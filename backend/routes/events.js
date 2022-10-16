import express from 'express'

import { getUpcomingEvents, getAllEvents, getEvent, createEvent, joinEvent, getYourEvents } from '../controllers/eventControllers.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.get('/upcoming', getUpcomingEvents)
router.get('/all', getAllEvents)
router.get('/yours', auth, getYourEvents)
router.get('/:id', getEvent)

router.post('/', auth, createEvent) 
router.patch('/:id/join', auth, joinEvent)

export default router