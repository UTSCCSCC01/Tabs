import { Document,  Model } from 'mongoose'

export interface BillDocument extends Document {
    billId: String,
    houseId: String,
    userId: String,
    name: String,
    amount: Number,
    split: [String],
    dateCreated: String,
    dateDue: String,
    status: String
}