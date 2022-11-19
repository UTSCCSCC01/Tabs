import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text, FlatList, RefreshControl, Dimensions } from 'react-native';
import RoommateContainerComponent from './RoommateContainerComponent';

export type Props = {
    houseId: string;
    navigation: any;
};

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GET_HOUSEMEMBERS =
gql`
query GetHouseMembers($houseId: String!) {
    getHouseMembers(houseId: $houseId) {
      name, isBusy, silentHours
    }
}`

/**
* @name RoommateListComponent
* @param houseId id of current house
* @returns React component with a list of rents for each roommate
* @see ViewRoommateScreen.tsx where RoommateListComponent is used
*/
const RoommateListComponent: React.FC<Props> = ({
    houseId,
    navigation,
}) => {
    const { loading, data, refetch, error } = useQuery(GET_HOUSEMEMBERS, {
        variables: { houseId: houseId},
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

    return data.getHouseMembers.map((element: { name: string, isBusy: Boolean, silentHours: String}) => {

        const DATA = data.getHouseMembers;

        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <RoommateContainerComponent name={item.name} isBusy={item.isBusy} silentHours={item.silentHours} navigation={navigation}/> }
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
        marginTop: 0.03 * Dimensions.get('window').height,
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: '100%',
      },
});

export default RoommateListComponent;