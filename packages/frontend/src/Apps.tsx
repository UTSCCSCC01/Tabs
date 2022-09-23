import React, { useState , FC}from "react"
import { TextInput, View, Text, BackHandler} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation } from '@apollo/client';


const SIGN_UP = gql`
mutation SignUp(email: String!){
    signIn(email: String!, password: String!){
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
        return <Text>{'loading failed'} </Text>
    }
    if(error){
        return <Text>{'error occured'}</Text>
    }
    
    const submitHandle = ()=>{
        signup({variables: {email:input, password:'password'}})
    }
  return(
    <View>
      <TextInput
        style={{padding:10}}
        defaultValue={input}
        value = {input}
        textAlign="center"
        onSubmitEditing={submitHandle} />
    </View>
  )
  }
  
const App = () => (
    <ApolloProvider client={client}>
    <TestForm/>
    </ApolloProvider>
  );



  
  export default App