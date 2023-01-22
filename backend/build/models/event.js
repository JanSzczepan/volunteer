import mongoose from 'mongoose';
var eventSchema = mongoose.Schema({
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
}, { timestamps: true });
var EventModel = mongoose.model('Event', eventSchema);
export default EventModel;
