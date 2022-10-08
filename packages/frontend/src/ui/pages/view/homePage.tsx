import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import FolderIcon from '../../../assets/images/folder';
import InvView from './inventoryView';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Directions, TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { Color } from 'react-native-svg';

import RentPage from './rentPage';
import CalendarPage from './calendarPage';
import NotificationsPage from './notificationsPage';
import AppliancesPage from './appliancesPage';
import ToDoListPage from './ToDoListPage';

const HomePage = ( {navigation} ) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.folderBack}>
                <FolderIcon color='#1C4048'/>
            </View>
            <View style={styles.navigatorStyle}>

                <View style={styles.navPanelStyle}>
                    <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Inventory')}>
                        <View style={{
                            borderRadius: 1000,
                            width: "70%",
                            height: "70%",
                            top: "15%",
                            backgroundColor: '#DD6363',
                        }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Rent')}>
                        <View style={{
                            borderRadius: 1000,
                            width: "70%",
                            height: "70%",
                            top: "15%",
                            backgroundColor: '#8E7CD8',
                        }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Notifications')}>
                        <View style={{
                            borderRadius: 1000,
                            width: "70%",
                            height: "70%",
                            top: "15%",
                            backgroundColor: '#D4C17A',
                        }}>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.navPanelStyle}>
                    <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Calendar')}>
                        <View style={{
                            borderRadius: 1000,
                            width: "70%",
                            height: "70%",
                            top: "15%",
                            backgroundColor: '#7DBA6E',
                        }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Appliances')}>
                        <View style={{
                            borderRadius: 1000,
                            width: "70%",
                            height: "70%",
                            top: "15%",
                            backgroundColor: '#34ACBC',
                        }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('To Do')}>
                        <View style={{
                            borderRadius: 1000,
                            width: "70%",
                            height: "70%",
                            top: "15%",
                            backgroundColor: '#CE7DB8',
                        }}>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            
        </View>
    )
}

const Stack = createNativeStackNavigator();

const Home = () => {
    return (
            <Stack.Navigator initialRouteName='HomePage'>
                <Stack.Screen name = 'Home' component = {HomePage}/>
                <Stack.Screen name = 'Inventory' component = {InvView} />
                <Stack.Screen name = 'Rent' component = {RentPage} />
                <Stack.Screen name = 'Notifications' component = {NotificationsPage} />
                <Stack.Screen name = 'Calendar' component = {CalendarPage} />
                <Stack.Screen name = 'Appliances' component = {AppliancesPage} />
                <Stack.Screen name = 'To Do' component = {ToDoListPage} />
            </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "100%",
        backgroundColor: '#127589',
    },
    navBoxBack: {
        backgroundColor: '#2C2C2C',
        width: 60,
        height: 60,
        top: "50%",
        alignItems: 'center',
        borderRadius: 10,
        position: 'relative',
        zIndex: 1
    },
    folderBack: {
        zIndex: -1,
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        bottom: 0,
        left: 0,
        position: 'absolute',
        justifyContent: 'flex-end',
        opacity: 50
    },
    navPanelStyle: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    navigatorStyle: {
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'space-evenly',
        top: '43%'
    }
})

export default Home;
