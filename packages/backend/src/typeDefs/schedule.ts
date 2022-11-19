import { gql } from 'apollo-server-express'

//owner is a userid
export default gql`
    extend type Query {
        findSchedule(
            applianceId: String
        ): [Schedule]

    }

    extend type Mutation {
        createSchedule(
            applianceId: String,
            start: String,
            end: String
        ): Schedule
        deleteSchedule(
            scheduleId: String
        ): Boolean

    }
  
    type Schedule {
        id: String,
        applianceId: String,
        start: String,
        end: String
    }
        
`