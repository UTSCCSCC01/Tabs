import { TaskDocument } from '../types'
import { Task, TaskList } from '../models'
import task from '../typeDefs/task';



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
            console.log("calling getAllTasks")
            return Task.find(args);
<<<<<<< HEAD
=======
        },
        getAllOwnerTasks: async(root, 
            args: {owner: String}): Promise<TaskDocument[]> =>{
                console.log("calling getAllOwnerTasks")
                return Task.find(args);
        },
        getAllSubtasks: async(root, 
            args: {parentId: String}): Promise<TaskDocument[]> =>{
                return Task.find(args)
>>>>>>> 4a24a7a1cd5de27dcc3b53c1d5266032b113ba71
        }
    },

    Mutation: {
        createTask: async(
            root,
            args: {taskListId: String, owner: String, task: String, dateDue:String}
        ): Promise<TaskDocument> =>{
            const empty:TaskDocument = new Task()
            const task = await Task.create(args)
            .then((task)=>{console.log("Successfuly added Task to db");return task})
            .catch(()=>{console.log("Failure to add task to db"); return empty})
           
            return task
        },
        createSubtask: async(
            root,
            args: {parentId: String, owner: String, task:String, dateDue: String, houseId: String}
        ): Promise<TaskDocument> =>{
            const empty:TaskDocument = new Task()
            const subtask = await Task.create(args)
            .then((task)=>{console.log("Successfuly added Task to db");return task})
            .catch(()=>{console.log("Failure to add task to db"); return empty})

            return subtask

        },
        deleteTask: async(
            root,
            args: {taskId: String}
        ): Promise<Boolean> =>{

            const task = await Task.findByIdAndDelete(args.taskId)
            .then(()=>{
            console.log("Successfuly deleted Task from db");
            return true})
            .catch(()=>{console.log("Failure to delete task from db"); return false})
            console.log("Successfuly deleted Task to db")
            return task
        },
        editTask: async(
            root,
            args: {taskId:String, taskListId:String, task:String, dateDue:String}
        ): Promise<TaskDocument> =>{
            //returns if the updated task values work
            const empty = new Task()
            const task = await Task.findByIdAndUpdate(args.taskId, {task: args.task, dateDue: args.dateDue})
            .then((task)=>{
                console.log("Successfuly edited Task to db");
                task.task = args.task
                task.dateDue = args.dateDue
                task.taskListId = args.taskListId
                return task})
            .catch(()=>{
                console.log("Failure to edit task");
                return empty});
            
            return task
        },
        toggleDoneTask: async(
            root,
            args: {taskId:String, doneStatus:Boolean}
        ): Promise<Boolean> =>{
            //returns the status of the tasks
            let status;
            if (args.doneStatus == true){
                 status = false 
            }
            else{
                status = true
            }
            const done = await Task.findByIdAndUpdate(args.taskId, {doneStatus: status})
            .then(()=>{
                console.log("Successfully changed status");
                return status})
            .catch(()=>{
                console.log("Failure to change status");
                return status});
            return done
        }

    }
}

export default resolvers