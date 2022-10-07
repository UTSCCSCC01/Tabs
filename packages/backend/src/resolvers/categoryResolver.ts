import { CategoryDocument, ItemDocument } from '../types'
import { Category, Item } from '../models'
import { Types } from 'mongoose'

/* Old functions that are no longer in use.
async function addItemFunc(categoryId: String, itemName: String, quantity: Number): Promise<String> {
    const id = new Types.ObjectId(String(categoryId))
    const item = await Item.create({categoryId: categoryId, itemName: itemName, quantity: quantity})
 
    await Category.findOneAndUpdate({_id: id}, {$push:{items: item._id}})
    .then(() => (console.log("Added item to category")))
    .catch(() => {
        console.log("Failed to update category")
        return null
    })

    return String(item._id)
}

async function delItemFunc(categoryId: String, itemId: String): Promise<Boolean> {
    let x;
    const id = new Types.ObjectId(String(categoryId))
    await Category.findOneAndUpdate({_id: id}, {$pull:{items: itemId}})
    .then(() => {
        console.log("Deleted item from category");
        x=true
    })
    .catch(() => {
        console.log("Failed to update category");
        x=false
    })

    return x
}
*/

async function renameFunc(categoryId: String, categoryName: String): Promise<Boolean> {
    let res;
    await Category.findOneAndUpdate({categoryId: categoryId}, {$set:{categoryName: categoryName}})
    .then(() => {
        console.log("Renamed category")
        res=true
    })
    .catch(() => {
        console.log("Failed to rename category")
        res=false
    })

    return res
}

async function changeDescFunc(categoryId: String, categoryDesc: String): Promise<Boolean> {
    let res;
    await Category.findOneAndUpdate({categoryId: categoryId}, {$set:{categoryDesc: categoryDesc}})
    .then(() => {
        console.log("Changed category description")
        res=true
    })
    .catch(() => {
        console.log("Failed to changed category description")
        res=false})
    
    return res
}

async function findCatsFunc(inventoryId: String): Promise<String[]> {
    let res: String[];
    const catIds = await Category.find({inventoryId: inventoryId}, 'categoryId')
    .then(() => {
        console.log("Find categoryIds by inventoryId query was successful")
        for (let i=0; i<catIds.length; i++) {
            res.push(String(catIds[i]._id))
        }
    })
    .catch(() => {
        console.log("Find categoryIds by inventoryId query was successful")
        return null
    })

    return res
}

const resolvers = {
    Query: {
        findCatByInvId: async(
            root,
            args: {inventoryId: string},
            ): 
            Promise<String[]> => {
                return await findCatsFunc(args.inventoryId)
            }
    },

    Mutation: {
        /* Old functions that are no longer in use.
        addItem: async(
            root,
            args: {categoryId: String, itemName: String, quantity: Number}
            ): Promise<String> => {
                return await addItemFunc(args.categoryId, args.itemName, args.quantity)
            },

        deleteItem: async(
            root,
            args: {categoryId: String, itemId: String}
            ): Promise<Boolean> => {
                return await delItemFunc(args.categoryId, args.itemId)
            },
        */

        renameCat: async(
            root,
            args: {categoryId: String, categoryName: String}
            ): Promise<Boolean> => {
                return await renameFunc(args.categoryId, args.categoryName)
            },

        changeCatDesc: async(
            root,
            args: {categoryId: String, categoryDesc: String}
            ): Promise<Boolean> => {
                return await changeDescFunc(args.categoryId, args.categoryDesc)
            }
    }
}

export default resolvers