import { model, Schema} from 'mongoose'
import { TaskDocument } from '../types'

const TaskSchema = new Schema(
    {
        houseId: String,
        taskListId:String,
        author: String,
        task: String,
        dateDue: String,
        dateCreated:String,
        doneStatus: Boolean
    }
)



const Task = model<TaskDocument>('Task', TaskSchema)
export default Task