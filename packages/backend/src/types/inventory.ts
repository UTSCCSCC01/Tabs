import { Document,  Model } from 'mongoose'

export interface InventoryDocument extends Document {
    inventoryId:String,
    houseId: String,
    categories:[String]
}