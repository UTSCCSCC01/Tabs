import { model, Schema} from 'mongoose'
import { BillDocument } from '../types'

const BillSchema = new Schema(
    {   
        billId: String,
        houseId: String,
        name: String,
        amount: Number,
        split: [String],
        dateCreated: String,
        status: String,
    }
)

const Bill = model<BillDocument>('Bill', BillSchema)
export default Bill