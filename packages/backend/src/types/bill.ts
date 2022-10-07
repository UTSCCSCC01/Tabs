import { Document,  Model } from 'mongoose'

export interface BillDocument extends Document {
    billId: String,
    houseId: String,
    name: String,
    amount: Number,
    split: [String],
    dateCreated: String,
    status: String
}