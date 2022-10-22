import {  CategoryDocument, ItemDocument } from '../types'
import { Category, Item } from '../models'
import {Types} from 'mongoose'
import item from '../typeDefs/item'

/**
 * Resolver for item
 * 
 * @name itemResolver
 * @method hasPermission
 * @method findItem
 * @method findItemsByCategory
 * @method addItem
 * @method subtractItem
 * @method createItem
 * @method modifyItemName
 * @method modifyItemCategory
 */

/**
 * Checks if the given user has permission to modify the category
 * 
 * @name hasPermission
 * @in itemResolver
 * @param userId
 * @param categoryId
 * @returns true if the user has permission, false otherwise
 */
async function hasPermissionFunc(userId: String, categoryId: String): Promise<Boolean> {
    let x
    const res = await Category.findById(categoryId)
    .then((res) => {
        console.log("categoryId was found")
        if (res.isRestricted == false ||
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

/**
 * Finds the item with the given ID
 * 
 * @name findItem
 * @in itemResolver
 * @param itemId
 * @returns the item document matching the given ID
 */
async function findItemFunc(itemId:String):Promise<ItemDocument> {
    const item = await Item.findById(itemId)
    return item
}

/**
 * Finds the items within a given category
 * 
 * @name findItemsByCategory
 * @in itemResolver
 * @param categoryId
 * @returns an array of item documents that are in the given category
 */
async function findItemsByCategoryFunc(categoryId:String):Promise<ItemDocument[]>{
    const items = await Item.find({categoryId:categoryId})
    return items

}

/**
 * Increments the quantity of the given item by 1
 * 
 * @name addItem
 * @in itemResolver
 * @param userId
 * @param itemId
 * @returns true if the operation was successful, false otherwise
 */
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

/**
 * Decrements the quantity of the given item by 1
 * 
 * @name addItem
 * @in itemResolver
 * @param userId
 * @param itemId
 * @returns true if the operation was successful, false otherwise
 */
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

/**
 * Creates an item in the given category
 * 
 * @name createItem
 * @in itemResolver
 * @param userId
 * @param categoryId ID of the category
 * @param name Name of the item
 * @param expiration
 * @returns the ID of the newly created item
 */
async function createItemfunc(userId:String, categoryId:String, name:String, expiration:String):Promise<String>{
    if (await hasPermissionFunc(userId, categoryId) == false) {
        return ""
    }
    let x;
    const res = await Item.create({categoryId:categoryId, name:name, expiration:expiration}).then((res)=>{console.log("Created Item"); x=res.id}).catch(()=>{console.log("Failed to create Item"); x=""})
    return x

}

/**
 * Modifies the given item's name
 * 
 * @name modifyItemName
 * @in itemResolver
 * @param userId
 * @param itemId
 * @param name The item's new name
 * @returns true if the operation was successful, false otherwise
 */
async function modifyItemNameFunc(userId:String, itemId:String, name:String):Promise<Boolean>{
    const res = await Item.findById(itemId)
    if (await hasPermissionFunc(userId, res.categoryId) == false) {
        return false
    }
    let x
    await Item.findByIdAndUpdate(itemId, { name: name}) .then(()=>{console.log("Successfully modified item name"); x=true}).catch(()=>{console.log("Failed to modify item name"); x=false})
    return x
}

/**
 * Modifies the given item's category
 * 
 * @name modifyItemCategory
 * @in itemResolver
 * @param userId
 * @param itemId
 * @param categoryId ID of the item's new category
 * @returns true if the operation was successful, false otherwise
 */
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