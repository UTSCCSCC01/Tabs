import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export type Props = {
    screenName: string;
  };

const HeaderComponent: React.FC<Props> = ({
    screenName
}) => {
    var navigation = useNavigation();
  return (
    <View style={styles.myHeader}>

        <View style={styles.rowFlex2}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
                <MaterialCommunityIcons name="arrow-left" size={24}/>
            </TouchableOpacity>
            <Text style={styles.myHeaderText}>{screenName}</Text>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    myHeader: {
        paddingHorizontal:"4%",
        marginTop:"8%",
        width:"100%",
        height: '4%',
      },
    
      myHeaderText: {
        flex: 10,
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: "Arial",
      },

      rowFlex2:{
        display: 'flex',
        flex: 1,
        flexDirection: "row",
        height:"100%",
        width:"100%",
        alignItems: 'center',
      },

      headerIcon: {
        flex: 1,
       },
    

});

export default HeaderComponent;