import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text, FlatList, RefreshControl } from 'react-native';
import OweContainer from './OweComponent';

export type Props = {
    userId: string;
};

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GET_DEBTS =
gql`
query GetDebts($debtFrom: String!, $debtTo: String!) {
    getDebts(debtFrom: $debtFrom, debtTo: $debtTo) {
      debtTo, debtTo, debtFrom, amount
    }
}`

/**
* @name DebtListComponent
* @param userId takes in id of current user logged in
* @returns React component with a list of debts owed by and to the current user
* @see RentScreen.tsx where DebtListComponent is used with example userId
*/
const DebtListComponent: React.FC<Props> = ({
    userId
}) => {
    const { loading, data, refetch, error } = useQuery(GET_DEBTS, {
        variables: { debtTo: userId, debtFrom: userId},
    });

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    if (loading)
        return <Text>Loading ...</Text>;
    if (error)
        return <Text>{error.message}</Text>;

    return data.getDebts.map((element: { debtTo: string, debtFrom: string, amount: number}) => {

        const findNameDisplay = (debtTo: string, debtFrom: string) => {
            if (debtTo == userId)
                return debtFrom
            return debtTo;
        }

        const findWhoOwes = (debtTo: string) => {
            if (debtTo == userId)
                return 'Owes You'
            return 'You Owe'
        }

        const DATA = data.getDebts;

        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <OweContainer from={findNameDisplay(item.debtTo, item.debtFrom)} amount={item.amount} whoOwes={findWhoOwes(item.debtTo)}/> }
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
        position: 'absolute',
        height: '120%',
        width: '100%',
    },
});

export default DebtListComponent;