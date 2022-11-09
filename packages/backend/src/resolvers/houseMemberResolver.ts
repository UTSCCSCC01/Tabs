import { BillDocument, HouseMemberDocument } from '../types'
import { HouseMember } from '../models'
import { Types } from 'mongoose'
import houseMember from '../typeDefs/houseMember';

// TODO: update this function!
async function updateHouseMemberAdminFunc(userId:String, isAdmin:Boolean):Promise<Boolean>{
    let x;
    await HouseMember.findOneAndUpdate({userId: userId}, { isAdmin: isAdmin}) .then(()=>{console.log("House Member admin status amount succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify house member admin status"); x= false})
    return x
}

async function updateHouseMemberOwnerFunc(userId:String, isOwner:Boolean):Promise<Boolean>{
    let x;
    await HouseMember.findOneAndUpdate({userId: userId}, { isOwner: isOwner}) .then(()=>{console.log("House Member owner status amount succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify house member owner status"); x= false})
    return x
}

const resolvers = {

    Query: {
        getHouseMembers: async(root,
            args: {houseId: String}
            ):Promise<HouseMemberDocument[]> => {
                return HouseMember.find(args);
        },

        getHouseMember: async(root,
            args: {userId: String},
            ):Promise<HouseMemberDocument[]> => {
                return HouseMember.findOne(args);
        },
    },

    Mutation: {
        addHouseMember: async(
            root,
            args: {userId: String, houseId: String; isAdmin: Boolean, isOwner: Boolean}
        ): Promise<HouseMemberDocument> =>{
            console.log("Trying to add new House Member")
            const houseMember = await HouseMember.create(args)
            console.log("Successfuly added new House Member to server")
            return houseMember;
        },
        
        updateHouseMemberAdmin: async(root, args: {userId: String, isAdmin: Boolean}):Promise<Boolean> =>{
           return await updateHouseMemberAdminFunc(args.userId, args.isAdmin);
        },

        updateHouseMemberOwner: async(root, args: {userId: String, isOwner: Boolean}):Promise<Boolean> =>{
            return await updateHouseMemberOwnerFunc(args.userId, args.isOwner);
         },
    }
}

export default resolvers