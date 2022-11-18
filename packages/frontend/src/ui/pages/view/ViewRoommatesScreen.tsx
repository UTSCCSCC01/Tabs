import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';
import { FloatingActionButton } from '../../fragments/view/common/FloatingActionButton';
import RoommateListComponent from '../../fragments/view/roommate/RoommateListComponent';


/**
* @name ViewRoommates
* @returns React component of list of monthly rents for each roommate
*/
const ViewRoommatesScreen: React.FC = () => {

    return (
        <View style={styles.container}>
            <HeaderComponent screenName={'Housemembers'} ></HeaderComponent>
            <SafeAreaView style={styles.scrollContainer}>
                <RoommateListComponent houseId='777'/>
            </SafeAreaView>
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
    height: '100%',
  }
});

export default ViewRoommatesScreen;