import { gql } from 'apollo-server-express'

//owner is a userid
export default gql`
    extend type Query {
        findAppliances(houseId: String):[Appliance]
        getQueue(applianceId: String): [String]
        getAvailability(applianceId: String): Boolean

    }

    extend type Mutation {
        createAppliance(
            houseId:String,
            name:String,
            type: String
        ): Appliance
        addQueue(
            applianceId: String
            userId: String
        ): Boolean
        popQueue(
            applianceId: String
        ): Boolean
        updateApplianceName(
            applianceId: String
            name: String
        ): Boolean
        deleteAppliance(
            applianceId: String
        ): Boolean
        toggleAvailability(
            applianceId: String
        ): Boolean

    }
  
    type Appliance {
        id: String,
        name: String,
        type: String,
        queue:[String],
        scheduled: [String],
        availability: Boolean,
        houseId:String
    }
        
`