import { gql } from 'apollo-server-express'


export default gql`
  extend type Query {
    findInventory(inventoryId:String):String

  }

  extend type Mutation {
    createInventory(houseId: String): String
  }
  type Inventory {
    houseId: String!
  }
        
`