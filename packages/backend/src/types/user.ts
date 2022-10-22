import { Document,  Model } from 'mongoose'

/**
 * Represents the format of User object in the database
 * 
 * @name UserDocument
 * @field email
 * @field password
 */
export interface UserDocument extends Document {
    email:string
    password:string
}