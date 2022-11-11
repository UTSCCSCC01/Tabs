import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from "./mainViewStyles";
import { HeaderData } from "./HeaderData";

export const BackButton=({backFunction, argument}: {backFunction: Function, argument: any}) => <TouchableOpacity style={styles.headerIcon} onPress={() => backFunction(argument)}>
<MaterialCommunityIcons name="arrow-left" size={24} />
</TouchableOpacity>;

export const MyHeader = (data: HeaderData) => {

  return (
    <View style={styles.myHeader}>

      <View style={styles.rowFlex2}>

        <BackButton backFunction={data.backFunction.myFunction} argument={data.backFunction.argument}/>

        <Text style={styles.myHeaderText}>{data.title}</Text>

      </View>

    </View>
  );
};
