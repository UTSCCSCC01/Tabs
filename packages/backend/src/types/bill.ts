import { Document,  Model } from 'mongoose'

/**
 * Represents the format of Bill object in the database
 * 
 * @name BillDocument
 * @field billId ID of document
 * @field houseId
 * @field name Name of bill
 * @field amount Amount to be paid
 * @field split Those who the bill is to be split amongst
 * @field dateCreated
 * @field dateDue
 * @field status
 */
export interface BillDocument extends Document {
    billId: String,
    houseId: String,
    name: String,
    amount: Number,
    split: [String],
    dateCreated: String,
    dateDue: String,
    status: String
}