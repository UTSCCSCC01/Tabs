import { Document,  Model } from 'mongoose'

/**
 * Represents the format of Item object in the database
 * 
 * @name ItemDocument
 * @field name Name of document
 * @field categoryId ID of category that this document belongs to
 * @field quantity
 * @field expiration
 * @field tags
 */
export interface ItemDocument extends Document {
    name: String,
    categoryId:String,
    quantity:Number,
    expiration:String,
    tags:[String]
}
//interface