import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getTaskList(
            taskListId: String
        ): Boolean
    }

    extend type Mutation {
        addTaskList(
            userId:String,
            dateCreated: String,
        ):Boolean
        deleteTaskList(
            taskId: String
        ):Boolean
    }
  
    type TaskList {
        houseId: String
        owner: String
        name: String
        done: String
    }
        
`