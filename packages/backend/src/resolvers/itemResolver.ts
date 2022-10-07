import {  ItemDocument } from '../types'
import { Item } from '../models'
import {Types} from 'mongoose'


async function findItemFunc(itemId:String):Promise<ItemDocument | void> {
    const id = new Types.ObjectId(String(itemId))
    const item = await Item.findOne({_id:id}).then((item)=>{console.log("Found a matching item"); return item}).catch(()=>{console.log("Failed")})

 
}
async function findItemsByCategoryFunc(categoryId:String):Promise<[ItemDocument] | void>{

    const items = await Item.find({category:categoryId}).then((items)=>{console.log("Found a matching item"); return items}).catch(()=>{console.log("Failed")})

}

async function createItem(categoryId:String):Promise<Boolean>{
    let x;
    await Item.create({categoryId:categoryId}).then(()=>{console.log("Created  Item"); x= true}).catch(()=>{console.log("Failed to create Item"); x= false})
    return x

}
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
    
    Query:{
        findItem: async(root, args: {itemId: String}, context):Promise<ItemDocument | void> => {
            return await findItemFunc(args.itemId)
        },
        findItemsByCategory: async(root, args: {categoryId: String}, context):Promise<[ItemDocument] | void> => {
            return await findItemsByCategoryFunc(args.categoryId)
        }
    },

    Mutation: {
        createItem: async(root, args:{categoryId:String}, context):Promise<Boolean> =>{
            return await createItem(args.categoryId)
        },
        modifyItemName: async(root, args: {itemId: String, name: String}, context):Promise<String | Boolean> =>{
           return await modifyItemNameFunc(args.itemId, args.name)
        },
        modifyItemCategory: async(root, args:{itemId: String, category: String}, context):Promise<String | Boolean> =>{
            return await modifyItemCategoryFunc(args.itemId, args.category)
        }

    }
}

export default resolvers