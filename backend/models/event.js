import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      required: true
   },
   creator: {
      type: String,
      required: false
   },
   cathegory: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: false
   },
   city: {
      type: String,
      required: true
   },
   selectedFile: {
      type: String,
      required: true
   },
   participants: {
      type: [String],
      default: []
   },
   comments: {
      type: [String],
      default: []
   }
}, { timestamps: true })

const EventModel = mongoose.model('Event', eventSchema)

export default EventModel