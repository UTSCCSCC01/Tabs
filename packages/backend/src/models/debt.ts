import { model, Schema} from 'mongoose'
import { DebtDocument } from '../types'

const DebtSchema = new Schema(
    {   
        debtId: String,
        debtTo: String,
        debtFrom: String,
        amount: Number,
        description: String,
        dateCreated: String,
        requestAccepted: Boolean
    }
)

const Debt = model<DebtDocument>('Debt', DebtSchema)
export default Debt