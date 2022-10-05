import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import OweContainer from '../../fragments/view/OweComponent';

const RentScreen: React.FC = () => {

    const renderItem = () => (
        <OweContainer/>
    );

    const DATA = [
        {
          id: 'a'
        },
        {
          id: 'b',
        },
        {
          id: 'c',
        },
      ];

    return (
        <View style={styles.container}>
            <HeaderComponent/>
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
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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