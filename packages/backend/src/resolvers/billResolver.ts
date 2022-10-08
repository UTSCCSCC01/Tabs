import { BillDocument } from '../types'
import { Bill } from '../models'
import { Types } from 'mongoose'

async function modifyAmountFunc(billId:String, amount:Number):Promise<String | Boolean>{
    let x;
    const id = new Types.ObjectId(String(billId))
    await Bill.findOneAndUpdate({_id:id}, { amount: amount}) .then(()=>{console.log("Bill amount succesfully updated"); x= amount}).catch(()=>{console.log("Failed to modify bill amount"); x= false})
    return x
}

const resolvers = {

    Query: {
        getBill: async(root,
            args: {houseId: String}
            ):Promise<BillDocument[]> => {
            return Bill.find(args);
        },
    },

    Mutation: {
        addBill: async(
            root,
            args: {billId: String, houseId: String; name: String, amount: Number, split: [String], dateCreated: String, dateDue: String, status: String}
        ): Promise<BillDocument> =>{

            const bill = await Bill.create(args)
            console.log("Successfuly added Bill to server")
            return bill
        },
        
        modifyAmount: async(root, args: {billId: String, amount: Number}):Promise<String | Boolean> =>{
           return await modifyAmountFunc(args.billId, args.amount)
        },
    }
}

export default resolvers