import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import ApolloClient from 'apollo-client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import OweContainer from '../../fragments/view/OweComponent';

const GET_DEBTS_FROM =
gql`
query GetDebtsFrom($debtFrom: String!) {
    getDebtsFrom(debtFrom: $debtFrom) {
      debtId, debtTo, debtFrom, amount
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
        console.log(debtList);
        return debtList;
}
  
const RentScreen: React.FC = () => {

    const DATA = debtFunc();

    // currently need to refresh app to see changes
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Rent & Finance'/>
            <View style={styles.rentContainer}>
                <View style={[styles.upcomingRentContainer, styles.roundedContainer]}>
                    <Text style={styles.upcomingLabel}>Upcoming Rent</Text>
                    <Text style={styles.amountLabel}>$380.00</Text>
                </View>
                <View style={styles.rentDueContainer}>
                    <Text style={styles.dueLabel}>Due Monday, Oct. 3</Text>
                </View>
            </View>

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
  },

  scrollContainer: {
    height: '50%',
  }
});

export default RentScreen;