import {  CategoryDocument, ItemDocument } from '../types'
import { Category, Item } from '../models'
import {Types} from 'mongoose'
import item from '../typeDefs/item'



async function hasPermissionFunc(userId: String, categoryId: String): Promise<Boolean> {
    let x
    const res = await Category.findById(categoryId)
    .then((res) => {
        console.log("categoryId was found")
        if (res.isRestricted == false || res.isRestricted == null ||
           res.isRestricted == true && (res.owner == userId || res.admins.includes(userId))) {
            x=true
        } else {
            console.log("no permission :(")
            x=false
        }
    })
    .catch(() => {
        console.log("categoryId was not found")
        x=false
    })

    return x
}


async function findNumberItems(categoryId: String):Promise<number>{
    const item = await Item.countDocuments({categoryId: categoryId})
    return item
}

async function findNumberExpiredFunc(categoryId: String):Promise<number>{
    const date = Date.now();
    const expired = await Item.countDocuments({ categoryId: categoryId, expiration: {$lt:date}})
    return expired
}

async function findSoonExpiredItemsFunc(categoryId: String, time: number):Promise<ItemDocument[]>{
    const date = Date.now();
    const item = await Item.find({categoryId: categoryId, expiration:{$gte:date, $lte:time}})
    return item
}

async function findAllExpiredItemsFunc():Promise<ItemDocument[]>{
    const date = Date.now();
    const item = await Item.find({expiration: {$lt:date}})
    return item
}

async function findItemFunc(itemId:String):Promise<ItemDocument> {
    const item = await Item.findById(itemId)
    return item
}


async function findItemsByCategoryFunc(categoryId:String):Promise<ItemDocument[]>{
    const items = await Item.find({categoryId:categoryId})
    return items

}

async function addItemFunc(userId:String, itemId:String):Promise<Boolean> {
    const res = await Item.findById(itemId)
    if (await hasPermissionFunc(userId, res.categoryId) == false) {
        return false
    }
    let x
    console.log("Modifying item with id: " + itemId + "\nSo that it has capacity + 1");
    //await Item.findByIdAndUpdate(itemId, {$inc:{quantity:1}}).then(()=>{x="Success"}).catch(()=>(x="Failure"))
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:1}}).then(()=>{x=true}).catch(()=>(x=false))


    return x
    
}
async function subtractItemFunc(userId:String, itemId:String):Promise<Boolean> {
    const res = await Item.findById(itemId)
    if (await hasPermissionFunc(userId, res.categoryId) == false) {
        return false
    }
    let x
    console.log("Modifying item with id: " + itemId + "\nSo that it has capacity - 1");
    //await Item.findByIdAndUpdate(itemId, {$inc:{quantity:-1}}).then(()=>{x="Success"}).catch(()=>(x="Failure"))
    await Item.findByIdAndUpdate(itemId, {$inc:{quantity:-1}}).then(()=>{x=true}).catch(()=>(x=false))

    return x
    
}

async function createItemfunc(userId:String, categoryId:String, name:String, expiration:String):Promise<String>{
    if (await hasPermissionFunc(userId, categoryId) == false) {
        return ""
    }
    let x;
    const res = await Item.create({categoryId:categoryId, name:name, expiration:expiration}).then((res)=>{console.log("Created Item"); x=res.id}).catch(()=>{console.log("Failed to create Item"); x=""})
    return x

}

async function modifyItemNameFunc(userId:String, itemId:String, name:String):Promise<Boolean>{
    const res = await Item.findById(itemId)
    if (await hasPermissionFunc(userId, res.categoryId) == false) {
        return false
    }
    let x
    await Item.findByIdAndUpdate(itemId, { name: name}) .then(()=>{console.log("Successfully modified item name"); x=true}).catch(()=>{console.log("Failed to modify item name"); x=false})
    return x
}

async function modifyItemCategoryFunc(userId:String, itemId: String, categoryId: String ): Promise<Boolean>{
    const res = await Item.findById(itemId)
    if (await hasPermissionFunc(userId, res.categoryId) == false) {
        return false
    }
    if (await hasPermissionFunc(userId, categoryId) == false) {
        return false
    }
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
        },
        findAllExpiredItems: async(root, args):Promise<ItemDocument[]> => {
            return await findAllExpiredItemsFunc()
        },
        findNumberItems: async(root, args:{categoryId: String}):Promise<number> => {
            return await findNumberItems(args.categoryId)
        },
        findNumberExpiredFunc: async(root, args:{categoryId: String}):Promise<number> => {
            return await findNumberExpiredFunc(args.categoryId)
        },
        findSoonExpiredItems: async(root, args:{categoryId: String, time:number}):Promise<ItemDocument[]> =>{
            return await findSoonExpiredItemsFunc(args.categoryId, args.time)
        }
    },

    Mutation: {
        addItem: async(root, args:{userId:String, itemId:String}, context): Promise<Boolean> =>{
            return await addItemFunc(args.userId, args.itemId)
        },
        subtractItem: async(root, args:{userId:String, itemId:String}, context):Promise<Boolean> => {
            return await subtractItemFunc(args.userId, args.itemId)
        },
        createItem: async(root, args:{userId:String, categoryId:String, name:String, expiration:String}, context):Promise<String> =>{
            return await createItemfunc(args.userId, args.categoryId, args.name, args.expiration)
        },
        modifyItemName: async(root, args: {userId:String, itemId: String, name: String}, context):Promise<Boolean> =>{
           return await modifyItemNameFunc(args.userId, args.itemId, args.name)
        },
        modifyItemCategory: async(root, args:{userId:String, itemId: String, categoryId: String}, context):Promise<Boolean> =>{

            return await modifyItemCategoryFunc(args.userId, args.itemId, args.categoryId)
        }

    }
}

export default resolvers