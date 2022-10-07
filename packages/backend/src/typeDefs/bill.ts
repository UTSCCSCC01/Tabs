import { gql } from 'apollo-server-express'


export default gql`
    extend type Mutation {
        addBill(
            houseId: String
            name: String
            amount: Float
            split: [String]
            dateCreated: String
            status: String
        ):Bill

        modifyAmount(
            billId: String
            amount: Float
        ):Boolean
    }
  
    type Bill {
        billId: String!
        houseId: String!
        name: String!
        amount: Float!
        split: [String!]
        dateCreated: String!
        status: String
    }
        
`