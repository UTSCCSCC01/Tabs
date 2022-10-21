import { CategoryDocument, ItemDocument } from '../types'
import { Category, Item } from '../models'
import { Types } from 'mongoose'
import { isCompositeType } from 'graphql';


async function addCatFunc(userId: String,
                          inventoryId: String, 
                          categoryName: String, 
                          categoryDesc: String,
                          isRestricted: Boolean): Promise<String> {
    let x;
    const res = await Category.create({inventoryId: inventoryId, 
                                       categoryName: categoryName, 
                                       categoryDesc: categoryDesc, 
                                       owner: userId,
                                       isRestricted: isRestricted})
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

async function toggleRestrictionFunc(userId: String, categoryId: String): Promise<Boolean> {
    let x
    let newVal
    const res = await Category.findById(categoryId)
    .then((res) => {
        console.log("categoryId was found")
        if (res.owner == userId) {
            if (res.isRestricted == true) {
                newVal=false
            } else if (res.isRestricted == false) {
                newVal=true
            }
        } else {
            console.log("Non-owner cannot toggle restriction")
            x=false
        }
    }).catch(() => {
        console.log("categoryId was not found")
        x=false
    })

    if (x == false) {
        return false
    }

    await Category.findByIdAndUpdate(categoryId, {$set:{isRestricted: newVal}})
    .then(() => {
        console.log("Toggled restriction")
        x=true
    })
    .catch(() => {
        console.log("Failed to toggle restriction")
        x=false
    })

    return x
}

async function addAdminFunc(userId: String, categoryId: String, targetUser: String): Promise<Boolean> {
    let x
    let isOwner=false
    const res = await Category.findById(categoryId)
    .then((res) => {
        console.log("categoryId was found")
        if (res.owner == userId) {
            isOwner=true
        } else {
            console.log("Non-owner cannot add admins")
            x=false
        }
    }).catch(() => {
        console.log("categoryId was not found")
        x=false
    })

    if (x == false) {
        return false
    }

    if (isOwner) {
        await Category.findByIdAndUpdate(categoryId, {$push:{admins: targetUser}})
        .then(() => {
            console.log("Added an admin")
            x=true
        })
        .catch(() => {
            console.log("Failed to add an admin")
            x=false
    })
    }
    return x
}

async function removeAdminFunc(userId: String, categoryId: String, targetUser: String): Promise<Boolean> {
    let x
    let isOwner=false
    const res = await Category.findById(categoryId)
    .then((res) => {
        console.log("categoryId was found")
        if (res.owner == userId) {
            isOwner=true
        } else {
            console.log("Non-owner cannot remove admins")
            x=false
        }
    }).catch(() => {
        console.log("categoryId was not found")
        x=false
    })

    if (x == false) {
        return false
    }

    if (isOwner) {
        await Category.findByIdAndUpdate(categoryId, {$pull:{admins: targetUser}})
        .then(() => {
            console.log("Removed an admin?")
            x=true
        })
        .catch(() => {
            console.log("Failed to remove an admin")
            x=false
    })
    }
    return x
}

async function changeCatNameFunc(userId: String, categoryId: String, categoryName: String): Promise<Boolean> {
    if (await hasPermissionFunc(userId, categoryId) == false) {
        return false
    }
    let res
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

async function changeCatDescFunc(userId: String, categoryId: String, categoryDesc: String): Promise<Boolean> {
    if (await hasPermissionFunc(userId, categoryId) == false) {
        return false
    }
    let res
    await Category.findByIdAndUpdate(categoryId, {$set:{categoryDesc: categoryDesc}})
    .then(() => {
        console.log("Changed category description")
        res=true
    })
    .catch(() => {
        console.log("Failed to changed category description")
        res=false
    })
    
    return res
}

async function findCatsByInvIdFunc(inventoryId: String): Promise<CategoryDocument[]> {
    const catIds = await Category.find({inventoryId: inventoryId})
    .then(() => {
        console.log("Find categoryIds by inventoryId query was successful")
    })
    .catch(() => {
        console.log("Find categoryIds by inventoryId query was unsuccessful")
        return null
    })

    return catIds
}

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

const resolvers = {
    Query: {
        findCatsByInvId: async(
            root,
            args: {inventoryId: String},
            ): 
            Promise<CategoryDocument[]> => {
                return await findCatsByInvIdFunc(args.inventoryId)
            },
        
        hasPermission: async(
            root,
            args: {userId: String, categoryId: String}
            ):
            Promise<Boolean> => {
                return await hasPermissionFunc(args.userId, args.categoryId)
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
            args: {userId: String, 
                   inventoryId: String, 
                   categoryName: String, 
                   categoryDesc: String
                   isRestricted: Boolean}
            ): Promise<String> =>{
                return await addCatFunc(args.userId,
                                        args.inventoryId, 
                                        args.categoryName, 
                                        args.categoryDesc,
                                        args.isRestricted)
            },

        toggleRestriction: async(
            root,
            args: {userId: String, 
                   categoryId: String}
            ): Promise<Boolean> =>{
                return await toggleRestrictionFunc(args.userId, args.categoryId)
            },

        addAdmin: async(
            root,
            args: {userId: String, 
                   categoryId: String,
                   targetUser: String}
            ): Promise<Boolean> =>{
                return await addAdminFunc(args.userId, args.categoryId, args.targetUser)
            },

        removeAdmin: async(
            root,
            args: {userId: String, 
                   categoryId: String,
                   targetUser: String}
            ): Promise<Boolean> =>{
                return await removeAdminFunc(args.userId, args.categoryId, args.targetUser)
            },

        changeCatName: async(
            root,
            args: {userId: String, categoryId: String, categoryName: String}
            ): Promise<Boolean> => {
                return await changeCatNameFunc(args.userId, args.categoryId, args.categoryName)
            },

        changeCatDesc: async(
            root,
            args: {userId: String, categoryId: String, categoryDesc: String}
            ): Promise<Boolean> => {
                return await changeCatDescFunc(args.userId, args.categoryId, args.categoryDesc)
            }
    }
}

export default resolvers