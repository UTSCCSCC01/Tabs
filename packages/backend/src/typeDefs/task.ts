import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getTask(
            taskId: String!
        ): Task
        getAllTasks(
            taskListId: String!
        ): [Task]

    }

    extend type Mutation {
        addTask(
            taskListId: String!,
            author: String,
            task: String,
            dateDue: String,
            houseId: String
        ):Task  
        deleteTask(
            taskId:String
        ):Boolean
        editTask(
            taskId: String!,
            task: String,
            dateDue: String
        ): Boolean
        toggleDoneTask(
            taskId: String
        ):Boolean

    }
  
    type Task {
        houseId: String,
        taskListId:String,
        author: String,
        task: String,
        dateDue: String,
        doneTask: Boolean
    }
        
`