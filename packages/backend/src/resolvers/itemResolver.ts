import { CategoryDocument, ItemDocument } from '../types'
import {Category, Item} from '../models'
import {Types} from 'mongoose'


async function modifyItemNameFunc(itemId:String, name:String):Promise<String | Boolean>{
    let x
    const id = new Types.ObjectId(String(itemId))
    await Item.findOneAndUpdate({_id:id}, { name: name}) .then(()=>{console.log("Successfully modified item name"); x= name}).catch(()=>{console.log("Failed to modify item name"); x= false})
    return x
}

async function modifyItemCategoryFunc(itemId: String, category: String ): Promise<String | Boolean>{
    let x
    const id = new Types.ObjectId(String(itemId))
    await Item.findOneAndUpdate({_id:id}, { category: category}).then(()=>{console.log("Successfully modified item name"); x= category}).catch(()=>{console.log("Failed to modify item name"); x= false})
    return x
}
const resolvers = {

    Mutation: {
        modifyItemName: async(root, args: {itemId: String, name: String}, context):Promise<String | Boolean> =>{
           return await modifyItemNameFunc(args.itemId, args.name)
        },
        modifyItemCategory: async(root, args:{itemId: String, category: String}, context):Promise<String | Boolean> =>{
            return await modifyItemCategoryFunc(args.itemId, args.category)
        }

    }
}

export default resolvers