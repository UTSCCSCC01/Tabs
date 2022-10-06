import { CategoryDocument, ItemDocument } from '../types'
import Category from '../models'
import Item from '../models'
import inventory from '../typeDefs/inventory'


async function modifyItemNameFunc(itemId:String, name:String):Promise<String | boolean>{
    let x
    await new Promise<ItemDocument> 
    (() => (Item.findOneAndUpdate({_id:itemId}, { name: name}) ))
    .then(()=>{console.log("Successfully modified item name"); x= name})
    .catch(()=>{console.log("Failed to modify item name"); x= false})
    return x
}

async function modifyItemCategoryFunc(itemId: String, category: String ): Promise<String | boolean>{
    let x
    await new Promise<ItemDocument> 
    (() => (Item.findOneAndUpdate({_id:itemId}, { category: category}) ))
    .then(()=>{console.log("Successfully modified item name"); x= category})
    .catch(()=>{console.log("Failed to modify item name"); x= false})
    return x
}
const resolvers = {

    Mutation: {
        modifyItemName: async(root, args: {itemId: String, name: String}, context):Promise<String | boolean> =>{
           return await modifyItemNameFunc(args.itemId, args.name)
        },
        modifyItemCategory: async(root, args:{itemId: String, category: String}, context):Promise<String | boolean> =>{
            return await modifyItemCategoryFunc(args.itemId, args.category)
        }

    }
}

export default resolvers