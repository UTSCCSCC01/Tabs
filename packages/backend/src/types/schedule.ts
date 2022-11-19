import { Document,  Model } from 'mongoose'

export interface ScheduleDocument extends Document {
    start: Number,
    end: Number,
    applianceId: String

}