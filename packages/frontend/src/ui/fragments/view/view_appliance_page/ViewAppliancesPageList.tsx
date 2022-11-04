import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { ApplianceModel, Oven, ScheduledTime, Stove, WashingMachine } from '../../../../models/ApplianceModel';
import { folderCommonStyles } from '../FolderCommonStyles';
import ViewAppliancesPageItem from './ViewAppliancesPageItem';

export type Props = {
    userId: string;
};

export let removeAppliance = (debtId: string) => {
    console.log('No function available yet')
}

/**
 * Display the list of inventory items
 * 
 * @name ViewAppliancesPageList
 * @param userId User ID of the current user
 */
const ViewAppliancesPageList: React.FC<Props> = ({
    userId
}) => {
    console.log('Appliance page created')
    
    // Mock data, update with backend connection in future sprint
    let applianceListStart = [
       new ApplianceModel('1', 'Taco\'s washing machine', new WashingMachine(), [
        new ScheduledTime(1677498639, 1667509639),
        new ScheduledTime(1677798639, 1687599639)
       ]),

       new ApplianceModel('2', 'Laco\'s stove', new Stove(), [
        new ScheduledTime(1677118639, 1667509639),
        new ScheduledTime(1677798639, 1687599639)
       ]),

       new ApplianceModel('3', 'Waco\'s oven', new Oven(), [
        new ScheduledTime(1177498639, 1867509639)
       ])
    ];

    const [applianceList, setApplianceList] = React.useState(applianceListStart)

    removeAppliance = (id: string) => {
        let filteredList = applianceList.filter(
            it => it.id != id
        )

        setApplianceList(filteredList)
    }

    let inUse = 0;
    let total = applianceList.length;
    let currentTIme = Date.now() / 1000;

    for (let i = 0; i < applianceList.length; ++i) {
        if (applianceList[i].hasConflictingTime(currentTIme)) {
            inUse++;
        }
    }

    return (
        <View style={[styles.listContainer, folderCommonStyles.column, {flex: 1}]}>
            <FlatList style={styles.listContainer}
                contentContainerStyle = {{ paddingBottom: 20 }}
                data = {applianceList as readonly any[] | null | undefined}
                renderItem = {({item}) => 
                    <ViewAppliancesPageItem 
                        applianceId = {item.id}
                        name = {item.name}
                        userId = {userId}
                        type = {item.type}
                        scheduled = {item.scheduled}
                    /> 
                }

                ListHeaderComponent = {
                    <View style = {[folderCommonStyles.row, {paddingBottom: 30}]}> 
                        <View style={[styles.square, folderCommonStyles.column, {backgroundColor: '#106A7C'}]}>
                            <SvgUri
                                width="40%"
                                height="40%"
                                uri= "https://cdn.discordapp.com/attachments/852224878185676831/1037816131395792977/Vector_4.svg"
                            />
                            <Text style={styles.statusCount}>
                                {total - inUse}
                            </Text>

                            <Text style={styles.statusLabel}>
                                {'Available'}
                            </Text>
                        </View>

                        <View style={[styles.square, folderCommonStyles.column, {backgroundColor: '#34ACBC'}]}>
                            <SvgUri
                                width="40%"
                                height="40%"
                                uri= "https://cdn.discordapp.com/attachments/852224878185676831/1037816139025227926/Vector_5.svg"
                            />
                            <Text style={styles.statusCount}>
                                {inUse}
                            </Text>
                            <Text style={styles.statusLabel}>
                                {'In Use'}
                            </Text>
                        </View>
                    </View>
                }

            />
    </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        marginTop: '10%',
        height: '165%',
        width: '100%',
    },

    square: {
        width: '44%',
        height: 140,
        margin: '3%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1
    },

    statusCount: {
        color: 'white',
        fontSize: 20,
        padding: 5
    },

    statusLabel: {
        color: 'white',
        fontSize: 15,
        padding: 5
    }
});

export default ViewAppliancesPageList;