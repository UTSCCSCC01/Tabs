import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ActiveDebtChildComponent from './ActiveDebtChildComponent';

export type Props = {
    userId: string;
};

export let removeId = (debtId: string) => {
    console.log('No function available yet')
}

/**
 * Display the list of active debts
 * 
 * @name ActiveDebtListComponent
 * @param userId User the requests are for
 * @returns React component
 */
const ActiveDebtListComponent: React.FC<Props> = ({
    userId
}) => {
    
    // Mock data, update with backend connection in future sprint
    let activeDebtListData = [
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

    const [debtList, setDebtList] = React.useState(activeDebtListData)

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
                <ActiveDebtChildComponent 
                    debtId = {item.id} 
                    debtFrom = {item.user} 
                    amount = {item.amount} 
                    debtTo = {userId}
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

export default ActiveDebtListComponent;