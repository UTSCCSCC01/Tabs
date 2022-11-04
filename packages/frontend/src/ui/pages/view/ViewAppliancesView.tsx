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
import ViewAppliancesPageItem from '../../fragments/view/view_appliance_page/ViewAppliancesPageItem';
import ViewAppliancesPageList from '../../fragments/view/view_appliance_page/ViewAppliancesPageList';
import ApplianceHeaderComponent from '../../fragments/view/ApplianceHeaderComponent';
  
const a = () => {

}

/**
 * Debt requests page view
 * 
 * @name DebtRequestsView
 * @returns React component
 */
const ViewAppliancesView: React.FC = () => {
  console.log('View appliances page')
    // MOCK data update this with backend connection in future sprint
    return (
      <View style={styles.container}>
        <ApplianceHeaderComponent screenName='Appliances'/>

        <ViewAppliancesPageList userId='Bob Jones'/>
        
        <FloatingActionButton 
          name="add item" 
          argument={1} 
          myFunction={a}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#85C4CF',
    height: '100%',
    width: '100%',
  },
});

export default ViewAppliancesView