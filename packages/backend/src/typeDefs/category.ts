import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    findCatsByInvId(
      inventoryId: String
    ): [String]
  }

  extend type Mutation {
    addCat(
      inventoryId: String
      categoryName: String
      categoryDesc: String
    ): String

    changeCatName(
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