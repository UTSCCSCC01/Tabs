import { Document,  Model } from 'mongoose'

export interface CategoryDocument extends Document {
    inventoryId: String
    categoryId: String
    categoryName: String
    categoryDesc: String
    isRestricted: Boolean
    owner: String
    admins: String[]
}