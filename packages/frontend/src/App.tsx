import React, { useState } from "react"
import { TextInput, View, Text, Button, StyleSheet} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import { registerRootComponent } from 'expo';
import InvView from './ui/pages/view/inventoryView'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomePage from "./ui/pages/view/homePage";





import RentScreen from "./ui/pages/view/RentScreen";

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    name: 'test',
    cache: new InMemoryCache(),
    version: '0'
});

const myTheme = {
    dark: false,
    colors: {
      primary: '#E6E6E6B0',
      background: '#373737',

  const myTheme = {
    dark: false,
    colors: {
      primary: '#E6E6E6B0',
      background: '#373737',

      card: '#373737',
      text: '#E6E6E6B0',
      border: '#373737',
      notification: 'rgb(255, 69, 58)',
    },
  };






const App = () => (
    <ApolloProvider client={client}>
      <NavigationContainer theme={myTheme}>
        <MyTabs/>
      </NavigationContainer>

    </ApolloProvider>
  );


  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Calendar" component={InvView} options={{tabBarIcon: () =>
          (<View><MaterialCommunityIcons name="calendar" size={24} color={"#E6E6E6B0"}/></View>)}}/>


        <Tab.Screen name="Home" component={InvView} options={{tabBarIcon: () => (<View>
          <MaterialCommunityIcons name="home" size={24} color={"#E6E6E6B0"}/>
        </View>)}}/>
        <Tab.Screen name="Notifications" component={InvView} options={{tabBarIcon: () => (<View>
          <MaterialCommunityIcons name="bell" size={24} color={"#E6E6E6B0"}/>
        </View>)}}/>
      </Tab.Navigator>
    );
  }




export default registerRootComponent(App)
