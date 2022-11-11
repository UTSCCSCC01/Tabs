import { Document,  Model } from 'mongoose'

export interface HouseDocument extends Document {
    owner: String,
    name: String,
    address: String,
    dateCreated:String
}
//interface