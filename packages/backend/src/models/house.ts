import { model, Schema} from 'mongoose'
import { HouseDocument } from '../types'

const HouseSchema = new Schema(
    {
        owner: String,
        name: String,
        address: String,
        dateCreated:String
    }
)



const House = model<HouseDocument>('House', HouseSchema)
export default House