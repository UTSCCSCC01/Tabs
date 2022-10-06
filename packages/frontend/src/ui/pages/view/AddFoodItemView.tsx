import { registerRootComponent } from 'expo';
import React from 'react';
import {  SafeAreaView,  FlatList,  StatusBar, Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FolderBackdropListFragment } from '../../fragments/view/FolderBackdropFragment';
import FolderBackdropAsset from '../../../assets/images/FolderBackgdrop.svg';


const App = () => {
  return (
    <View style={{}}>
        <FolderBackdropListFragment>

        </FolderBackdropListFragment>
    </View>
  )
};

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
    },
})

export default registerRootComponent(App);