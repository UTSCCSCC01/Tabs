import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { setUserToShow } from '../../../pages/view/IndividualProfilePageView';

export type Props = {
    user: string;
    setUser: any;
    name: string; // roomate name
    isBusy: boolean; // busy/notbusy
    silentHours: string; // phone number
    navigation: any;
};

const RoommateContainerComponent: React.FC<Props> = ({
    user,
    setUser,
    name,
    isBusy,
    silentHours,
    navigation
}) => {

    const setUserFunc = () => {
        var loggedInUserId = '7';
        var isLocal = (loggedInUserId === user);
        setUserToShow(user, isLocal);
    }

    return (
        <Pressable onPress={() => {setUserFunc(); navigation.navigate('User Profile')}} style={({ pressed }) => ({
            paddingBottom: '3%',
            width: '100%',
            shadowColor: 'grey',
            opacity: pressed ? 0.5 : 1
        })}>
            <View style={[styles.roundedContainer, styles.roommateContainer]}>
                <View style={styles.pfpContainer}>
                    <SvgUri 
                    uri={"https://cdn.discordapp.com/attachments/939188901585752104/1043011528133189742/User.svg"}
                    style ={{
                        width: '20%',
                        height: '20%',
                        top: '10%',
                        left: '4%'
                    }}
                    >
                    </SvgUri>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.nameLabel}>{name}</Text>
                    {isBusy && <Text style={styles.busyLabel}>is currently busy...</Text>}
                    <Text style={styles.silentHoursLabel}>DND: {silentHours}</Text>
                </View>
            
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  roundedContainer: {
    width: '95%',
    borderRadius: 20,
    alignContent: 'center',
  },

  // i dont know what to call these containers !! proly shouldnt be money thogh
  roommateContainer: {
    padding: '4%',
    paddingTop: '6%',
    height: 0.15 * Dimensions.get('window').height,
    width: 0.9 * Dimensions.get('window').width,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'center',
  },

  pfpContainer: {
    // top: '11%',
    // left: '7%',
    // position: 'absolute',
    width: 0.18 * Dimensions.get('window').width,
    backgroundColor: '#2493A1',
    borderRadius: 15,
    aspectRatio: 1,
  },

  silentHoursLabel: {
    marginTop: '2%',
    // position: 'absolute',
    // top: '23%',
    // left: '28%',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 19,
  },

  busyLabel: {
    // left: '7%',
    // position: 'absolute',
    // top: '56%',
    fontSize: 19,
    color: 'rgb(33, 33, 33, 0.34)',
  },

  nameLabel: {
    textAlign: 'left',
    // position: 'absolute',
    // left: '7%',
    // top: '70%',
    fontSize: 22,
    fontWeight: '500',
    color: '#34ACBC',
  },

  viewButton: {
    fontSize: 16,
    color: 'gray',
  },

  infoContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '5%',
  },

  viewText: {
    // position: 'absolute',
  }
});

export default RoommateContainerComponent;