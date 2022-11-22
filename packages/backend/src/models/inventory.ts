import { model, Schema} from 'mongoose'
import { InventoryDocument } from '../types'

const InventorySchema = new Schema(
    {
        houseId: String,
    }
)



const Inventory = model<InventoryDocument>('Inventory', InventorySchema)
export default Inventory