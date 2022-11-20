import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { TaskListItem } from './TaskListItem';

export const GET_ALL_TASKS=gql`
query GetAllTasks($userId: String!) {
    getAllOwnerTasks(owner: $userId) {
      id
      houseId
      parentId
      taskListId
      owner
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
    const getAllTasksQuery = useQuery(GET_ALL_TASKS, {
        variables: { userId: userId },
    });

    
    const queries = [getAllTasksQuery]

    for (var i of queries){
        if (i.loading || i.loading) return <Text>Loading ...</Text>;
        if (i.error) return <Text style={{fontSize: 8}}>{i.error.message}:{"\n" + JSON.stringify(i.error)}</Text>;
        console.log(JSON.stringify(i.data) + "\nThis is data... hoping it is not null");
    }

    const dummyTask = {taskDone: false, task: "Make a task!", subtasks: [], author: "testUser", dueDate: "ASAP", taskId: "dummyTaskId"}
    
    const allTasks = getAllTasksQuery.data.getAllOwnerTasks

    if (allTasks.length > 0){
        // setTaskNum(allTasks.length);

        // var completedTasks = 0;
        // for (var k in allTasks){
        //     var j = k as any
        //     if (j.doneStatus == true){
        //         completedTasks++;
        //     }
        // }

        //will implement above some other time

            return (
            <FlatList style={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={allTasks as readonly any[] | null | undefined}
                    renderItem={({item}) => <TaskListItem userId={item.owner} taskDone={item.doneStatus} taskName={item.task} subtasks={item.subtasks} author={item.author} dueDate={item.dueDate} taskId={item.id}/>}
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
                    renderItem={({item}) => <TaskListItem userId={item.owner} taskDone={item.taskDone} taskName={item.task} subtasks={item.subtasks} author={item.author} dueDate={item.dueDate} taskId={item.taskId}/>}
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