import { TaskListDocument } from '../types'
import { TaskList } from '../models'
import { Types } from 'mongoose'
import task from '../typeDefs/task'


const resolvers = {

    Query: {
        getTaskList: async(root,
            args: {taskId:String}
            ):Promise<TaskListDocument> => {
            console.log("calling getTaskList")

            const taskList = await TaskList.findOne(args)
            .then((taskList)=>{console.log("found task");return taskList})
            .catch((taskList)=>{ console.log("cant find task list"); return taskList})

            return taskList
        },
        getTaskListByUser: async(root, args: {owner: String}):Promise<[TaskListDocument]> =>{

            const taskList = await TaskList.findOne(args)
            .then((taskList)=>{console.log("found task");return taskList})
            .catch((taskList)=>{ console.log("cant find task list"); return taskList})

            return [taskList]
        }
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