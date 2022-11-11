import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import DebtContainerComponent, { FIND_REQ_DEBTS } from './DebtContainerComponent';

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
    const [debtList, setDebtList] = React.useState(["empty"] as any[])
    
    // Mock data, update with backend connection in future sprint
    const {loading, error, data} = useQuery(FIND_REQ_DEBTS)

    if (loading) 
        return <Text>Loading</Text>
    else if (error) 
        return <Text>Error</Text>

    console.log(JSON.stringify(data))

    if (debtList.length != data.findDebtsRequested.length)
        setDebtList(data.findDebtsRequested)

    removeId = (debtId: string) => {
        let filteredList = debtList.filter(
            (           it: { id: string; })=> it.id != debtId
        )
        setDebtList(filteredList)
    }

    return (
        <FlatList style={styles.listContainer}
            contentContainerStyle = {{ paddingBottom: 20 }}
            data = {debtList}
            renderItem = {({item}) => 
                (<DebtContainerComponent 
                    debtId = {item.id} 
                    debtFrom = {item.debtFrom} 
                    amount = {item.amount} 
                /> )
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
    }
});

export default DebtRequestListComponent;