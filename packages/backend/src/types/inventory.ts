import { Document,  Model } from 'mongoose'

/**
 * Represents the format of Inventory object in the database
 * 
 * @name InventoryDocument
 * @field houseId ID of house that this document belongs to
 */
export interface InventoryDocument extends Document {
    houseId: String,
}