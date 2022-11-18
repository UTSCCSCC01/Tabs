import { Document,  Model } from 'mongoose'

export interface UserDocument extends Document {
    email: String
    password: String
    username: String
    phone: String
    matchesPassword: (password: String) => Promise<Boolean>
}

export interface UserModel extends Model<UserDocument> {
    hash: (password: String) => Promise<String>
}