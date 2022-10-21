import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl } from 'react-native';
import RentContainerComponent from './RentContainerComponent';

export type Props = {
    userId: string;
    isUpdatingRent: boolean,
    setIsUpdatingRent: any,
};

const RentListComponent: React.FC<Props> = ({
    userId,
    isUpdatingRent,
    setIsUpdatingRent
}) => {
    // Mock data, update with backend connection in future sprint
        const DATA = [
            {
                id: 1,
                user: 'Bob Jones',
                amount: 700,
            },
            {
                id: 2,
                user: 'John Smith',
                amount: 500,
            },
            {
                id: 3,
                user: 'Seven Abou',
                amount: 2130,
            },
            {
                id: 4,
                user: 'Dre Assi',
                amount: 600,
            },
            {
                id: 5,
                user: 'Bing Bong',
                amount: 777,
            },
        ];
        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <RentContainerComponent user={item.user} amount={item.amount} isUpdatingRent={isUpdatingRent} setIsUpdatingRent={setIsUpdatingRent}/> }
            />
        );
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