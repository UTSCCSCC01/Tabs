import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl } from 'react-native';
import DebtContainerComponent from './DebtContainerComponent';
import RentContainerComponent from './RentContainerComponent';

export type Props = {
    userId: string;
};

export let removeId = (debtId: string) => {
    console.log('No function available yet')
}

/**
 * Display the list of debt requests
 * 
 * @name DebtRequestListComponent
 * @param userId User the requests are for
 * @returns React component
 */
const DebtRequestListComponent: React.FC<Props> = ({
    userId
}) => {
    
    // Mock data, update with backend connection in future sprint
    let debtRequestListData = [
        {
            id: '1',
            user: 'Bob Jones',
            amount: 700,
        },
        {
            id: '2',
            user: 'John Smith',
            amount: 500,
        },
        {
            id: '3',
            user: 'Seven Abou',
            amount: 2130,
        },
        {
            id: '4',
            user: 'Dre Assi',
            amount: 600,
        },
        {
            id: '5',
            user: 'Bing Bong',
            amount: 777,
        },
    ];

    const [debtList, setDebtList] = React.useState(debtRequestListData)

    removeId = (debtId: string) => {
        let filteredList = debtList.filter(
            it => it.id != debtId
        )

        setDebtList(filteredList)
    }

    return (
        <FlatList style={styles.listContainer}
            contentContainerStyle = {{ paddingBottom: 20 }}
            data = {debtList as readonly any[] | null | undefined}
            renderItem = {({item}) => 
                <DebtContainerComponent 
                    debtId = {item.id} 
                    debtFrom = {item.user} 
                    amount = {item.amount} 
                /> 
            }
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

export default DebtRequestListComponent;