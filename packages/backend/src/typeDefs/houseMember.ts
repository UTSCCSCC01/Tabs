import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getHouseMembers(
            houseId: String!
        ): [HouseMember!]!
        getHouseMember(
            userId: String!
        ): HouseMember!
    }

    extend type Mutation {
        addHouseMember(
            userId: String
            houseId: String
            isAdmin: Boolean
            isOwner: Boolean
        ): HouseMember
        updateHouseMemberAdmin(
            userId: String!
            isAdmin: Boolean!
        ):Boolean!
        updateHouseMemberOwner(
            userId: String!
            isOwner: Boolean!
        ):Boolean!
    }
  
    type HouseMember {
        userId: String!
        houseId: String!
        isAdmin: Boolean!
        isOwner: Boolean!
    }
`