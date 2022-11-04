import { TaskListDocument } from '../types'
import { Task, TaskList } from '../models'
import { Types } from 'mongoose'
import task from '../typeDefs/task'


const resolvers = {

    Query: {
        getTaskList: async(root,
            args: {taskId:String}
            ):Promise<TaskListDocument> => {
            console.log("calling getTaskList")

            const task = await Task.findOne(args)
            .then((task)=>{console.log("found task");return task})
            .catch((task)=>{ console.log("cant find task list"); return task})

            return task
        },
    },

    Mutation: {
        addTaskList: async(
            root,
            args: {userId:String}
        ): Promise<TaskListDocument> =>{

            const taskList = await TaskList.create(args)
            .then((taskList)=>{console.log("Successfuly added a Task List to server"); return taskList})
            .catch(()=>{console.log("Failure to add a Task List to server");return null})
            
            return taskList
        },
        deleteTaskList: async(
            root,
            args: {taskId: String}
        ): Promise<Boolean> =>{

            const task = await TaskList.findByIdAndDelete(args)
            .then(()=>{console.log("Successfuly deleted a Task List to server"); return true})
            .catch(()=>{console.log("Failure to delete a Task List to server"); return false});
            return task
        }
    }
}

export default resolvers