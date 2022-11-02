import { model, Schema} from 'mongoose'
import { TaskDocument } from '../types'

const TaskSchema = new Schema(
    {
        houseId: String,
        taskListId:String,
        author: String,
        task: String,
        dateDue: String,
        done: Boolean
    }
)



const Task = model<TaskDocument>('Inventory', TaskSchema)
export default Task