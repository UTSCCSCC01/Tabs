import { Document,  Model } from 'mongoose'

export interface TaskDocument extends Document {
    houseId: String,
    taskListId:String,
    author: String,
    task: String,
    dateDue: String,
    done: Boolean
}
//interface