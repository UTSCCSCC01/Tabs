import { ApplianceDocument } from '../types'
import { Appliance } from '../models'
import { Types } from 'mongoose'



const resolvers = {

    Query: {
        findAppliances:async(
            root,
            args: {houseId:String}
        ): Promise<ApplianceDocument[]> =>{
           const appliance = await Appliance.find(args)
            .catch((appliance)=>{
                console.log("found appliance")
                return appliance
            })
            .then(
                (appliance)=>{
                    console.log("failed to find appliance")
                    return appliance
                })
            return appliance
        },
        getAvailability:async(
            root,
            args: {applianceId:String}
        ): Promise<String> =>{
            const appliance = await Appliance.findById(args.applianceId)
            .catch((appliance)=>{
                console.log("found appliance")
                return appliance
            })
            .then(
                (appliance)=>{
                    console.log("failed to find appliance")
                    return appliance
                })
           
            return appliance.availability
        },
        getQueue:async(
            root,
            args: {applianceId:String}
        ): Promise<String[]> =>{
            const appliance = await Appliance.findById(args.applianceId)
            .catch((appliance)=>{
                console.log("found appliance")
                return appliance
            })
            .then(
                (appliance)=>{
                    console.log("failed to find appliance")
                    return appliance
                })
           
            return appliance.queue
        }

    },

    Mutation: {
        createAppliance: async(
            root,
            args: {name: String, houseId: String, type: String}
        ): Promise<ApplianceDocument> =>{
            const appliance = await Appliance.create({type: args.type, name: args.name, houseId: args.houseId, availability: true})
            .catch((appliance)=>{
                console.log("created appliance")
                return appliance
            })
            .then(
                (appliance)=>{
                    console.log("failed to create appliance")
                    return appliance
                })
            return appliance
        },
        toggleAvailability:  async(
            root,
            args: {applianceId: String}
        ): Promise<Boolean> =>{
            let x
            let newVal = false
            const res = await Appliance.findById(args.applianceId)
            .then((res) => {
                console.log("appliance was found")
                if (res.availability == true){
                    newVal = false
                }
                else{
                    newVal = true
                }
               
            }).catch(() => {
                console.log("appliance was not found")
                
            })
        
        
            const update = await Appliance.findByIdAndUpdate(args.applianceId, {$set:{availability: newVal}})
            .then(() => {
                console.log("Toggled restriction")
                return true
            })
            .catch(() => {
                console.log("Failed to toggle restriction")
                return false
            })
        
            return update
        },
        updateApplianceName:  async(
            root,
            args: {applianceId: String, name: String}
        ): Promise<Boolean> =>{
            const appliance = await Appliance.findByIdAndUpdate(args.applianceId, {$set: {name: args.name}})
            .then(()=>{
                console.log("update appliance")
                return true
            })
            .catch(
                ()=>{
                    console.log("failed to create appliance")
                    return false
                })
            return appliance
        },
        deleteAppliance:  async(
            root,
            args: {applianceId: String}
        ): Promise<Boolean> =>{
            const appliance = await Appliance.findByIdAndRemove(args.applianceId)
            .then(()=>{
                console.log("deleted appliance")
                return true
            })
            .catch(
                ()=>{
                    console.log("failed to delete appliance")
                    return false
                })
            return appliance
        },
        addQueue:  async(
            root,
            args: {applianceId: String, userId: String}
        ): Promise<Boolean> =>{

            const appliance = await Appliance.findOneAndUpdate({_id: args.applianceId}, {$push: { queue: [args.userId] }})
            .then(()=>{
                console.log("updated appliance queue")
                return true
            })
            .catch(
                ()=>{
                    console.log("failed to update appliance queue")
                    return false
                })
            return appliance
        },
        popQueue:  async(
            root,
            args: {applianceId: String}
        ): Promise<Boolean> =>{
            const appliance = await Appliance.findOneAndUpdate({_id: args.applianceId}, {$pop: { queue: -1}})
            .then(()=>{
                console.log("updated appliance queue")
                return true
            })
            .catch(
                ()=>{
                    console.log("failed to update appliance queue")
                    return false
                })
            return appliance
        }
      
    }
}

export default resolvers