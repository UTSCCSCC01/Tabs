import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import OweContainer from '../../fragments/view/OweComponent';
import UpcomingRentComponent from '../../fragments/view/UpcomingRentComponent';
import DebtListComponent from '../../fragments/view/DebtListComponent';
import { FloatingActionButton } from '../../fragments/view/FloatingActionButton';
import RentListComponent from '../../fragments/view/RentListComponent';
import AddRentPopUpComponent from '../../fragments/view/AddRentPopUpComponent';
import UpdateRentPopUpComponent from '../../fragments/view/UpdateRentPopUpComponent';
import DebtRequestListComponent from '../../fragments/view/DebtRequestListComponent';
  
const handleRequestDebt = () => {

}

/**
 * Debt requests page view
 * 
 * @name DebtRequestsView
 * @returns React component
 */
const DebtRequestsView: React.FC = () => {
    const [isAddingRent, setIsAddingRent] = React.useState(false);
    const [isUpdatingRent, setIsUpdatingRent] = React.useState(false);
    
    const handleAddRent = () =>
        setIsAddingRent(!isAddingRent);
        
    // MOCK data update this with backend connection in future sprint
    return (
        <View style={styles.container}>
        <HeaderComponent screenName='Debt Requests'/>

        <View style={styles.scrollContainer}>
            <DebtRequestListComponent userId='Bob Jones'/>
        </View>
        
        <FloatingActionButton 
        name="add item" 
        argument={1} 
        myFunction={handleRequestDebt}/>

        
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

export default DebtRequestsView