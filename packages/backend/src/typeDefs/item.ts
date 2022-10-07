import { gql } from 'apollo-server-express'


export default gql`
  extend type Query{
    findItem(
      itemId: String
    ): [Item]
    findItemsByCategory(
      categoryId: String
      ):[Item]
  }

  extend type Mutation {
    createItem(
      categoryId: String
    ),
    modifyItemName(
      itemId: String,
      name: String
    ): String 
    modifyItemCategory(
      itemId:String,
      categoryId:String
    ): String
  }
  type Item {
    categoryId: String
    itemId: String!
    name: String
  }
        
`