import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { ApplianceModel, DishWasher, Dryer, OtherAppliance, Oven, ScheduledTime, Stove, WashingMachine } from '../../../../models/ApplianceModel';
import { folderCommonStyles } from '../common/FolderCommonStyles';
import ViewAppliancesPageItem from './ViewAppliancesPageItem';

export type Props = {
    userId: string;
};

export let removeAppliance = (debtId: string) => {
    console.log('No function available yet')
}

const FIND_APPLIANCES =
gql`
query FindAppliances($houseId: String!) {
    findAppliances(houseId: $houseId) {
      id, name, type, queue, availability, houseId
    }
}`

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
    
    // TODO HOUSE ID
    const { loading, data, refetch, error } = useQuery(FIND_APPLIANCES, {
        variables: { houseId: '777' },
    });

    const [refreshing, setRefreshing] = React.useState(false);

    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     refetch();
    //     wait(1000).then(() => setRefreshing(false));
    // }, []);

    if (loading)
        return <Text>Loading ...</Text>;
    if (error)
        return <Text>{error.message}</Text>;
    
    // console.log(data.findAppliances);
    let dataList = data.findAppliances;
    var applianceListStart: any[] | (() => any[]) = [];
    
    dataList.forEach((ele: { type: string; id: string; name: string; }) => {

        if (ele.type === "Stove") {
            (applianceListStart as unknown as any[]).push(new ApplianceModel(ele.id, ele.name, new Stove(), []));
        }
        else if (ele.type === "Oven") {
            (applianceListStart as unknown as any[]).push(new ApplianceModel(ele.id, ele.name, new Oven(), []));
        }
        else if (ele.type === "Washing Machine") {
            (applianceListStart as unknown as any[]).push(new ApplianceModel(ele.id, ele.name, new WashingMachine(), []));
        }
        else if (ele.type === "Dish Washer") {
            (applianceListStart as unknown as any[]).push(new ApplianceModel(ele.id, ele.name, new DishWasher(), []));
        }
        else if (ele.type === "Dryer") {
            (applianceListStart as unknown as any[]).push(new ApplianceModel(ele.id, ele.name, new Dryer(), []));
        }
        else {
            (applianceListStart as unknown as any[]).push(new ApplianceModel(ele.id, ele.name, new OtherAppliance(), []));
        }

        
    });
    // Mock data, update with backend connection in future sprint
    // let applianceListStart = [
    //    new ApplianceModel('1', 'Taco\'s washing machine', new WashingMachine(), [
    //     new ScheduledTime(1677498639, 1667509639),
    //     new ScheduledTime(1677798639, 1687599639)
    //    ]),

    //    new ApplianceModel('2', 'Laco\'s stove', new Stove(), [
    //     new ScheduledTime(1677118639, 1667509639),
    //     new ScheduledTime(1677798639, 1687599639)
    //    ]),

    //    new ApplianceModel('3', 'Waco\'s oven', new Oven(), [
    //     new ScheduledTime(1177498639, 1867509639)
    //    ])
    // ];

    console.log(applianceListStart);
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