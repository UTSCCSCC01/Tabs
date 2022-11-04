import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getTaskList(
            taskListId: String
        ): TaskList
        getTaskListByUser(
            owner: String
        ): [TaskList]
    }

    extend type Mutation {
        addTaskList(
            userId:String
        ):TaskList
        deleteTaskList(
            taskId: String!
        ):Boolean
    }
  
    type TaskList {
        houseId: String,
        owner: String,
        name: String,
        dateCreated: String,
        done: String
    }
        
`