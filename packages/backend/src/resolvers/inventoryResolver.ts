import { InventoryDocument, CategoryDocument } from '../types'
import {Inventory, Category} from '../models'


async function addCategoryFunc (inventoryId:String, name: String):Promise<String | Boolean>{
    let x;
   const category = await new Promise<CategoryDocument>
    (() => ( Category.create({inventoryId: inventoryId, name: name}))
    .then(()=>(console.log("Created Category")))
    .catch(()=>(console.log("Issue adding category"))))

   await new Promise<InventoryDocument> 
   (()=>(Inventory.findOneAndUpdate( {inventoryId: inventoryId}, {$push: {categories: category._id} })))
   .then( () => {console.log("Added Category to Inventory"); x = String(category._id)})
   .catch(()=>{console.log("Failed to update inventory"); x = false})

   return x

}

async function deleteCategoryFunc(inventoryId:String, categoryId: String):Promise<Boolean>{
    let x;
    await new Promise<InventoryDocument> 
    (()=>(Inventory.findOneAndUpdate( {inventoryId: inventoryId}, {$pull: {categories: categoryId } })))
    .then( () => {console.log("Added Category to Inventory"); x= true})
    .catch(()=>{console.log("Failed to update inventory"); x= false})

    await new Promise<CategoryDocument>
    (() => ( Category.findOneAndDelete({_id: categoryId}))
    .then(()=>{console.log("Created Category"); x= true})
    .catch(()=>{console.log("Issue adding category"); x= false}))

    return x
}

async function createInventory(houseId:String):Promise<String | boolean>{ 
    let x;
    const inventory = await new Promise<InventoryDocument> 
    (() => (Inventory.create({houseId:houseId}) ))
    .then((inventory)=> {console.log("Successfully created inventory"); x= String(inventory._id)})
    .catch(()=>{console.log("Failure to create inventory"); x= false}) 
    return x
}
const resolvers = {

    Mutation: {
        createInventory: async(root, args: {inventoryId:String, houseId: String}, context):Promise<String |Boolean> =>{
           return createInventory(args.houseId)
        },
        addCategory: async(root, args: {inventoryId:String, name:String}, context):Promise<String | Boolean> =>{
            return(addCategoryFunc(args.inventoryId, args.name))
        },
        deleteCategory: async(root, args: {inventoryId:String, categoryId:String}, context):Promise<Boolean> =>{
            return deleteCategoryFunc(args.inventoryId, args.categoryId)
        }

    }
}

export default resolvers