import React, { useState }from "react"
import { TextInput, View, Text, Button, StyleSheet} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import { registerRootComponent } from 'expo';
import {DescBox, DescBoxData, DoubleDescBox, MyHeader, DescBoxList, Bg1} from './ui/pages/view/inventoryView'


const dbd1 = new DescBoxData("food", "4", "Products");
const dbd2 = new DescBoxData("emoticon-sad-outline", "2", "Expired");
const data = [dbd1, dbd2];

const dbl = new DescBoxList(data);

const SIGN_UP = gql`
mutation signUp($email: String!, $password: String!) {
  signUp(email: $email, password: $password){
    email
  }
}
`

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    name: 'test',
    cache: new InMemoryCache(),
    version: '0'
  });
    




const TestForm = ()=>{

    console.log(data[1].iconName)

    const [input] = useState()
    const [signup,  { loading, error }] = useMutation(SIGN_UP)
    if(loading){
        return  <View style={styles.container}><Text style={styles.input}>{'loading failed'} </Text></View>
    }
    if(error){
        return <View style={styles.container}><Text style={styles.input}>{'error occured'}</Text></View>
    }
    
    const submitHandle = ()=>{
        signup({variables: {"email":String(input), "password":'password'}})
        console.log("created resuorce in db")
    }
  return(
    <View style={styles.page2}>
   <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
        <MyHeader text="Food Inventory"/>
        <View style={styles.flexPage}>
      
         
          <TextInput
            style={styles.input}
            defaultValue={input}
            value = {input}
            onChangeText={input}
            textAlign="center"
            placeholder="TYPE HERE"
            onSubmitEditing={submitHandle}/>
            <Button 
            onPress={submitHandle}
            title="CREATE RESOURCE"
            color="red"/>
            <DoubleDescBox data={data}></DoubleDescBox>
            
      
    
        </View>
      </LinearGradient>
      
    </View>
  )
  }
  
const App = () => (
    <ApolloProvider client={client}>
    <TestForm/>
    </ApolloProvider>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      color: "#FF0000",
      height: 40,
      margin: 20,
      borderWidth: 10,
      padding: 10,
    },
    page: {
      width: "100%",
      height: "100%",
      padding:20,
      paddingTop: 30,
      backgroundColor: ""
    },

    page2: {
      width: "100%",
      height: "100%",
    },

    flexPage: {

      width: "100%",
      height: "100%",
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start'
      

    }
  });




export default registerRootComponent(App)