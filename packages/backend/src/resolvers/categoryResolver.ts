import { CategoryDocument, ItemDocument } from '../types'
import { Category, Item } from '../models'
import { Types } from 'mongoose'

async function addItemFunc(categoryId: String, itemName: String, quantity: Number): Promise<String> {
    const id = new Types.ObjectId(String(categoryId))
    const item = await Item.create({categoryId: categoryId, itemName: itemName, quantity: quantity})
 
    await Category.findOneAndUpdate({_id: id}, {$push: {items: item._id} }).then(()=>(console.log("Added Item to Category"))).catch(()=>{
        console.log("Failed to update category")
        return null
    })

    return String(item._id)
}

async function delItemFunc(categoryId: String, itemId: String): Promise<Boolean> {
    let x;
    const id = new Types.ObjectId(String(categoryId))
    await Category.findOneAndUpdate({_id: id}, {$pull: {items: itemId} })
    .then(()=>{
        console.log("Deleted Item from Category");
        x=true
    })
    .catch(()=>{
        console.log("Failed to update category");
        x= false
    })

    return x
}

async function renameFunc(categoryId: String, categoryName: String): Promise<Boolean> {
    let x;
    await Category.findOneAndUpdate({categoryId: categoryId}, {$set: {categoryName: categoryName}}).then(()=>{x= true}).catch(()=>{x= false})

    return x
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
