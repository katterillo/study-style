import mongoose from 'mongoose'

const CalendarSchema = new mongoose.Schema({
  date: { 
    type: String,
    trim: true,
    required: 'Date is required'
  },
  time: {
    type: String,
    trim: true,
    required: 'Time is required'
  },
  eventName: {
    type: String,
    trim: true,
    required: 'Event name is required'
  },
  description:{
    type: String,
    trim: true,
    default: "N/A"
  },
  location:{
    type: String,
    default: "N/A"
  },
  remote: {
    type: Boolean,
    default: false
  },
  strict: false
})

export default mongoose.model('Calendar', CalendarSchema)