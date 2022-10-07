import { DebtDocument } from '../types'
import { Debt } from '../models'
import { Types } from 'mongoose'

async function modifyAmountFunc(debtId:String, amount:String):Promise<String | Boolean>{
    let x;
    const id = new Types.ObjectId(String(debtId))
    await Debt.findOneAndUpdate({_id:id}, { amount: amount}) .then(()=>{console.log("Debt amount succesfully updated"); x= amount}).catch(()=>{console.log("Failed to modify debt amount"); x= false})
    return x
}

const resolvers = {

    Mutation: {
        addDebt: async(
            root,
            args: {debtId: String, debtTo: String; debtFrom: String, amount: String}
        ): Promise<DebtDocument> =>{

            const debt = await Debt.create(args)
            console.log("Successfuly added Debt to server")
            return debt
        },
        
        modifyAmount: async(root, args: {debtId: String, amount: String}):Promise<String | Boolean> =>{
           return await modifyAmountFunc(args.debtId, args.amount)
        },
    }
}

export default resolvers