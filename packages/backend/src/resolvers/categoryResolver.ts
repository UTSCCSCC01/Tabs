import { CategoryDocument, ItemDocument } from '../types'
import { Category, Item } from '../models'
import { Types } from 'mongoose'

/* Old functions that are no longer in use.
async function addItemFunc(categoryId: String, itemName: String, quantity: Number): Promise<String> {
    const id = new Types.ObjectId(String(categoryId))
    const item = await Item.create({categoryId: categoryId, itemName: itemName, quantity: quantity})
 
    await Category.findOneAndUpdate({_id: id}, {$push:{items: item._id}})
    .then(() => {
        console.log("Added item to category")
    })
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
async function addCatFunc(inventoryId: String, categoryName: String, categoryDesc: String): Promise<String> {
    let x;
    const res = await Category.create({inventoryId: inventoryId, categoryName: categoryName, categoryDesc: categoryDesc})
    .then((res) => {
        console.log("Added category")
        x=String(res._id)
    })
    .catch(() => {
        console.log("Failed to add category")
        x=null
    })
    
    return x
}

async function changeCatNameFunc(categoryId: String, categoryName: String): Promise<Boolean> {
    let res;
    await Category.findByIdAndUpdate(categoryId, {$set:{categoryName: categoryName}})
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

async function changeCatDescFunc(categoryId: String, categoryDesc: String): Promise<Boolean> {
    let res;
    await Category.findByIdAndUpdate(categoryId, {$set:{categoryDesc: categoryDesc}})
    .then(() => {
        console.log("Changed category description")
        res=true
    })
    .catch(() => {
        console.log("Failed to changed category description")
        res=false})
    
    return res
}

async function findCatsByInvIdFunc(inventoryId: String): Promise<CategoryDocument[]> {
    let res: String[];
    console.log("AAAAAAAAAAA")
    const catIds = await Category.find({inventoryId: inventoryId})
    .then((catIds) => {
        console.log("Find categoryIds by inventoryId query was successful")
        return catIds
    })
    .catch(() => {
        console.log("Find categoryIds by inventoryId query was unsuccessful")
        return null
    })

    return catIds
}

const resolvers = {
    Query: {
        findCatsByInvId: async(
            root,
            args: {inventoryId: string},
            ): 
            Promise<CategoryDocument[]> => {
                console.log("BBBBBBBBBBBB")
                console.log(args);
                return await findCatsByInvIdFunc(args.inventoryId)
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
        addCat: async(
            root,
            args: {inventoryId: String, categoryName: String, categoryDesc: String}
            ): Promise<String> =>{
                console.log("CCCCCCCCC")
                console.log(args);
                return await addCatFunc(args.inventoryId, args.categoryName, args.categoryDesc)
            },

        changeCatName: async(
            root,
            args: {categoryId: String, categoryName: String}
            ): Promise<Boolean> => {
                return await changeCatNameFunc(args.categoryId, args.categoryName)
            },

        changeCatDesc: async(
            root,
            args: {categoryId: String, categoryDesc: String}
            ): Promise<Boolean> => {
                return await changeCatDescFunc(args.categoryId, args.categoryDesc)
            }
    }
}

export default resolvers