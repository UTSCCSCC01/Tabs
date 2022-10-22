import { Document,  Model } from 'mongoose'

/**
 * Represents the format of Category object in the database
 * 
 * @name CategoryDocument
 * @field inventoryId ID of inventory that this document belongs to
 * @field categoryId ID of document
 * @field categoryName
 * @field categoryDesc
 * @field isRestricted Whether or not non-owners/admins can make changes
 * @field owner
 * @field admins
 */
export interface CategoryDocument extends Document {
    inventoryId: String
    categoryId: String
    categoryName: String
    categoryDesc: String
    isRestricted: Boolean
    owner: String
    admins: String[]
}