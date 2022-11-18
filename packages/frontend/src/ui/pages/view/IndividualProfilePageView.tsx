import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl, TouchableOpacity} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { folderCommonStyles } from '../../fragments/view';

let user: string = 'John Smith'
let isCurrentUser: boolean = true

export const setUserToShow = (userShown: string, isCurrentUser_: boolean) => {
  user = userShown
  isCurrentUser = isCurrentUser_
}

export type UserProps = {
  user: String;
};

/**
 * Show user info
 * 
 * @name IndividualProfilePageView
 * @returns React component
 */
const IndividualProfilePageView = () => {
  
  
  // QUERY DB HERE TO UPDATE STATUS



  let [status, setStatus] = React.useState('Available')
  let [statusColour, setStatusColour] = React.useState('#1adb87')

  return (
    <View style={styles.container}>
      <View style ={[folderCommonStyles.column]}>
        <View style= {[folderCommonStyles.row]}>
          <View style ={{
            backgroundColor: '#42d4f5',
            width: '30%',
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            padding: 20
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
              {user}
            </Text>
          </View>
        </View>

        <TouchableOpacity style = {{
          backgroundColor: statusColour,
          borderRadius: 20,
          padding: 10,
          marginTop: 20
        }} 
        onPress = {() => {
          if (isCurrentUser) {



            
            // QUERY DB TO CHANGE STATUS HERE




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
    height: '100%',
    width: '100%',
  },

  scrollContainer: {
    height: '50%',
  }
});

export default IndividualProfilePageView