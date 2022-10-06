import React, { useState } from 'react';
import {  SafeAreaView,  FlatList,  StatusBar, Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';

const folderBackgroundFragmentStyle = StyleSheet.create({
    
})


export const FolderBackdropListFragment = (props: any) => {
    /*



        marginTop as temporary spacing element to push folder down
        probably edit it or remove it most likely just remove it



    */
    return (
        <View style = {{marginTop: 100}}>
            <View style = {[folderBackdropListFragmentStyles.column]}>

                {/* Title row with folder cutout */}
                <View style = {[folderBackdropListFragmentStyles.row]}>
                    <View style = {[folderBackdropListFragmentStyles.corner]}>

                    </View>
                    <Text style = {[folderBackdropListFragmentStyles.text]}>
                        {"Title placeholder"}
                    </Text>
                    <View style = {[folderBackdropListFragmentStyles.triangle]}>

                    </View>
                </View>

                <View style = {[folderBackdropListFragmentStyles.container]}>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                    <Text>
                        {"Paco"}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const folderBackdropListFragmentStyles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },

    column: {
        flexDirection: "column"
    },

    corner: {
        padding: 20,
        backgroundColor: "#8888ff",
        borderTopLeftRadius: 20
    },

    text: {
        backgroundColor: "#8888ff",
        height: 40,
        paddingTop: 10,
        color: "white",
        fontSize: 20
    },

    container: {
        borderTopRightRadius: 10,
        backgroundColor: "#8888ff",
        height: 2000
    },

    triangle: {
        width:30,
        height:40,
        borderRightWidth:40,
        borderRightColor:"transparent",
        borderBottomWidth:40,
        borderBottomColor:"#8888ff"
    }

})