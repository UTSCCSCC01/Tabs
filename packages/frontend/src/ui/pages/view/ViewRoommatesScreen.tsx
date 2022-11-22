import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';
import { FloatingActionButton } from '../../fragments/view/common/FloatingActionButton';
import RoommateListComponent from '../../fragments/view/roommate/RoommateListComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DebtRequestsView from './DebtRequestsView';
import DebtScreenView from './DebtScreenView';
import FullInvView from './inventoryView';
import RentScreen from './RentScreen';
import ViewAppliancesView from './ViewAppliancesView';
import FullViewTasksAdminPage from './ViewTasksAdminPage';
import FullViewTasksPage from './ViewTasksPage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IndividualProfilePageView from './IndividualProfilePageView';


/**
* @name ViewRoommates
* @returns React component of list of monthly rents for each roommate
*/

const ViewRoommatesScreen = ( {navigation}:{navigation:any} ) => {

    return (
        <View style={styles.container}>
            <HeaderComponent screenName={'Housemembers'} ></HeaderComponent>
            <SafeAreaView style={styles.scrollContainer}>
                <RoommateListComponent houseId='777' navigation={navigation}/>
            </SafeAreaView>
        </View>
  );
};

const Stack = createNativeStackNavigator();

// TODO: Change FullInvView to the profile page when it's done
const ViewAllProfiles = () => {
    return (
            <Stack.Navigator initialRouteName='MainView' screenOptions={{headerShown: false}}>
                <Stack.Screen name = 'MainView' component = {ViewRoommatesScreen}/>
                <Stack.Screen name = 'ProfilePage' component = {IndividualProfilePageView} />
            </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DCF6FB',
    height: '100%',
    width: '100%',
  },

  scrollContainer: {
    height: '100%',
  }
});

export default ViewAllProfiles;