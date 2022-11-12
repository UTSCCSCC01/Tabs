import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type Props = {
    screenName: string;
  };

const HeaderComponent: React.FC<Props> = ({
    screenName
}) => {
  return (
    <View style={styles.myHeader}>

        <View style={styles.rowFlex2}>

        <MaterialCommunityIcons name="arrow-left" size={24} style={styles.headerIcon}/>

        <Text style={styles.myHeaderText}>{screenName}</Text>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    myHeader: {
        paddingHorizontal:"4%",
        marginTop:"14%",
        width:"100%",
        height: '4%',
      },
    
      myHeaderText: {
        textAlign: 'left',
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: "Arial",
        width: "66%",
      },

      rowFlex2:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        height:"100%",
        width:"100%",
    
        alignItems: 'center',
      },

      headerIcon: {
        width: "33%",
       },
    

});

export default HeaderComponent;