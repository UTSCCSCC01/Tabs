import { TaskDocument } from '../types'
import { Task } from '../models'
import { Types } from 'mongoose'


const resolvers = {

    Query: {
        getTask: async(root,
            args: {taskId: String}
            ):Promise<TaskDocument[]> => {
            console.log("calling getTask")
            return Task.find(args);
        },
        getAllTasks: async(root,
            args: {taskListId: String}
            ):Promise<TaskDocument[]> => {
            console.log("calling getBill")
            return Task.find(args);
        },
    },

    Mutation: {
        addTask: async(
            root,
            args: {}
        ): Promise<Boolean> =>{

            // const task = await Task.create(args)
            console.log("Successfuly added Task to server")
            return true
        },
        deleteTask: async(
            root,
            args: {taskId: String}
        ): Promise<Boolean> =>{

            // const task = await Task.findByIdAndDelete(args)
            console.log("Successfuly deleted Task to server")
            return true
        },
        editTask: async(
            root,
            args: {task:String, dateDue:String}
        ): Promise<Boolean> =>{

            const task = await Task.findByIdAndUpdate(args)
            console.log("Successfuly edited Task to server")
            return true
        },
        doneTask: async(
            root,
            args: {taskId:String, doneStatus:Boolean}
        ): Promise<Boolean> =>{
            
            //const task = await Task.findByIdAndUpdate(args.taskId, args.doneStatus)
            console.log("Successfuly changed task status to server")
            return true
        }

    }
}

export default resolvers