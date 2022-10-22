import { gql } from 'apollo-server-express'

// for now getDebts just gets all the debts

export default gql`

    extend type Query {
        findDebts(
            debtId:String!
        ): Debt
        getDebtsTo(
            debtTo: String!
        ): [Debt!]!
        getDebtsFrom(
            debtFrom: String!
        ): [Debt!]!
        findDebtsRequested:[Debt!]!
    }

    extend type Query {
        getDebts(
            debtFrom: String!
            debtTo: String!
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
        acceptRequest(
            debtId: String
            requestAccepted: String
        ):Debt
        rejectRequest(
            debtId: String
            requestAccepted: String
        ):Debt
        modifyAmount(
            debtId: String
            amount: Float
        ):Boolean
        undoRequest(
            debtId: String
            requestAccepted: String
        ):Debt

    }
  
    type Debt {
        id: ID
        debtTo: String
        debtFrom: String
        amount: Float
        description: String
        dateCreated: String
        requestAccepted:Boolean
    }
        
`