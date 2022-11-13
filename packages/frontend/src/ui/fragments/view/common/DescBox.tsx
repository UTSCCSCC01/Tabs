import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DescBoxData } from './DescBoxData';
import { styles } from './mainViewStyles';

export const DescBox = (data: DescBoxData) => {
  return (
    <View style={styles.rcorners1}>
      <TouchableOpacity style={styles.container}>
        <LinearGradient colors={['#106A7C', '#3E436C']} style={styles.linearGradient1} start={[-0.04, 0]} end={[1.34, 1.34]}>
          {data.iconName != "none" && <MaterialCommunityIcons
            size={24}
            color={"#FFFFFF"}
            //I ignore typescript below so that i can make the name a parameter 
            //as the icon class is typed only for valid string
            //@ts-ignore
            name={data.iconName}></MaterialCommunityIcons>}
          <Text style={styles.whiteText2}>{data.text1}</Text>
          <Text style={styles.whiteText1}>{data.text2}</Text>
        </LinearGradient>

      </TouchableOpacity>

    </View>
  );
};
