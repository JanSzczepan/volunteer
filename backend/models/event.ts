import { model, Schema } from 'mongoose'

type IEvent = {
   title: string
   description: string
   date: Date
   creator: string
   anonymous: boolean
   cathegory: string
   address: string
   city: string
   selectedFile: string
   participants: string[]
   participantsNames: string[]
   motivations: string[]
   resignations: string[]
   banned: string[]
   comments: string[]
}

const eventSchema = new Schema<IEvent>(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      date: {
         type: Date,
         required: true,
      },
      creator: {
         type: String,
         required: false,
      },
      anonymous: {
         type: Boolean,
         required: true,
      },
      cathegory: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: false,
      },
      city: {
         type: String,
         required: true,
      },
      selectedFile: {
         type: String,
         required: false,
      },
      participants: {
         type: [String],
         default: [],
      },
      participantsNames: {
         type: [String],
         default: [],
      },
      motivations: {
         type: [String],
         default: [],
      },
      resignations: {
         type: [String],
         default: [],
      },
      banned: {
         type: [String],
         default: [],
      },
      comments: {
         type: [String],
         default: [],
      },
   },
   { timestamps: true }
)

const EventModel = model<IEvent>('Event', eventSchema)

export default EventModel
