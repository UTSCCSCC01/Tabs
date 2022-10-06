import { gql } from 'apollo-server-express'


export default gql`

  extend type Mutation {
    createInventory(houseId: String): String!
    addItem(
      itemId: String,
      userId: String
    ): void
    removeItem(
        itemId: String
    ): String!
    modifyItem(
      itemId:String
    ): String!
    addCategory(
      categoryId: String
    ):String!
    deleteCategory(
      categoryId:String
    ):boolean
  }
  type Inventory {
    inventoryId: String!
    categories: [String!]
    houseId: String!
  }
        
`