import { Document,  Model } from 'mongoose'

export interface DebtDocument extends Document {
    debtId: String,
    debtTo: String,
    debtFrom: String,
    amount: Number,
    description: String,
    dateCreated: String,
}