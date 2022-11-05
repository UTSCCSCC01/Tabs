import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './mainViewStyles';

export const BorderIcon = ({iconName}:{iconName: string}) => {
  return (

    <View style={styles.iconBorder}>
      <View style={styles.center}>

        {/*@ts-ignore*/}
        <MaterialCommunityIcons name={iconName.text} size={32} style={styles.splitIcon} />
      </View>
    </View>

  );
};
