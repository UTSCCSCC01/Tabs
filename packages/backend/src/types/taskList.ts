import { Document,  Model } from 'mongoose'

export interface TaskListDocument extends Document {
    houseId: String,
    owner: String,
    name: String,
    done: String,
}
//interface