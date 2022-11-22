import { BillDocument } from '../types'
import { Bill } from '../models'
import { Types } from 'mongoose'

// TODO: update this function!
async function modifyBillAmountFunc(houseId:String, userId:String, amount:Number):Promise<Boolean>{
    let x;
    // const id = new Types.ObjectId(String(houseId))
    await Bill.findOneAndUpdate({houseId: houseId, userId: userId}, { amount: amount}) .then(()=>{console.log("Bill amount succesfully updated"); x= true}).catch(()=>{console.log("Failed to modify bill amount"); x= false})
    return x
}

const resolvers = {

    Query: {
        getBill: async(root,
            args: {houseId: String, userId: String}
            ):Promise<BillDocument> => {
            return Bill.findOne(args);
        },

        getBills: async(root,
            args: {houseId: String},
            ):Promise<BillDocument[]> => {
                return Bill.find(args);
        },
    },

    Mutation: {
        addBill: async(
            root,
            args: {billId: String, houseId: String; userId: String, name: String, amount: Number, split: [String], dateCreated: String, dateDue: String, status: String}
        ): Promise<BillDocument> =>{

            const bill = await Bill.create(args)
            console.log("Successfuly added Bill to server")
            return bill
        },
        
        modifyBillAmount: async(root, args: {houseId: String, userId: String, amount: Number}):Promise<Boolean> =>{
           return await modifyBillAmountFunc(args.houseId, args.userId, args.amount)
        },
    }
}

export default resolvers