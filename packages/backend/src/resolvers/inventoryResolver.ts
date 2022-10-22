import { InventoryDocument } from '../types'
import {Inventory} from '../models'
import { Types } from 'mongoose';
//resolver

/**
 * Resolver for inventory
 * 
 * @name inventoryResolver
 * @method findInventory
 * @method createInventory
 */

/**
 * Finds inventories for a given house
 * 
 * @name findInventory
 * @in inventoryResolver
 * @param houseId ID of the house that the inventories belong to
 * @returns an array of IDs that belong to inventories that match the given houseId
 */
async function findInventory(houseId:String):Promise<String[]>{
    // This function will need to be redone when House backend is created.
    const inventory = await Inventory.find({houseId:houseId}, "_id")
    let i = 0;
    let inv: String[]= []
    if (inventory.length > 0){
        
        while(i < inventory.length){
            inv[i] = String(Inventory[i]._id)
            i++
        }
    }
    return inv

}

/**
 * Creates an inventory for a given house
 * 
 * @name createInventory
 * @in inventoryResolver
 * @param houseId ID of the house the inventory belongs to
 * @returns ID of the current inventory
 */
async function createInventory(houseId:String):Promise<String>{ 
    let x;
    // const inventory = await Inventory.create({houseId:houseId})
    // return String(inventory._id)

    await Inventory.create({houseId:houseId}).then((inventory)=> {console.log("Successfully created inventory"); x= String(inventory._id)}).catch(()=>{console.log("Failure to create inventory"); x= ""}) 
    return x
}
const resolvers = {
    Query:{
        findInventory: async(root, args:{houseId: String}, context):Promise<String[]> =>{
            return await findInventory(args.houseId)
        }

    },

    Mutation: {
        createInventory: async(root, args: {houseId: String}, context):Promise<String> =>{
           return await createInventory(args.houseId)
        }

    }
}

export default resolvers