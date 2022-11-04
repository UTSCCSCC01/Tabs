import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getTask(
            taskId: String!
        ): Task
        getAllTasks(
            taskListId: String!
        ): [Task]
        getAllOwnerTasks(
            owner:String!
        ): [Task]
    }

    extend type Mutation {
        createTask(
            taskListId: String,
            owner: String,
            task: String,
            dateDue: String,
            houseId: String
        ):Task
        createSubtask(
            parentId: String!,
            owner: String,
            task: String,
            dateDue: String,
            houseId: String
        ): Task
        deleteTask(
            taskId:String
        ): Boolean
        editTask(
            taskId: String!,
            taskListId: String
            task: String,
            dateDue: String
        ): Task
        toggleDoneTask(
            taskId: String,
            doneStatus: Boolean
        ):Boolean

    }
  
    type Task {
        id: ID,
        houseId: String,
        parentId: String,
        taskListId:String,
        owner: String,
        task: String,
        dateDue: String,
        doneStatus: Boolean
    }
        
`