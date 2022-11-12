import { gql } from 'apollo-server-express'
//schema

export default gql`
  extend type Query{
    findItem(
      itemId: String
    ): Item
    findItemsByCategory(
      categoryId: String
      ):[Item]
  }
  extend type Mutation {
    createItem(
      userId: String
      categoryId: String,
      name: String,
      expiration: String
    ): String
    addItem(
      userId: String
      itemId:String
    ): Boolean
    subtractItem(
      userId: String
      itemId:String
    ): Boolean
    modifyItemName(
      userId: String
      itemId: String,
      name: String
    ): Boolean 
    modifyItemCategory(
      userId: String
      itemId:String,
      categoryId:String
    ): Boolean
  }
  type Item {
    id: String,
    quantity:Int,
    expiration:Int,
    tags:[String]
    categoryId: String,
    name: String
  }
        
`