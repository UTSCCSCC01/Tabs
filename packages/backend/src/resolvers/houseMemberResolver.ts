import { HouseMemberDocument } from '../types'
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

async function updateHouseMemberBusyFunc(userId:String, isBusy:Boolean):Promise<Boolean>{
    let x;
    await HouseMember.findOneAndUpdate({userId: userId}, { isBusy: isBusy}) .then(()=>{console.log("House Member busy status amount succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify house member busy status"); x= false})
    return x
}

async function updateHouseMemberPhoneFunc(userId:String, phoneNumber:String):Promise<Boolean>{
    let x;
    await HouseMember.findOneAndUpdate({userId: userId}, { phoneNumber: phoneNumber}) .then(()=>{console.log("House Member phone number succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify house member phone number"); x= false})
    return x
}

async function updateHouseMemberEmailFunc(userId:String, emailAddress:String):Promise<Boolean>{
    let x;
    await HouseMember.findOneAndUpdate({userId: userId}, { emailAddress: emailAddress}) .then(()=>{console.log("House Member email address succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify house member email address"); x= false})
    return x
}

async function updateHouseMemberSilentHoursFunc(userId:String, silentHours:String):Promise<Boolean>{
    let x;
    await HouseMember.findOneAndUpdate({userId: userId}, { silentHours: silentHours}) .then(()=>{console.log("House Member silent hours succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify house member silent hours"); x= false})
    return x
}

async function updateHouseMemberAdditionalInfoFunc(userId:String, additionalInfo:String):Promise<Boolean>{
    let x;
    await HouseMember.findOneAndUpdate({userId: userId}, { additionalInfo: additionalInfo}) .then(()=>{console.log("House Member additional info succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify house member additional info"); x= false})
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
            args: {userId: String, houseId: String; isAdmin: Boolean, isOwner: Boolean, isBusy: Boolean, phoneNumber: String, emailAddress: String, silentHours: String, additionalInfo: String}
        ): Promise<HouseMemberDocument> =>{
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

        updateHouseMemberBusy: async(root, args: {userId: String, isBusy: Boolean}):Promise<Boolean> =>{
            return await updateHouseMemberBusyFunc(args.userId, args.isBusy);
        },

        updateHouseMemberPhone: async(root, args: {userId: String, phoneNumber: String}):Promise<Boolean> =>{
        return await updateHouseMemberPhoneFunc(args.userId, args.phoneNumber);
        },

        updateHouseMemberEmail: async(root, args: {userId: String, emailAddress: String}):Promise<Boolean> =>{
            return await updateHouseMemberEmailFunc(args.userId, args.emailAddress);
        },

        updateHouseMemberSilentHours: async(root, args: {userId: String, silentHours: String}):Promise<Boolean> =>{
            return await updateHouseMemberSilentHoursFunc(args.userId, args.silentHours);
        },

        updateHouseMemberAdditionalInfo: async(root, args: {userId: String, additionalInfo: String}):Promise<Boolean> =>{
            return await updateHouseMemberAdditionalInfoFunc(args.userId, args.additionalInfo);
        },
    }
}

export default resolvers