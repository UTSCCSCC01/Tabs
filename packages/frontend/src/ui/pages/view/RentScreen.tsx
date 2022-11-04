import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import OweContainer from '../../fragments/view/OweComponent';
import UpcomingRentComponent from '../../fragments/view/UpcomingRentComponent';
import DebtListComponent from '../../fragments/view/DebtListComponent';
import { FloatingActionButton } from '../../fragments/view/FloatingActionButton';
  
// export type Props = {
//     houseId: string;
//     userId: string;
// };

const switchView = () => {
    console.log('pressed add debt, popup');
}

/**
* @name RentScreen
* @returns React component of list of debts related to current user and ther upcoming monthly rent and due date
*/
const RentScreen: React.FC = (
) => {
    // for testing purposes, enter houseId, userId here (ex '777', 'Seven Abou') c:
    // we can also just pass in the properties when using rentscreen
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Rent & Finance'/>
            <UpcomingRentComponent houseId='777' userId='Roommate No.1'/>

            <SafeAreaView style={styles.scrollContainer}>
                <DebtListComponent userId='Bob Jones'/>
            </SafeAreaView>
            
            <FloatingActionButton 
            name="add item" 
            argument={1} 
            myFunction={switchView}/>

            
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