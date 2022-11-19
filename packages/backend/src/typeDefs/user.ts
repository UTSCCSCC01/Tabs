import { gql } from 'apollo-server-express'


export default gql`
  extend type Query {
    me: User
  }
  
  extend type Mutation {
    signUp(
      email: String!
      username: String!
      password: String!
      phone: String!
    ): User

    signIn(
      username: String!
      password: String!
    ): User
    
    signOut: Boolean
  }
  
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    phone: String!
  }
        
`