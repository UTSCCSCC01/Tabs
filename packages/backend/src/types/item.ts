import { Document,  Model } from 'mongoose'

export interface ItemDocument extends Document {
    name: String
    categoryId: String
}