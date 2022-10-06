import { CategoryDocument, ItemDocument } from '../types'
import { Category, Item } from '../models'

async function addItemFunc(categoryId: String, itemName: String, quantity: Number): Promise<String> {
    const item = await new Promise<ItemDocument>
     (()=>(Item.create({categoryId: categoryId, itemName: itemName, quantity: quantity}))
     .then(()=>(console.log("Created Item")))
     .catch(()=>(console.log("Issue adding item"))))
 
    await new Promise<CategoryDocument> 
    (()=>(Category.findOneAndUpdate({categoryId: categoryId}, {$push: {items: item._id} })))
    .then(()=>(console.log("Added Item to Category")))
    .catch(()=>{
        console.log("Failed to update category")
        return null
    })

    return String(item._id)
}

async function delItemFunc(categoryId: String, itemId: String): Promise<Boolean> {
    await new Promise<CategoryDocument> 
    (()=>(Category.findOneAndUpdate({categoryId: categoryId}, {$pull: {items: itemId} })))
    .then(()=>(console.log("Deleted Item from Category")))
    .catch(()=>{
        console.log("Failed to update category")
        return false
    })

    return true
}

async function renameFunc(categoryId: String, categoryName: String): Promise<Boolean> {
    await new Promise<CategoryDocument>
    (()=>(Category.findOneAndUpdate({categoryId: categoryId}, {$set: {categoryName: categoryName}})))
    .then(()=>(console.log("Renamed Category")))
    .catch(()=>{
        console.log("Failed to rename category")
        return false
    })

    return true
}

const resolvers = {
    Mutation: {
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
        
        rename: async(
            root,
            args: {categoryId: String, categoryName: String}
            ): Promise<Boolean> => {
                return await renameFunc(args.categoryId, args.categoryName)
            }
    }
}

export default resolvers
