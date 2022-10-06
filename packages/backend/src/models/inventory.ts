import { model, Schema} from 'mongoose'
import { InventoryDocument } from '../types'

const InventorySchema = new Schema(
    {
        inventoryId:String,
        houseId: String,
        categoryId:[String]
    }
)



const Inventory = model<InventoryDocument>('Inventory', InventorySchema)
export default Inventory