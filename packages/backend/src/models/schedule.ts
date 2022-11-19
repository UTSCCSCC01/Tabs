import { model, Schema} from 'mongoose'
import { ScheduleDocument } from '../types'

const ScheduleSchema = new Schema(
    {   
        start: Number,
        end: Number,
        applianceId: String

    }
)

const Schedule = model<ScheduleDocument>('Schedule', ScheduleSchema)
export default Schedule