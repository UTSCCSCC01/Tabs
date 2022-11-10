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
            isBusy: Boolean
            phoneNumber: String
            emailAddress: String
            silentHours: String
            additionalInfo: String
        ): HouseMember
        updateHouseMemberAdmin(
            userId: String!
            isAdmin: Boolean!
        ):Boolean!
        updateHouseMemberOwner(
            userId: String!
            isOwner: Boolean!
        ):Boolean!
        updateHouseMemberBusy(
            userId: String!
            isBusy: Boolean!
        ):Boolean!
        updateHouseMemberPhone(
            userId: String!
            phoneNumber: String!
        ):Boolean!
        updateHouseMemberEmail(
            userId: String!
            emailAddress: String!
        ):Boolean!
        updateHouseMemberSilentHours(
            userId: String!
            silentHours: String!
        ):Boolean!
        updateHouseMemberAdditionalInfo(
            userId: String!
            additionalInfo: String!
        ):Boolean!
    }
  
    type HouseMember {
        userId: String!
        houseId: String!
        isAdmin: Boolean!
        isOwner: Boolean!
        isBusy: Boolean!
        phoneNumber: String!
        emailAddress: String!
        silentHours: String!
        additionalInfo: String!
    }
`