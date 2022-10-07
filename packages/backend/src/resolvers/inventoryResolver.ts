import { InventoryDocument, CategoryDocument } from '../types'
import {Inventory, Category} from '../models'
import { Types } from 'mongoose';


async function addCategoryFunc (inventoryId:String, name: String):Promise<String | Boolean>{
   let x;
   const id = new Types.ObjectId(String(inventoryId))
   const category = await Category.create({inventoryId: inventoryId, name: name})

   await Inventory.findOneAndUpdate( {_id: id}, {$push: {categories: category._id} }).then(()=>{x='success'})


   return category._id

}

async function deleteCategoryFunc(inventoryId:String, categoryId: String):Promise<Boolean>{
    let x;
    const id = new Types.ObjectId(String(inventoryId))
    await Inventory.findOneAndUpdate( {_id: id}, {$pull: {categories: categoryId } })
    .then( () => {console.log("Added Category to Inventory"); x= true})
    .catch(()=>{console.log("Failed to update inventory"); x= false})

    await Category.findOneAndDelete({_id: categoryId}) .then(()=>{console.log("Created Category"); x= true})
.catch(()=>{console.log("Issue adding category"); x= false})

    return x
}

async function createInventory(houseId:String):Promise<String | boolean>{ 
    let x;
    // const inventory = await Inventory.create({houseId:houseId})

    // return String(inventory._id)
    const inventory = await Inventory.create({houseId:houseId}).then((inventory)=> {console.log("Successfully created inventory"); x= String(inventory._id)}).catch(()=>{console.log("Failure to create inventory"); x= false}) 
    return x
}
const resolvers = {

    Mutation: {
        createInventory: async(root, args: {houseId: String}, context):Promise<String |Boolean> =>{
           return await createInventory(args.houseId)
        },
        addCategory: async(root, args: {inventoryId:String, name:String}, context):Promise<String | Boolean> =>{
            return await addCategoryFunc(args.inventoryId, args.name)
        },
        deleteCategory: async(root, args: {inventoryId:String, categoryId:String}, context):Promise<Boolean> =>{
            return await deleteCategoryFunc(args.inventoryId, args.categoryId)
        }

    }
}

export default resolvers