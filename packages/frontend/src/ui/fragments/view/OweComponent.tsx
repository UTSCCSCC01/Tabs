import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';

export type Props = {
    from: string; // roomate name
    amount: number;
    whoOwes: string;
};

const OweContainer: React.FC<Props> = ({
    from,
    amount,
    whoOwes,
}) => {
  return (
      <View style={[styles.roundedContainer, styles.moneyContainer]}>
        <View style={styles.pfpContainer}>
            {/* <Image source={require('')}/> */}
        </View>
        
        <Text style={styles.nameLabel}>{from}</Text>
        <Text style={styles.oweLabel}>{whoOwes}</Text>
        <Text style={styles.oweAmountLabel}>${amount}</Text>
        {/* <Button
            title="View"
        /> */}
        <Text style={styles.viewButton}>View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  roundedContainer: {
    width: '95%',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },

  // i dont know what to call these containers !! proly shouldnt be money thogh
  moneyContainer: {
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 10,
  },

  pfpContainer: {
    top: '11%',
    left: '7%',
    position: 'absolute',
    height: '40%',
    backgroundColor: '#2493A1',
    borderRadius: 15,
    aspectRatio: 1,
  },

  nameLabel: {
    position: 'absolute',
    top: '23%',
    left: '28%',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 19,
  },

  oweLabel: {
    left: '7%',
    position: 'absolute',
    top: '56%',
    fontSize: 15,
    color: 'rgb(33, 33, 33, 0.54)',
  },

  oweAmountLabel: {
    textAlign: 'center',
    position: 'absolute',
    left: '7%',
    top: '70%',
    fontSize: 28,
    fontWeight: '500',
    color: '#34ACBC',
  },

  viewButton: {
    left: '80%',
    top: '30%',
    fontSize: 16,
    color: '#007aff',
  }

});

export default OweContainer;