import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    addItem(
      categoryId: String!
      itemName: String!
      quantity: Int
    ): String

    deleteItem(
      categoryId: String!
      itemId: String!
    ): Boolean

    rename(
      categoryId: String!
    ): Boolean
  }
  type Category {
    inventoryId: String!
    categoryId: String!
    categoryName: String!
    items: [String!]
  }
    
`