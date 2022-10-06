import { model, Schema} from 'mongoose'
import { ItemDocument } from '../types'

const ItemSchema = new Schema(
    {   
        name: String,
        categoryId:String
    }
)



const ItemDocument = model<ItemDocument>('Item', ItemSchema)
export default ItemDocument