import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { useHeaderHeight } from '@react-navigation/elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {gql,useMutation} from '@apollo/client'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignUp from './loginPage';

let windowHeight = Dimensions.get('window').height;

/**
* @name SignUpPage
* @returns a login form with two text inputs, username and password. Also includes a button to navigate to signup and a login button
*/
function SignUpPage( {navigation}:{navigation:any} ) {

    const height = useHeaderHeight()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const SIGNUP = gql`
    mutation SignUp($email: String!, $username: String!, $password: String!, $phone: String!) {
        signUp(email: $email, username: $username, password: $password, phone: $phone) {
            id
            email
            username
            password
            phone
        }
    }
    `

    const [SignupMutationFunction, SignupMutationFunctionData] = useMutation(SIGNUP);

    const [hasError, setHasError] = useState(false);

    //backend function for login here, constants for username and password stored in username, password
    const onInput = () => {
        setHasError(false)
        if (username == '' || password == '' || email == '' || phoneNumber == '') {
                setHasError(true);
                return;
        }

        SignupMutationFunction({variables: {"email":email, "username":username, "password":password, "phone":phoneNumber}}).then(response => {
            if (response == null ||response.data == null || response.data.signIn == null) {
            setHasError(true);
        }
         }).catch(response => {
            setHasError(true);
         });
    }
    //Navigate to the signin page
    const onSwitchToLogIn = () => {
        navigation.navigate('loginPg');
    }

    return (
        <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589"]} style={stylesheet.gradientStyle} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
        <SafeAreaView>
        <KeyboardAwareScrollView style={stylesheet.ScrollStyle} contentContainerStyle={stylesheet.ScrollContentStyle}>
            <View style={stylesheet.mainView}>

                <Text style={stylesheet.title}> Welcome to Tabs!  </Text>
                <Text style={stylesheet.sloganText}> Organize your household  </Text>
                <Text style={stylesheet.InputText}> Username </Text>
                <TextInput
                    style={stylesheet.InputTextBox}
                    onChangeText={newText => setUsername(newText)}
                    placeholder=""
                />

                <Text style={stylesheet.InputText}> Password </Text>
                <TextInput
                    style={stylesheet.InputTextBox}
                    secureTextEntry={true}
                    onChangeText={newText => setPassword(newText)}
                    placeholder=""
                />

                <Text style={stylesheet.InputText}> Email          </Text>
                <TextInput
                    style={stylesheet.InputTextBox}
                    onChangeText={newText => setEmail(newText)}
                    placeholder=""
                />

                <Text style={stylesheet.InputText}> Phone        </Text>
                <TextInput
                    style={stylesheet.InputTextBox}
                    onChangeText={newText => setPhoneNumber(newText)}
                    placeholder=""
                    keyboardType='numeric'
                />

                <View style={stylesheet.buttonsContainer}>

                    <TouchableOpacity style={stylesheet.buttonOutline} onPress={onSwitchToLogIn}>
                        <Text style={stylesheet.buttonText}> Log In </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesheet.buttonOutline} onPress={onInput}>
                        <Text style={stylesheet.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
                
                <View>
                    {hasError && <Text style={stylesheet.buttonText}>Signup failed</Text>}
                </View>
                </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
        </LinearGradient>
        
    );
}

const stylesheet = StyleSheet.create({
    mainView: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%"
    },
    ScrollStyle: {
        width: "100%",
        
    },
    ScrollContentStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: "10%"
    },
    gradientStyle: {
        alignItems: 'center',
        width: "100%",
        height: "100%",
        flex: 1
    },
    title: {
        fontSize: 30,
        color: 'white',
        marginTop: "20%",
        fontWeight: 'bold'
    },
    sloganText: {
        fontSize: 20,
        color: 'white',
        marginTop: "5%",
    },
    keyboardView: {
        width: '100%',
        height: 0.35 * windowHeight,
        backgroundColor: 'blue',
        color: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    InputText: {
        fontSize: 18,
        color: 'white',
        marginTop: "5%",
        marginRight: "60%"
    },
    InputTextBox: {
        fontSize: 18,
        backgroundColor: '#E3EFF1',
        borderRadius: 20,
        width: "85%",
        height: 0.06 * windowHeight,
        marginTop: "2%",
        paddingHorizontal: "5%"
    },
    buttonsContainer: {
        height: "15%",
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "2%",
    },
    buttonOutline: {
        height: "47%",
        width: '40%',
        backgroundColor: "#034452",
        borderRadius: 20,
        marginHorizontal: "2%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    }
})

const Stack = createNativeStackNavigator();

// TODO: Change FullInvView to the profile page when it's done
const SignUpLogin = () => {
    return (
            <Stack.Navigator initialRouteName='MainView' screenOptions={{headerShown: false}}>
                <Stack.Screen name = 'MainView' component = {SignUpPage}/>
                <Stack.Screen name = 'loginPg' component = {LoginSignUp} />
            </Stack.Navigator>
    )
}

export default SignUpLogin;