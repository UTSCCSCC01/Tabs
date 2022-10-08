import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import ApolloClient from 'apollo-client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import OweContainer from '../../fragments/view/OweComponent';
import UpcomingRentComponent from '../../fragments/view/UpcomingRentComponent';

const GET_DEBTS_FROM =
gql`
query GetDebtsFrom($debtFrom: String!) {
    getDebtsFrom(debtFrom: $debtFrom) {
      debtId, debtTo, debtFrom, amount
    }
}`

const GET_BILL =
gql`
query GetBill($houseId: String!) {
    getBill(houseId: $houseId) {
      amount
    }
}`

function debtFunc() {
    const { loading, error, data } = useQuery(GET_DEBTS_FROM, {
      variables: { debtFrom: 'Seven Abou' },
    });
    if (loading) return <Text>Loading ...</Text>;
    let debt: any = {
        type: '',
        debtId: '',
        debtTo: '',
        debtFrom: '',
        amount: 0,
        id: 0
      };
      
    let debtList: typeof debt[] = []
    let index: number = 0;

    for (let i = 0; i < data.getDebtsFrom.length; i++) {

        debt = {
            type: '',
            debtId: '',
            debtTo: '',
            debtFrom: '',
            amount: 0,
        };

        let j = 0;

        Object.keys(debt).forEach(key => {
        debt[key] = Object.values(data.getDebtsFrom[i])[j];
        j++;
        });
        
        debtList[index] = debt;
        index++;
    }
        // console.log(debtList);
        return debtList;
}
  
// export function BillFunc() {
//     const { fetchMore, loading, data } = useQuery(GET_BILL, {
//         // variables: { houseId: '123' },
//     });
// }

const RentScreen: React.FC = () => {
    
    const DATA = debtFunc();

    // currently need to refresh app to see changes
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Rent & Finance'/>
            <UpcomingRentComponent amount={360} dateDue={'Wednesday, Oct. 12'}/>

            <SafeAreaView style={styles.scrollContainer}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <OweContainer from={item.debtTo} amount={item.amount} whoOwes={"You owe"}/> }
                    // keyExtractor={item => item.id}
                />
            </SafeAreaView>

            {/* <Button
                title='Refresh'
                onPress={refreshFeed}
            /> */}

        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DCF6FB',
    height: '100%',
    width: '100%',
  },

  scrollContainer: {
    height: '50%',
  }
});

export default RentScreen;