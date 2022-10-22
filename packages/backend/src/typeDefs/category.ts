import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    findCatsByInvId(
      inventoryId: String
    ): [Category]
    
    hasPermission(
      userId: String
      categoryId: String
    ): Boolean
  }

  extend type Mutation {
    addCat(
      userId: String
      inventoryId: String
      categoryName: String
      categoryDesc: String
      isRestricted: Boolean
    ): String

    toggleRestriction(
      userId: String
      categoryId: String
    ): Boolean

    addAdmin(
      userId: String
      categoryId: String
      targetUser: String
    ): Boolean

    removeAdmin(
      userId: String
      categoryId: String
      targetUser: String
    ): Boolean

    changeCatName(
      userId: String
      categoryId: String
      categoryName: String
    ): Boolean

    changeCatDesc(
      userId: String
      categoryId: String
      categoryDesc: String
    ): Boolean
  }

  type Category {
    id: ID
    inventoryId: String
    categoryId: String
    categoryName: String
    categoryDesc: String
    isRestricted: Boolean
    owner: String
    admins: [String]
  }

`