import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getHouse(
            houseId: String!
        ): House
        getHouseByOwner(
            owner: String
        ):[House]

    }

    extend type Mutation {
        addHouse(
            owner: String!
            name: String
            address: String
            dateCreated: String
        ):House

        deleteHouse(
            owner: String
            houseId: String
        ):Boolean

        modifyHouseName(
            houseId:String
            owner: String
            name: String
        ):House

        modifyHouseOwner(
            houseId:String
            owner: String
            newOwner:String
        ):House

        modifyHouseAddress(
            houseId:String
            owner: String
            address: String
        ):House
    }
  
    type House {
        id: ID,
        owner: String, #user Id
        name: String,
        address: String,
        dateCreated:String
    }
        
`