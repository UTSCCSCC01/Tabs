import { Document } from 'mongoose'

export interface HouseMemberDocument extends Document {
    userId: String,
    houseId: String,
    isAdmin: Boolean,
    isOwnder: Boolean,
    isBusy: Boolean,
    phoneNumber: String,
    emailAddress: String,
    silentHours: String,
    additionalInfo: String, // ex user can put preferred method of contact ?
}