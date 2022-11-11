import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl, ScrollView } from 'react-native';
import { CategoryListItem } from './CategoryListItem';
import { ItemListItem } from './itemListItem';
import { ItemListSingleton } from './querySingletons';

// export type Props = {
//     houseId: string;
//     isUpdatingRent: boolean,
//     setIsUpdatingRent: any,
// };

// const wait = (timeout: number | undefined) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// }



export const FIND_ITEMS=gql`
query ItemsQuery($categoryId: String) {
  findItemsByCategory(categoryId: $categoryId) {
    id
    quantity
    expiration
    tags
    categoryId
    name
  }
}
`


/**
* @name TaskListComponent
* @param userId id of current user
* @param isUpdatingTasks a boolean for whether or not tasks are being updated
* @param setIsUpdatingTasks a function to set isUpdatingTasks to true/false
* @returns React component with a list of rents for each roommate
* @see RentAdminScreen.tsx where RentListComponent is used
*/
const ItemListComponent = ({setItemId ,userId, categoryId, itemListViewPortId, switchViewPort}: {setItemId:Function, userId: string, categoryId: string, switchViewPort:Function, itemListViewPortId: number}) => {

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

    const allItems = ItemListSingleton({categoryId: categoryId});

    if (allItems.length == null) return allItems; //returns loading or error if it is either of those
    
 
    

    const dummyItem = {capacity: 1, tags: [] as string[], isRestricted: true, itemName: "Add an item!", categoryId: categoryId, itemId: "dummyItemId"}
    

    if (allItems.length > 0){

            return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={allItems as readonly any[] | null | undefined}
                    renderItem={({item}) => <ItemListItem setItemId={setItemId} tags={item.tags} capacity={item.capacity} fullItem={item} switchViewPort={switchViewPort}  itemName={item.itemName} itemType={item.type} categoryId={item.categoryId} itemId={item.id}/>}
            />
        );
    }
    

    else{
        const dummyItemList = [dummyItem];
        const DATA = dummyItemList;
        console.log("\n\nDISPLAYING DUMMY DATA\n\n")
        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <ItemListItem setItemId={setItemId} tags={item.tags} capacity={item.capacity} fullItem={item} switchViewPort={switchViewPort}  itemName={item.itemName} itemType={item.type} categoryId={item.categoryId} itemId={item.id}/>}
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

export default ItemListComponent;