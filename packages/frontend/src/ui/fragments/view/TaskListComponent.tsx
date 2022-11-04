import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl } from 'react-native';
import RentContainerComponent from './RentContainerComponent';
import { TaskListItem } from './TaskListItem';

export type Props = {
    houseId: string;
    isUpdatingRent: boolean,
    setIsUpdatingRent: any,
};

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GET_TASKS =
gql`
query GetTasks($userId: String!) {
    getTasks(userId: $userId) {
      
    }
}`



/**
* @name TaskListComponent
* @param userId id of current user
* @param isUpdatingTasks a boolean for whether or not tasks are being updated
* @param setIsUpdatingTasks a function to set isUpdatingTasks to true/false
* @returns React component with a list of rents for each roommate
* @see RentAdminScreen.tsx where RentListComponent is used
*/
const TaskListComponent = ({userId, inventoryId}: {userId: string, inventoryId: string}) => {
    const { loading, data, refetch, error } = useQuery(GET_TASKS, {
        variables: { userId: userId },
    });

    // const [refreshing, setRefreshing] = React.useState(false);
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     refetch();
    //     wait(1000).then(() => setRefreshing(false));
    //   }, []);

    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>{error.message}</Text>;

    return data.getBills.map((element: { }) => {

        const DATA = data.getBills;

        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <TaskListItem taskDone={item.taskDone} taskName={item.taskName} subtasks={item.subtasks} author={item.author} dueDate={item.dueDate} taskId={item.taskId}/>}
            />
        );
    })[0];

}
    

const styles = StyleSheet.create({
    listContainer: {
        marginTop: '10%',
        position: 'absolute',
        height: '165%',
        width: '100%',
      },
});

export default TaskListComponent;