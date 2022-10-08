import express from 'express'

import { getUpcomingEvents, getAllEvents, getEvent } from '../controllers/eventControllers.js'

const router = express.Router()

router.get('/upcoming', getUpcomingEvents)
router.get('/all', getAllEvents)
router.get('/:id', getEvent)

export default router