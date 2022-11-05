import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
        getBill(
            houseId: String!
            userId: String!
        ): Bill!
        getBills(
            houseId: String!
        ): [Bill!]!
    }

    extend type Mutation {
        addBill(
            houseId: String
            userId: String
            name: String
            amount: Float
            split: [String]
            dateCreated: String
            dateDue: String
            status: String
        ):Bill

        modifyBillAmount(
            houseId: String
            userId: String
            amount: Float
        ):Boolean
    }
  
    type Bill {
        billId: String!
        houseId: String!
        userId: String!
        name: String!
        amount: Float!
        split: [String!]
        dateCreated: String!
        dateDue: String!
        status: String
    }
        
`