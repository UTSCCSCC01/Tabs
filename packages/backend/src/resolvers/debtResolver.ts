import { DebtDocument } from '../types'
import { Debt } from '../models'
import { Types } from 'mongoose'

/**
 * Resolver for debt
 * 
 * @name debtResolver
 * @method getDebtsTo
 * @method getDebtsFrom
 * @method getDebts
 * @method addDebt
 * @method modifyAmount
 */

/**
 * Searchs for all the debts owed to the given user
 * 
 * @name getDebtsTo
 * @in debtResolver
 * @param debtTo
 * @returns a list of debt document owed to the given user
 */

/**
 * Searchs for all the debts that the given user owes
 * 
 * @name getDebtsFrom
 * @in debtResolver
 * @param debtFrom
 * @returns a list of debt document that the given user owes
 */

/**
 * Searchs for all the debts matching the parameters
 * 
 * @name getDebts
 * @in debtResolver
 * @param debtFrom
 * @param debtTo
 * @returns a list of matching debt documents 
 */

/**
 * Creates a debt
 * 
 * @name addDebt
 * @in debtResolver
 * @param debtId
 * @param debtTo
 * @param debtFrom
 * @param amount
 * @param description
 * @param dateCreated
 * @returns the document of the newly created debt
 */

/**
 * Modifies the given debt's amount
 * 
 * @name modifyAmount
 * @in debtResolver
 * @param debtId
 * @param amount
 * @returns the new amount, false otherwise
 */
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