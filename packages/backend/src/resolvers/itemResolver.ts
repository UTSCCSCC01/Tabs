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

async function addItemFunc(itemId:String):Promise<String> {
    let x
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:1}}).then(()=>{x="Success"}).then(()=>(x="Failure"))

    return x
    
}
async function subtractItemFunc(itemId:String):Promise<String> {
    let x
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:-1}}).then(()=>{x="Success"}).then(()=>(x="Failure"))
    return x
    
}

async function createItemfunc(categoryId:String, name:String, expiration:String):Promise<String>{
    let x;
    await Item.create({categoryId:categoryId, name:name, expiration:expiration}).then(()=>{console.log("Created  Item"); x= true}).catch(()=>{console.log("Failed to create Item"); x= false})
    return x

}
async function modifyItemNameFunc(itemId:String, name:String):Promise<String>{
    let x
    const id = new Types.ObjectId(String(itemId))
    await Item.findByIdAndUpdate(itemId, { name: name}) .then(()=>{console.log("Successfully modified item name"); x= name}).catch(()=>{console.log("Failed to modify item name"); x= ""})
    return x
}

async function modifyItemCategoryFunc(itemId: String, category: String ): Promise<String>{
    let x
   
    await Item.findByIdAndUpdate(itemId, { category: category}).then(()=>{console.log("Successfully modified item name"); x= category}).catch(()=>{console.log("Failed to modify item name"); x= ""})
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
        addItem: async(root, args:{itemId:String}, context): Promise<String> =>{
            return await addItemFunc(args.itemId)
        },
        subtractItem: async(root, args:{itemId:String}, context):Promise<String> => {
            return await subtractItemFunc(args.itemId)
        },
        createItem: async(root, args:{categoryId:String, name:String, expiration:String}, context):Promise<String> =>{
            return await createItemfunc(args.categoryId, args.name, args.expiration)
        },
        modifyItemName: async(root, args: {itemId: String, name: String}, context):Promise<String> =>{
           return await modifyItemNameFunc(args.itemId, args.name)
        },
        modifyItemCategory: async(root, args:{itemId: String, category: String}, context):Promise<String> =>{
            return await modifyItemCategoryFunc(args.itemId, args.category)
        }

    }
}

export default resolvers