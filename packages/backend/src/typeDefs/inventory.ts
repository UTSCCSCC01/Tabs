import { gql } from 'apollo-server-express'


export default gql`

  extend type Mutation {
    createInventory(houseId: String): String!
    addCategory(
      inventoryId: String
      name: String
    ):String!
    deleteCategory(
      inventoryId:String
      categoryId:String
    ):Boolean
  }
  type Inventory {
    inventoryId: String!
    categories: [String!]
    houseId: String!
  }
        
`