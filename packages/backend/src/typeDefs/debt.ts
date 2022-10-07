import { gql } from 'apollo-server-express'

// for now getDebts just gets all the debts

export default gql`
    extend type Query {
        getDebtsTo(
            debtTo: String!
        ): [Debt!]!
    }

    extend type Query {
        getDebtsFrom(
            debtFrom: String!
        ): [Debt!]!
    }

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