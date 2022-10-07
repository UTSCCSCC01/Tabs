import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    findCatByInvId(
      inventoryId: String
    ): [String]
  }

  extend type Mutation {
    renameCat(
      categoryId: String
      categoryName: String
    ): Boolean

    changeCatDesc(
      categoryId: String
      categoryDesc: String
    ): Boolean
  }

  type Category {
    inventoryId: String
    categoryId: String
    categoryName: String
    categoryDesc: String
  }

`