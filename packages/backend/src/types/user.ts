import { Document,  Model } from 'mongoose'

export interface UserDocument extends Document {
    email:string
    password:string
}