import { model, Schema} from 'mongoose'
import { TaskListDocument } from '../types'

const TaskListSchema = new Schema(
    {
        houseId: String,
        owner: String,
        name: String,
        done: String,
    }
)



const TaskList = model<TaskListDocument>('Inventory', TaskListSchema)
export default TaskList