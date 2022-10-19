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
    ): Boolean
    subtractItem(
      itemId:String
    ): Boolean
    modifyItemName(
      itemId: String,
      name: String
    ): Boolean 
    modifyItemCategory(
      itemId:String,
      categoryId:String
    ): Boolean
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