import { gql } from 'apollo-server-express'


export default gql`
  extend type Query{
    findItem(
      itemId: String
    ): String
    findItemsByCategory(
      categoryId: String
      ):[String]
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
    name: String
  }
        
`