import { Document,  Model } from 'mongoose'

export interface InventoryDocument extends Document {
    houseId: String,
}