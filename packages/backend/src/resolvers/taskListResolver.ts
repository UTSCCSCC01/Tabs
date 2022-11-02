import { TaskListDocument } from '../types'
import { Task, TaskList } from '../models'
import { Types } from 'mongoose'
import task from '../typeDefs/task'


const resolvers = {

    Query: {
        getTaskList: async(root,
            args: {taskId:String}
            ):Promise<Boolean> => {
            console.log("calling getTaskList")

            const task = await Task.findOne(args)
            .then(()=>{console.log("found task");return true})
            .catch(()=>{ console.log("cant find task list"); return false})

            return task
        },
    },

    Mutation: {
        addTaskList: async(
            root,
            args: {userId:String, dateCreated: String}
        ): Promise<Boolean> =>{

            const task = await TaskList.create(args)
            .then(()=>{console.log("Successfuly added a Task List to server"); return true})
            .catch(()=>{console.log("Failure to add a Task List to server");return false})
            
            return task
        },
        deleteTaskList: async(
            root,
            args: {taskId: String}
        ): Promise<Boolean> =>{

            const task = await TaskList.findByIdAndDelete(args)
            console.log("Successfuly deleted a Task List to server")
            return true
        }
    }
}

export default resolvers