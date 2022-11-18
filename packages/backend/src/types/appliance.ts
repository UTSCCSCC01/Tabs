import { Document,  Model } from 'mongoose'

export interface ApplianceDocument extends Document {
    name: String,
    type: String,
    queue:[String],
    availability: Boolean,
    houseId:String

}