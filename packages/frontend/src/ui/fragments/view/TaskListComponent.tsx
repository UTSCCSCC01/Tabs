import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl, ScrollView } from 'react-native';
import RentContainerComponent from './RentContainerComponent';
import { TaskListItem } from './TaskListItem';

// export type Props = {
//     houseId: string;
//     isUpdatingRent: boolean,
//     setIsUpdatingRent: any,
// };

// const wait = (timeout: number | undefined) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// }

const GET_TASK_LIST =
gql`
query GetTaskListByUser($owner: String) {
    getTaskListByUser(owner: $owner) {
      houseId
      owner
      name
      dateCreated
      done
    }
}`

const GET_ALL_TASKS=gql`
query GetAllTasks($taskListId: String!) {
    getAllTasks(taskListId: $taskListId) {
      houseId
      taskListId
      author
      task
      dateDue
      doneStatus
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
const TaskListComponent = ({userId, houseId}: {userId: string, houseId: string}) => {

    const [taskListId, setTaskListId] = useState("none");

    const getTaskListQuery   = useQuery(GET_TASK_LIST, {
        variables: { userId: userId },
    });

    // const [refreshing, setRefreshing] = React.useState(false);
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     refetch();
    //     wait(1000).then(() => setRefreshing(false));
    //   }, []);

    const getAllTasksQuery = useQuery(GET_ALL_TASKS, {
        variables: { taskListId: taskListId },
    });

    
    const queries = [getTaskListQuery, getAllTasksQuery]

    for (var i of queries){
        if (i.loading || i.loading) return <Text>Loading ...</Text>;
        if (i.error) return <Text style={{fontSize: 8}}>{i.error.message}:{"\n" + JSON.stringify(i.error)}</Text>;
        console.log(JSON.stringify(i.data) + "\nThis is data... hoping it is not null");

    }

    // if (getTaskListQuery.data.getTaskListByUser != null && getAllTasksQuery.data.getAllTasks == null || getAllTasksQuery.data.getAllTasks.length < 1){
    //     if (getTaskListQuery.data.getTaskListByUser != null){
    //         setTaskListId(getTaskListQuery.data.getTaskListByUser[0].id);
    //         getAllTasksQuery.refetch(
    //             { taskListId: taskListId }
    //         )
    //     }
    // }

    const userTaskLists = getTaskListQuery.data.getTaskListByUser;
    
    //UNCOMMENT THIS ONCE JP FIXES BACKEND
    
    // if (userTaskLists != null &&userTaskLists[0] != null && userTaskLists[0] != taskListId ) {

    //     console.log("LOOK AT THE TASK LIST ID:")
    //     console.log(JSON.stringify(userTaskLists[0]));
    //     setTaskListId(userTaskLists[0].id);

    // }

 
    


    const dummyTask = {taskDone: false, taskName: "Make a task!", subtasks: [], author: "testUser", dueDate: "ASAP", taskId: "dummyTaskId"}
    
    const allTasks = getAllTasksQuery.data.getTaskListByUser

    if ( allTasks != null){
            return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={allTasks as readonly any[] | null | undefined}
                    renderItem={({item}) => <TaskListItem taskDone={item.taskDone} taskName={item.taskName} subtasks={item.subtasks} author={item.author} dueDate={item.dueDate} taskId={item.taskId}/>}
            />
        );
    }
    

    else{
        const dummyTaskList = [dummyTask];
        const DATA = dummyTaskList;
        console.log("\n\nDISPLAYING DUMMY DATA\n\n")
        return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <TaskListItem taskDone={item.taskDone} taskName={item.taskName} subtasks={item.subtasks} author={item.author} dueDate={item.dueDate} taskId={item.taskId}/>}
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

export default TaskListComponent;