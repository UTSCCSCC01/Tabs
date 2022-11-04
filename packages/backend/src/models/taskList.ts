import { model, Schema} from 'mongoose'
import { TaskListDocument } from '../types'

const TaskListSchema = new Schema(
    {
        houseId: String,
        owner: String,
        name: String,
        done: String,
        dateCreated:String
    }
)



const TaskList = model<TaskListDocument>('TaskList', TaskListSchema)
export default TaskList