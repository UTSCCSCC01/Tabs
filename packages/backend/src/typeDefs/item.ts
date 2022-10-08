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
      categoryId: String,
      name: String,
      expiration: String
    ): String
    addItem(
      itemId:String
    ): String
    subtractItem(
      itemId:String
    ): String
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
    id: String,
    quantity:Int,
    expiration:String,
    tags:[String]
    categoryId: String,
    name: String
  }
        
`