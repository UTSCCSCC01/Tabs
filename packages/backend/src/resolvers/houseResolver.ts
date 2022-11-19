import { HouseDocument } from '../types'
import { House } from '../models'
import { Types } from 'mongoose'



const resolvers = {

    Query: {
        getHouse: async(root,
            args: {houseId: String, userId: String}
            ):Promise<HouseDocument> => {
            return House.findOne(args);
        },

        getHouseByOwner: async(root,
            args: {owner: String},
            ):Promise<HouseDocument[]> => {
                return House.find(args);
        },
    },

    Mutation: {
        addHouse: async(
            root,
            args: {owner: String, name: String; address: String, dateCreated: String}
        ): Promise<HouseDocument> =>{

            const house = await House.create(args)
            .then((house)=>{ 
                console.log("Successfuly added house to server");
                return house
            })
            .catch((house)=>{
                console.log("Failure to add house to server");
                return house
            })
            return house
        },
        
        deleteHouse: async(root, args: {houseId: String, owner:String}):Promise<Boolean> =>{
            const check = await House.findById(args.houseId)
            .then((check)=>{
                if(check.owner === args.owner){
                    return true
                }
                else{
                    return false
                } 
            })
            .catch(()=>{ 
                console.log("failure to find by id");
                return false;
            })
            
            //checks if owner is found
            if (check == true){
            const house = await House.findByIdAndDelete(args.houseId)
            .then(()=>{ 
                console.log("Successfuly deleted house from server");
                return true
            })
            .catch(()=>{
                console.log("Failure to delete house from server");
                return false
            })
                return house
            }
            else{
                return false
            }
        },
                
        modifyHouseName: async(root, args: {houseId: String, owner: String, name: String}):Promise<HouseDocument> =>{
            const check = await House.findById(args.houseId)
            .then((check)=>{
                if(check.owner === args.owner){
                    return true
                }
                else{
                    return false
                } 
            })
            .catch(()=>{ 
                console.log("failure to find by id");
                return false;
            })
            const empty = new House();
            empty._id = null

            //checks if owner is found
            if (check == true){
            const house = await House.findByIdAndUpdate(args.houseId, {$set:{name: args.name}})
            .then((house)=>{ 
                house.name = args.name
                console.log("Successfuly modified house name");
                return house
            })
            .catch((house)=>{
                console.log("Failure to modify house name ");
                return house
            })
                return house
            }
            else{
                return empty;
            }
         },
                 
         modifyHouseOwner: async(root, args: {houseId: String, owner: String, newOwner: String}):Promise<HouseDocument> =>{
            const check = await House.findById(args.houseId)
            .then((check)=>{
                if(check.owner === args.owner){
                    return true
                }
                else{
                    return false
                } 
            })
            .catch(()=>{ 
                console.log("failure to find by id");
                return false;
            })
            const empty = new House();
            empty._id = null

            //checks if owner is found 
            if (check == true){
            const house = await House.findByIdAndUpdate(args.houseId, {$set:{owner: args.newOwner}})
            .then((house)=>{ 
                house.owner = args.newOwner;
                console.log("Successfuly modified house owner");
                return house
            })
            .catch((house)=>{
                console.log("Failure to modify house owner");
                return house
            })
                return house
            }
            else{
                return empty
            }
            
         },
                 
         modifyHouseAddress: async(root, args: {houseId: String, owner:String, address: String}):Promise<HouseDocument> =>{
            const check = await House.findById(args.houseId)
            .then((check)=>{
                if(check.owner === args.owner){
                    return true
                }
                else{
                    return false
                } 
            })
            .catch(()=>{ 
                console.log("failure to find by id");
                return false;
            })
            const empty = new House();
            empty._id = null
            //checks if owner is found 
            if (check == true){
            const house = await House.findByIdAndUpdate(args.houseId, {$set:{address: args.address}})
            .then((house)=>{ 
                house.address = args.address
                console.log("Successfuly modified house address");
                return house
            })
            .catch((house)=>{
                console.log("Failure to modify house address");
                return house
            })
                return house
            }
            else{

                return empty
            }
         },
    }
}

export default resolvers