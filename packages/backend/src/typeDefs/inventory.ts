import { gql } from 'apollo-server-express'


export default gql`

  extend type Mutation {
    createInventory(houseId: String): String!
    addCategory(
      categoryId: String
    ):String!
    deleteCategory(
      categoryId:String
    ):Boolean
  }
  type Inventory {
    inventoryId: String!
    categories: [String!]
    houseId: String!
  }
        
`