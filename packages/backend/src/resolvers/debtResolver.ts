import { DebtDocument } from '../types'
import { Debt } from '../models'
import { Types } from 'mongoose'

async function modifyAmountFunc(debtId:String, amount:Number):Promise<String | Boolean>{
    let x;
    const id = new Types.ObjectId(String(debtId))
    await Debt.findOneAndUpdate({_id:id}, { amount: amount}) .then(()=>{console.log("Debt amount succesfully updated"); x= amount}).catch(()=>{console.log("Failed to modify debt amount"); x= false})
    return x
}

const resolvers = {

    Query: {
        getDebtsTo: async(root,
            args: {debtTo: String}
            ):Promise<DebtDocument[]> => {
            return Debt.find(args);
        },
        
        getDebtsFrom: async(root,
            args: {debtFrom: String}
            ):Promise<DebtDocument[]> => {
            return Debt.find(args);
        },
        
        getDebts: async(root,
            args: {debtFrom: String, debtTo: String},
            ):Promise<DebtDocument[]> => {
                return (await Debt.find( { debtTo: args.debtTo } )).concat(await Debt.find( { debtFrom: args.debtFrom } ));
        },
    },

    Mutation: {
        addDebt: async(
            root,
            args: {debtId: String, debtTo: String; debtFrom: String, amount: Number, description: String, dateCreated: String}
        ): Promise<DebtDocument | Boolean> =>{

            const debt = await Debt.create(args)
            console.log("Successfuly added Debt to server")
            return debt
        },
        
        modifyAmount: async(root, args: {debtId: String, amount: Number}):Promise<String | Boolean> =>{
           return await modifyAmountFunc(args.debtId, args.amount)
        },
    }
}

export default resolvers