import { Document } from 'mongoose'

export interface HouseMemberDocument extends Document {
    userId: String,
    name: String,
    houseId: String,
    isAdmin: Boolean,
    isOwnder: Boolean,
    isBusy: Boolean,
    silentHours: String,
    additionalInfo: String, // ex user can put preferred method of contact ?
}