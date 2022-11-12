import { model, Schema} from 'mongoose'
import { ItemDocument } from '../types'
//models
const ItemSchema = new Schema(
    {   
        name: String,
        categoryId:String,
        quantity:Number,
        expiration: Number,
        tags:[String]
    }
)



const ItemDocument = model<ItemDocument>('Item', ItemSchema)
export default ItemDocument