import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';
import OweContainer from '../../fragments/view/debt/OweComponent';
import UpcomingRentComponent from '../../fragments/view/rent/UpcomingRentComponent';
import DebtListComponent from '../../fragments/view/debt/DebtListComponent';
import { FloatingActionButton } from '../../fragments/view/common/FloatingActionButton';
import RentListComponent from '../../fragments/view/rent/RentListComponent';
import AddRentPopUpComponent from '../../fragments/view/rent/AddRentPopUpComponent';
import UpdateRentPopUpComponent from '../../fragments/view/rent/UpdateRentPopUpComponent';
import DebtRequestListComponent from '../../fragments/view/debt/DebtRequestListComponent';

import ViewAppliancesPageItem from '../../fragments/view/appliances/ViewAppliancesPageItem';
import ViewAppliancesPageList from '../../fragments/view/appliances/ViewAppliancesPageList';
import ApplianceHeaderComponent from '../../fragments/view/appliances/ApplianceHeaderComponent';
import DebtPopup from './debtPopup';
import AddAppliancePopup from './addAppliancePopup';
import { isAdmin } from '../../../controllers/Admin';

  
const a = () => {


}

/**
 * Debt requests page view
 * 
 * @name DebtRequestsView
 * @returns React component
 */
const ViewAppliancesView: React.FC = () => {
  let [showAddPopup, editAddPopup] = React.useState(false)
  let userId = 'Bob Jones'

  if (isAdmin(userId)) {
    return (

      <View style={styles.container}>
        <ApplianceHeaderComponent screenName='Appliances'/>
        <ViewAppliancesPageList userId={userId}/>
        
        <FloatingActionButton 
          name="add item" 
          argument={1} 
          myFunction={() => {
            editAddPopup(!showAddPopup)
          }}
        />
        
        <AddAppliancePopup show={showAddPopup} closePopup={() => {
          editAddPopup(false)
        }}/>
      </View>
    );
    } else {
      return (
        <View style={styles.container}>
        <ApplianceHeaderComponent screenName='Appliances'/>

        <ViewAppliancesPageList userId={userId}/>

      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#85C4CF',
    height: '100%',
    width: '100%',
  },

  scrollContainer: {
    height: '50%',
  }

});



export default ViewAppliancesView