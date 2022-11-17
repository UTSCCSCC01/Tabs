import { model, Schema} from 'mongoose'
import { HouseMemberDocument } from '../types'

const HouseMemberSchema = new Schema(
    {   
        userId: String,
        name: String,
        houseId: String,
        isAdmin: Boolean,
        isOwner: Boolean,
        isBusy: Boolean,
        silentHours: String,
        additionalInfo: String
    }
)

const HouseMember = model<HouseMemberDocument>('HouseMember', HouseMemberSchema)
export default HouseMember