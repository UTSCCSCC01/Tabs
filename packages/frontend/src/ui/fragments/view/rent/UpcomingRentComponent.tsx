import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type Props = {
    houseId: string;
    userId: string;
};

const GET_BILL =
gql`
query GetBill($houseId: String!, $userId: String!) {
    getBill(houseId: $houseId, userId: $userId) {
      amount, dateDue
    }
}`

/**
* @name UpcomingRentComponent
* @param houseId takes in house id of current user logged in
* @param userId takes in user id of current user logged in
* @returns React component with the upcoming monthly rent for the user and its duedate
* @see RentScreen.tsx where UpcomingRentComponent is used
*/
const UpcomingRentComponent: React.FC<Props> = ({
    houseId,
    userId
}) => {

    const { loading, data, refetch, error } = useQuery(GET_BILL, {
        // houseId variable here
        fetchPolicy: 'network-only',
        variables: { houseId: houseId, userId: userId},
    });

    if (loading)
      return <Text>Loading ...</Text>;
    if (error)
      return <Text>Error</Text>;

    return (
        <View style={styles.rentContainer}>
            <View style={[styles.upcomingRentContainer, styles.roundedContainer]}>
                <Text style={styles.upcomingLabel}>Upcoming Rent</Text>
                <Text style={styles.amountLabel}>${data.getBill["amount"]}</Text>
            </View>
            <View style={styles.rentDueContainer}>
                <Text style={styles.dueLabel}>{data.getBill["dateDue"]}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rentContainer: {
        top: '5%',
        height: '30%',
        left: '2%',
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
      },
    
      roundedContainer: {
        width: '95%',
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
      },
    
      upcomingRentContainer: {
        bottom: '25%',
        height: '60%',
        backgroundColor: '#34ACBC',
      },
    
      rentDueContainer: {
        position: 'absolute',
        left: '10%',
        bottom: '33%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: '24%',
        width: '75%',
        borderRadius: 30,
        justifyContent: 'center',
        alignContent: 'center',
      },
      
      upcomingLabel : {
        fontSize: 15,
        color: 'white',
        marginLeft: '10%',
      },
    
      amountLabel: {
        fontSize: 30,
        marginTop: '3%',
        marginLeft: '10%',
        paddingBottom: '3%',
        textAlign: 'left',
        color: 'white',
      },
    
      dueLabel: {
        fontSize: 16,
        paddingLeft: '10%',
        textAlign: 'left',
        fontWeight: '500',
        color: '#8B3B3B',
      }
});

export default UpcomingRentComponent;