import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { folderCommonStyles } from '../common/FolderCommonStyles';

export type Props = {
    screenName: string;
  };

const ApplianceHeaderComponent: React.FC<Props> = ({
    screenName
}) => {
  return (
    <View style={folderCommonStyles.column}>

        <View style={folderCommonStyles.row}>

            <MaterialCommunityIcons name="arrow-left" size={24} style={styles.headerIcon}/>

            <Text style={styles.myHeaderText}>{screenName}</Text>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    myHeaderText: {
        textAlign: 'left',
        fontWeight: "bold",
        fontSize: 18,
        width: "66%",
    },

    headerIcon: {
    width: "33%",
    },
});

export default ApplianceHeaderComponent;