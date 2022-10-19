import {  ItemDocument } from '../types'
import { Item } from '../models'
import {Types} from 'mongoose'





async function findItemFunc(itemId:String):Promise<ItemDocument> {
    const item = await Item.findById(itemId)
    return item
}

async function findItemsByCategoryFunc(categoryId:String):Promise<ItemDocument[]>{
    const items = await Item.find({categoryId:categoryId})
    return items

}

async function addItemFunc(itemId:String):Promise<Boolean> {
    let x
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:1}}).then(()=>{x=true}).catch(()=>(x=false))


    return x
    
}
async function subtractItemFunc(itemId:String):Promise<Boolean> {
    let x
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:-1}}).then(()=>{x=true}).catch(()=>(x=false))

    return x
    
}

async function createItemfunc(categoryId:String, name:String, expiration:String):Promise<String>{
    let x;
    await Item.create({categoryId:categoryId, name:name, expiration:expiration}).then(()=>{console.log("Created Item"); x= true}).catch(()=>{console.log("Failed to create Item"); x= false})
    return x

}
async function modifyItemNameFunc(itemId:String, name:String):Promise<Boolean>{
    let x
    await Item.findByIdAndUpdate(itemId, { name: name}) .then(()=>{console.log("Successfully modified item name"); x=true}).catch(()=>{console.log("Failed to modify item name"); x=false})
    return x
}

async function modifyItemCategoryFunc(itemId: String, categoryId: String ): Promise<Boolean>{
    let x
    await Item.findByIdAndUpdate(itemId, { categoryId: categoryId}).then(()=>{console.log("Successfully modified item category"); x=true}).catch(()=>{console.log("Failed to modify item category"); x=false})

    return x
}
const resolvers = {
    
    Query:{
        findItem: async(root, args: {itemId: String}, context):Promise<ItemDocument | void> => {
            return await findItemFunc(args.itemId)
        },
        findItemsByCategory: async(root, args: {categoryId: String}, context):Promise<ItemDocument[] | void> => {
            return await findItemsByCategoryFunc(args.categoryId)
        }
    },

    Mutation: {
        addItem: async(root, args:{itemId:String}, context): Promise<Boolean> =>{
            return await addItemFunc(args.itemId)
        },
        subtractItem: async(root, args:{itemId:String}, context):Promise<Boolean> => {
            return await subtractItemFunc(args.itemId)
        },
        createItem: async(root, args:{categoryId:String, name:String, expiration:String}, context):Promise<String> =>{
            return await createItemfunc(args.categoryId, args.name, args.expiration)
        },
        modifyItemName: async(root, args: {itemId: String, name: String}, context):Promise<Boolean> =>{
           return await modifyItemNameFunc(args.itemId, args.name)
        },
        modifyItemCategory: async(root, args:{itemId: String, categoryId: String}, context):Promise<Boolean> =>{

            return await modifyItemCategoryFunc(args.itemId, args.categoryId)
        }

    }
}

export default resolvers