import { gql } from 'apollo-server-express'


export default gql`
    extend type Mutation {
        addDebt(
            debtTo: String
            debtFrom: String
            amount: String
        ):Debt

        modifyAmount(
            debtId: String
            amount: String
        ):Boolean

    }
  
    type Debt {
        debtId: String!
        debtTo: String!
        debtFrom: String!
        amount: String!
    }
        
`