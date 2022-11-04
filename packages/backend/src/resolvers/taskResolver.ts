import { TaskDocument } from '../types'
import { Task } from '../models'
import { Types } from 'mongoose'
import taskList from '../typeDefs/taskList'


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
            args: {taskStringId: String, owner: String, task: String, dateDue:String}
        ): Promise<TaskDocument|void> =>{

            const task = await Task.create(args)
            .then((task)=>{console.log("Successfuly added Task to db");return task})
            .catch(()=>{console.log("Failure to add task to db"); return null})
           
            return task
        },
        deleteTask: async(
            root,
            args: {taskId: String}
        ): Promise<Boolean> =>{

            const task = await Task.findByIdAndDelete(args)
            .then(()=>{console.log("Successfuly deleted Task from db");return true})
            .catch(()=>{console.log("Failure to delete task from db"); return false})
            console.log("Successfuly deleted Task to db")
            return task
        },
        editTask: async(
            root,
            args: {taskId:String, task:String, dateDue:String}
        ): Promise<Boolean> =>{

            const task = await Task.findByIdAndUpdate(args.taskId, {task: args.task, dateDue: args.dateDue})
            .then(()=>{console.log("Successfuly edited Task to db"); return true})
            .catch(()=>{console.log("Failure to edit task"); return false});
            
            return task
        },
        doneTask: async(
            root,
            args: {taskId:String, doneStatus:Boolean}
        ): Promise<Boolean> =>{
            //takes in current donestatus and switches it
            let status;
            if (args.doneStatus == true){ status = false }
            else{ status = true }
            const done = await Task.findById(args.taskId, {doneStatus: status})
            .then(()=>{console.log("Successfully changed status");return true})
            .catch(()=>{console.log("Failure to change status"); return false});
            return done
        }

    }
}

export default resolvers