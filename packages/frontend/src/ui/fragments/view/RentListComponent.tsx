import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl } from 'react-native';
import RentContainerComponent from './RentContainerComponent';

export type Props = {
    houseId: string;
    updatingUser: string,
    setUpdatingUser: any,
    isUpdatingRent: boolean,
    setIsUpdatingRent: any,
};

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GET_BILLS =
gql`
query GetBills($houseId: String!) {
    getBills(houseId: $houseId) {
      userId, amount, status
    }
}`

/**
 * billId: String!
        houseId: String!
        userId: String!
        name: String!
        amount: Float!
        split: [String!]
        dateCreated: String!
        dateDue: String!
        status: String
 */

/**
* @name RentListComponent
* @param houseId id of current house
* @param isUpdatingRent a boolean for whether or not rent is being updated
* @param setIsUpdatingRent a function to set isUpdatingRent to true/false
* @returns React component with a list of rents for each roommate
* @see RentAdminScreen.tsx where RentListComponent is used
*/
const RentListComponent: React.FC<Props> = ({
    houseId,
    updatingUser,
    setUpdatingUser,
    isUpdatingRent,
    setIsUpdatingRent
}) => {
    const { loading, data, refetch, error } = useQuery(GET_BILLS, {
        variables: { houseId: houseId},
    });

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch();
        wait(1000).then(() => setRefreshing(false));
      }, []);

    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>{error.message}</Text>;

    return data.getBills.map((element: { userId: string, amount: number}) => {

        const DATA = data.getBills;

        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <RentContainerComponent user={item.userId} amount={item.amount} updatingUser={updatingUser} setUpdatingUser={setUpdatingUser} isUpdatingRent={isUpdatingRent} setIsUpdatingRent={setIsUpdatingRent}/> }
                    refreshControl={<RefreshControl
                        colors={["#2493A1", "#2493A1"]}
                        refreshing={refreshing}
                        onRefresh={onRefresh} />}
            />
        );
    })[0];

}
    

const styles = StyleSheet.create({
    listContainer: {
        marginTop: '10%',
        position: 'absolute',
        height: '165%',
        width: '100%',
      },
});

export default RentListComponent;