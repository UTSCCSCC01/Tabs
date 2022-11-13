import React from 'react';
import { View } from 'react-native';
import { DescBoxList } from './DescBoxList';
import { styles } from './mainViewStyles';
import { DescBox } from "./DescBox";
import { DescBox2 } from "./DescBox2";

export const DoubleDescBox = (data: DescBoxList) => {
  return (
    <View style={styles.rowFlex1}>

      <DescBox iconName={data.data[0].iconName} text1={data.data[0].text1} text2={data.data[0].text2} />


      <DescBox2 iconName={data.data[1].iconName} text1={data.data[1].text1} text2={data.data[1].text2} />
    </View>
  );
};
