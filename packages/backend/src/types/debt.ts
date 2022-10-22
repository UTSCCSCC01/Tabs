import { Document,  Model } from 'mongoose'

/**
 * Represents the format of Debt object in the database
 * 
 * @name DebtDocument
 * @field debtId ID of document
 * @field debtTo
 * @field debtFrom
 * @field amount Amount of debt
 * @field description
 * @field dateCreated
 */
export interface DebtDocument extends Document {
    debtId: String,
    debtTo: String,
    debtFrom: String,
    amount: Number,
    description: String,
    dateCreated: String,
}