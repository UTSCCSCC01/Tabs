import { gql, InMemoryCache, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl, TouchableOpacity} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { folderCommonStyles } from '../../fragments/view';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';

let user: string = 'paco'
let isCurrentUser: boolean = true

export const setUserToShow = (userShown: string, isCurrentUser_: boolean) => {
  user = userShown
  isCurrentUser = isCurrentUser_
}

export type UserProps = {
  user: String;
};

const CHANGE_STATUS = gql`
mutation UpdateHouseMemberBusy($userId: String!, $isBusy: Boolean!) {
    updateHouseMemberBusy(userId: $userId, isBusy: $isBusy)
}`

const GET_STATUS = gql`
query GetHouseMember($userId: String!) {
    getHouseMember(userId: $userId) {
        userId isBusy isOwner isAdmin houseId name silentHours additionalInfo isBusy
    }
}`

let lastStatus = 'Available'
let lastStatusDisplayed = 'Available'
/**
 * Show user info
 * 
 * @name IndividualProfilePageView
 * @returns React component
 */
const IndividualProfilePageView = () => {

    
    const [initial, setInitial] = React.useState(false);
    let [status, setStatus] = React.useState('Available')
    let [statusColour, setStatusColour] = React.useState('#1adb87')
    const [changeStatus,  { loading: changeStatusLoading, error: changeStatusError}] = useMutation(CHANGE_STATUS)

    const { loading, data, refetch, error } = useQuery(GET_STATUS, {
        variables: {
        userId: user
        }
    })


    if (loading) {
            return <Text>{'Loading...'}</Text>
    } 

    if (error) {
        console.log(error.message);
        return <Text>{error.message}</Text>
    } 


    let queriedUserStatus = data.getHouseMember;


    if (!error && !loading && status != lastStatusDisplayed && !initial) {
        lastStatusDisplayed = status
        setStatus(!queriedUserStatus.isBusy ? 'Available' : 'Busy')
        setStatusColour(queriedUserStatus.isBusy == 'Available' ? '#1adb87' : '#f7cdc8')
        setInitial(true)
    }

    if (!changeStatusLoading && !changeStatusError && status != lastStatus) {
        lastStatus = status
        changeStatus( {variables: {
        userId: user,
        isBusy: !(status == 'Available' ? true : false)
        
        }})

        console.log(error)
    }

  return (
    <View style={styles.container}>
        <HeaderComponent screenName={'Profile Page'}></HeaderComponent>
      <View style ={[folderCommonStyles.column]}>
        <View style= {[folderCommonStyles.row, styles.containee]}>
          <View style ={{
            backgroundColor: '#42d4f5',
            width: '30%',
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            padding: 20,
          }}>
            <SvgUri 
                    uri={"https://cdn.discordapp.com/attachments/852224878185676831/1043107861682724905/Vector.svg"}
                    style ={{
                        position: 'relative'
                    }}
                    viewBox="0 0 70 70"
                    preserveAspectRatio='none'/>
            </View>
          <View style ={{
            backgroundColor: '#17bdb2',
            width: '70%',
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            padding: 20
          }}>
            <Text style={{
              fontSize: 20
            }}>
              {data.getHouseMember.name}
            </Text>
            <View style = {{padding: 5}}>

            </View>
            <Text style={{
              fontSize: 15
            }}>
              {data.getHouseMember.additionalInfo}
            </Text>
          </View>
        </View>

        <TouchableOpacity style = {{
            // position: 'absolute',
          backgroundColor: statusColour,
          borderRadius: 20,
          padding: 10,
          marginTop: 10,
        }} 
        onPress = {() => {
          if (isCurrentUser) {
            setStatus(status == 'Available' ? 'Busy' : 'Available')
            setStatusColour(status != 'Available' ? '#1adb87' : '#f7cdc8')
          }
        }}>
            <Text>
              {'Status: ' + status}
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#c8d4f7',
    height: '90%',
    width: '100%',
  },

  containee: {
    marginTop: 100,
  },

  scrollContainer: {
    height: '50%',
  }
});

export default IndividualProfilePageView