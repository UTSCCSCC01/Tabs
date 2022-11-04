import { gql } from 'apollo-server-express'

//owner is a userid
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
            owner:String
<<<<<<< HEAD
=======
            name: String
            houseId:String
            dateCreated:String
>>>>>>> 4a24a7a1cd5de27dcc3b53c1d5266032b113ba71
        ):TaskList
        deleteTaskList(
            taskId: String!
        ):Boolean
    }
  
    type TaskList {
        id: ID,
        houseId: String,
        owner: String,
        name: String,
        dateCreated: String,
        done: String
    }
        
`