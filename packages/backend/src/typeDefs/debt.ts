import { gql } from 'apollo-server-express'


export default gql`
    extend type Mutation {
        addDebt(
            debtTo: String
            debtFrom: String
            amount: Float
            description: String
            dateCreated: String
        ):Debt

        modifyAmount(
            debtId: String
            amount: Float
        ):Boolean

    }
  
    type Debt {
        debtId: String!
        debtTo: String!
        debtFrom: String!
        amount: Float!
        description: String!
        dateCreated: String!
    }
        
`