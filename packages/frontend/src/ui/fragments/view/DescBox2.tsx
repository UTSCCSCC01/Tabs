import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DescBoxData } from './DescBoxData';
import { styles } from './mainViewStyles';

//same as the above but different color, technically i could make the gradient style a 
//field but right now that is too much work

export const DescBox2 = (data: DescBoxData) => {
  return (

    <View style={styles.rcorners1}>
      <TouchableOpacity style={styles.container}>
        <LinearGradient colors={['#34ACBC', '#9FD3DE']} style={styles.linearGradient1} start={[-0.04, 0]} end={[1.34, 1.34]}>
        {data.iconName != "none" && <MaterialCommunityIcons
            size={24}
            color={"#FFFFFF"}
            //@ts-ignore
            name={data.iconName}></MaterialCommunityIcons>}
          <Text style={styles.whiteText2}>{data.text1}</Text>
          <Text style={styles.whiteText1}>{data.text2}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
