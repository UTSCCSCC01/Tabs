import { ScheduleDocument } from '../types'
import { Schedule } from '../models'
import { Types } from 'mongoose'



const resolvers = {

    Query: {
        findSchedule: async(
            root,
            args: {applianceId: String}
        ): Promise<ScheduleDocument[]> => {
           const schedule = await Schedule.find(args)
            .catch((schedule)=>{
                console.log("found appliance")
                return schedule
            })
            .then(
                (schedule)=>{
                    console.log("failed to find appliance")
                    return schedule
                })
            return schedule
        }

    },

    Mutation: {
        createSchedule: async(
            root,
            args: {applianceId: String,
                start: String,
                end: String}
        ): Promise<ScheduleDocument> =>{

            const start = Number(args.start)
            const end = Number(args.end)
            const schedule = await Schedule.create({applianceId: args.applianceId, start: start, end: end})
            .catch((schedule)=>{
                console.log("created schedule")
                return schedule
            })
            .then(
                (schedule)=>{
                    console.log("failed to create schedule")
                    return schedule
                })
            return schedule
        },
        deleteSchedule: async(
            root,
            args: {scheduleId: String}
        ): Promise<Boolean> =>{
            const schedule = await Schedule.findByIdAndRemove(args.scheduleId)
            .catch(()=>{
                console.log("deleted schedule")
                return true
            })
            .then(
                ()=>{
                    console.log("failed to delete schedule")
                    return false
                })
            return schedule
        }
      
    }
}

export default resolvers