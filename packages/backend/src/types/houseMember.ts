import { Document } from 'mongoose'

export interface HouseMemberDocument extends Document {
    userId: String,
    houseId: String,
    isAdmin: Boolean,
    isOwnder: Boolean,
}