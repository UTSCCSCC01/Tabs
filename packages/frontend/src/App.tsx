import React, { useState }from "react"
import { TextInput, View, Text, Button, StyleSheet} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation } from '@apollo/client';
import { registerRootComponent } from 'expo';

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

    const [input] = useState()
    const [signup,  { loading, error }] = useMutation(SIGN_UP)
    if(loading){
        return <Text style={styles.input}>{'loading failed'} </Text>
    }
    if(error){
        return <Text style={styles.input}>{'error occured'}</Text>
    }
    
    const submitHandle = ()=>{
        signup({variables: {"email":String(input), "password":'password'}})
        console.log("created resuorce in db")
    }
  return(
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        defaultValue={input}
        value = {input}
        onChangeText={input}
        textAlign="center"
        placeholder="TYPE HERE"
        onSubmitEditing={submitHandle} />
        <Button 
        onPress={submitHandle}
        title="CREATE RESOURCE"
        color="red"/>
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
      height: 40,
      margin: 20,
      borderWidth: 10,
      padding: 10,
    },
  });


export default registerRootComponent(App)