import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';

export type Props = {
    name: string; // roomate name
    isBusy: boolean; // busy/notbusy
    silentHours: string; // phone number
};

const RoommateContainerComponent: React.FC<Props> = ({
    name,
    isBusy,
    silentHours
}) => {

  return (
     <Pressable style={({ pressed }) => ({
        paddingBottom: '3%',
          width: '100%',
          shadowColor: 'grey',
          opacity: pressed ? 0.5 : 1
      })}>
        <View style={[styles.roundedContainer, styles.roommateContainer]}>
            <View style={styles.pfpContainer}>
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
    width: 0.21 * Dimensions.get('window').width,
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
    fontSize: 25,
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