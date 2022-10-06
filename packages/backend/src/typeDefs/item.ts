import { gql } from 'apollo-server-express'


export default gql`

  extend type Mutation {
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