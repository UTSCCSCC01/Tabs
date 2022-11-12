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
    findAllExpiredItems(
      categoryId: String
    ):[Item]
    findNumberItems(
      categoryId: String
    ):Int
    findNumberExpiredFunc(
      categoryId:String
    ):Int
    findSoonExpiredItems(
      categoryId:String
      time: Int
    ):[Item]
  }
  extend type Mutation {
    createItem(
      userId: String
      categoryId: String,
      name: String,
      expiration: Int
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