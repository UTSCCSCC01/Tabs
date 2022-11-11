import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl, ScrollView } from 'react-native';
import { CategoryListItem } from './categoryListItem';
import { CategoryListSingleton } from './querySingletons';

// export type Props = {
//     houseId: string;
//     isUpdatingRent: boolean,
//     setIsUpdatingRent: any,
// };

// const wait = (timeout: number | undefined) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// }






/**
* @name TaskListComponent
* @param userId id of current user
* @param isUpdatingTasks a boolean for whether or not tasks are being updated
* @param setIsUpdatingTasks a function to set isUpdatingTasks to true/false
* @returns React component with a list of rents for each roommate
* @see RentAdminScreen.tsx where RentListComponent is used
*/
const CategoryListComponent = ({userId, inventoryId, itemListViewPortId, switchViewPort, setCategoryId}: {userId: string, inventoryId: string, switchViewPort:Function, itemListViewPortId: number, setCategoryId:Function}) => {

    // const [taskListId, setTaskListId] = useState("none");

    // const getTaskListQuery   = useQuery(GET_TASK_LIST, {
    //     variables: { userId: userId },
    // });

    // const [refreshing, setRefreshing] = React.useState(false);
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     refetch();
    //     wait(1000).then(() => setRefreshing(false));
    //   }, []);


    const allCats = CategoryListSingleton({inventoryId: inventoryId});

    if (allCats.length == null) return allCats; //returns loading or error if it is either of those
    
    

    const dummyCat = {isRestricted: true, categoryName: "Make a category!", iconName: "tick", inventoryId: inventoryId, categoryId: "dummyCategoryId"}
    

    if (allCats.length > 0){

            return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={allCats as readonly any[] | null | undefined}
                    renderItem={({item}) => <CategoryListItem setCategoryId={setCategoryId} fullItem={item} switchViewPort={switchViewPort} itemListViewPortId={itemListViewPortId} isRestricted={item.isRestricted} categoryName={item.categoryName} iconName={item.iconName} description={item.description} inventoryKey={item.inventoryId} categoryId={item.id}/>}
            />
        );
    }
    

    else{
        const dummyCatList = [dummyCat];
        const DATA = dummyCatList;
        console.log("\n\nDISPLAYING DUMMY DATA\n\n")
        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <CategoryListItem setCategoryId={setCategoryId}  fullItem={item} switchViewPort={switchViewPort} itemListViewPortId={itemListViewPortId} isRestricted={item.isRestricted} categoryName={item.categoryName} iconName={item.iconName} description={item.description} inventoryKey={item.inventoryId} categoryId={item.id}/>}
            />
        );

    }

}
    

const styles = StyleSheet.create({
    listContainer: {
        marginTop: '10%',
        height: '165%',
        width: '100%',
      },
});




export default CategoryListComponent;