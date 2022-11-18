import { model, Schema} from 'mongoose'
import { ApplianceDocument } from '../types'

const ApplianceSchema = new Schema(
    {   
        name: String,
        type: String,
        queue:[String],
        availability: Boolean,
        houseId:String

    }
)

const Appliance = model<ApplianceDocument>('Appliance', ApplianceSchema)
export default Appliance