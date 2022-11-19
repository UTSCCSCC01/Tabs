import { Document,  Model } from 'mongoose'

export interface ApplianceDocument extends Document {
    name: String,
    type: String,
    queue:[String],
    scheduled: [String],
    availability: Boolean,
    houseId:String

}