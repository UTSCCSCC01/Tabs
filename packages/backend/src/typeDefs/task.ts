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
        addTask(
            taskListId: String!,
            owner: String,
            task: String,
            dateDue: String,
            houseId: String
        ):Task  
        deleteTask(
            taskId:String
        ): Boolean
        editTask(
            taskId: String!,
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
        taskListId:String,
        owner: String,
        task: String,
        dateDue: String,
        doneStatus: Boolean
    }
        
`