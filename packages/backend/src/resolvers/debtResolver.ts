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
            return Debt.find(args)
        }
    },

    Mutation: {
        addDebt: async(
            root,
            args: {debtId: String, debtTo: String; debtFrom: String, amount: Number, description: String, dateCreated: String, requestAccepted?: Boolean}
        ): Promise<DebtDocument | Boolean> =>{
            args.requestAccepted = null;
            const debt = await Debt.create(args)
            console.log("Successfuly added Debt to server")
            return debt
        },
        acceptRequest: async(root, args:{debtId: String, requestAccepted: Boolean}):Promise<DebtDocument |String> => {
            if (args.requestAccepted != null){
                return 'fail requestAccepted already set'
            }
            const debt = await Debt.findByIdAndUpdate(args.debtId,{requestAccepted: true}).catch(()=>{return 'fail'})
            return debt
        },
        rejectRequest: async(root, args:{debtId: String, requestAccepted: Boolean}):Promise<DebtDocument |String> => {
            if (args.requestAccepted != null){
                return 'fail requestAccepted already set'
            }
            const debt = await Debt.findByIdAndUpdate(args.debtId,{requestAccepted: false}).catch(()=>{return 'fail'})
            return debt
        },
        undoRequest: async(root, args:{debtId:String, requestAccepted: Boolean}): Promise<DebtDocument | String> =>{
            if (args.requestAccepted == null){
                return 'value already null'
            }
            const debt = await Debt.findByIdAndUpdate(args.debtId,{requestAccepted: null}).catch(()=>{return 'fail'})
            return debt
        },
        modifyAmount: async(root, args: {debtId: String, amount: Number}):Promise<String | Boolean> =>{
           return await modifyAmountFunc(args.debtId, args.amount)
        },
    }
}

export default resolvers