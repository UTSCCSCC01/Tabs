import {  ItemDocument } from '../types'
import { Item } from '../models'
import {Types} from 'mongoose'
import item from '../typeDefs/item'





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
    console.log("Modifying item with id: " + itemId + "\nSo that it has capacity + 1");
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:1}}).then(()=>{x="Success"}).catch(()=>(x="Failure"))

    return x
    
}
async function subtractItemFunc(itemId:String):Promise<String> {
    let x
    console.log("Modifying item with id: " + itemId + "\nSo that it has capacity - 1");
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:-1}}).then(()=>{x="Success"}).catch(()=>(x="Failure"))
    return x
    
}

async function createItemfunc(categoryId:String, name:String, expiration:String):Promise<String>{
    let x;
    await Item.create({categoryId:categoryId, name:name, expiration:expiration}).then(()=>{console.log("Created  Item"); x= true}).catch(()=>{console.log("Failed to create Item"); x= false})
    return x

}
async function modifyItemNameFunc(itemId:String, name:String):Promise<String>{
    console.log("Modifying item with id: " + itemId + "\nSo that it has name: " + name);
    let x
    await Item.findByIdAndUpdate(itemId, { name: name}) .then(()=>{console.log("Successfully modified item name"); x= name}).catch(()=>{console.log("Failed to modify item name"); x= ""})
    return x
}

async function modifyItemCategoryFunc(itemId: String, categoryId: String ): Promise<String>{
    console.log("Modifying item with id: " + itemId + "\nSo that it has category Id : " + categoryId);

    let x
   
    await Item.findByIdAndUpdate(itemId, { categoryId: categoryId}).then(()=>{console.log("Successfully modified item category"); x= categoryId}).catch(()=>{console.log("Failed to modify item category"); x= ""})
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
        modifyItemCategory: async(root, args:{itemId: String, categoryId: String}, context):Promise<String> =>{
            return await modifyItemCategoryFunc(args.itemId, args.categoryId)
        }

    }
}

export default resolvers