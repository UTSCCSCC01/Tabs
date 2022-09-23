import { gql } from 'apollo-server-express'


export default gql`
  extend type Query {
    me: User
  }
  extend type Mutation {
    signUp(
      email: String!
      password: String!
    ): User

  }
  type User {
    email: String!
    username: String!
  }
        
`