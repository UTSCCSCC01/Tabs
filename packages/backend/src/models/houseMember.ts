import { model, Schema} from 'mongoose'
import { HouseMemberDocument } from '../types'

const HouseMemberSchema = new Schema(
    {   
        userId: String,
        houseId: String,
        isAdmin: Boolean,
        isOwner: Boolean,
    }
)

const HouseMember = model<HouseMemberDocument>('HouseMember', HouseMemberSchema)
export default HouseMember