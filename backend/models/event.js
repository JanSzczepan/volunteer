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

const Event = mongoose.model('Event', eventSchema)

export default Event