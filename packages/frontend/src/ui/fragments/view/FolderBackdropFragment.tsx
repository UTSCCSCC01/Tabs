
import { gql, useMutation } from '@apollo/client';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import {  SafeAreaView,  FlatList,  StatusBar, Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { ReactString } from '../../String';
import { FolderBackdropActionButton, FolderBackdropActionButtonArgument } from './FolderBackdropActionButton';
import { FolderBackdropTextInputField, FolderBackdropTextInputFieldArgument } from './FolderBackdropTextInputField';
import { folderCommonStyles } from './FolderCommonStyles';
import { InventoryItem } from './InventoryItem';

const ADD_ITEM=gql`
mutation AddItem($itemName: string, $capacity: number, $categoryKey: string){
  addItem(itemName: $itemName, capacity: $capacity, categoryKey: $categoryKey)
}
`

const folderBackgroundFragmentStyle = StyleSheet.create({
    
})


export const FolderBackdropListFragment = (props: any) => {
    
    const nameInfo: FolderBackdropTextInputFieldArgument = {
        title: "Item Name",
        hint: "My food is called..."
    }

    const typeInfo: FolderBackdropTextInputFieldArgument = {
        title: "Type",
        hint: "The type of my food is..."
    }

    const expireInfo: FolderBackdropTextInputFieldArgument = {
        title: "Expiration Date",
        hint: "My food expires on..."
    }

    const buttonInfo: FolderBackdropActionButtonArgument = {
        title: "Add Item"
    }

    const [checkboxValue, checkboxUI] = useState(false);
    const [itemName, itemNameFunc] = useState("");
    const [itemType, itemTypeFunc] = useState("");
    const [itemExpirationDate, itemExpirationDateFunc] = useState("");

    const [addItem, {loading, error}] = useMutation(ADD_ITEM);
    const addItemHandler=(item: InventoryItem) => {
      console.log("Adding item " + item.text + " to the database");
      addItem({variables: {"itemName":item.text, "capacity":item.capacity, "categoryKey":item.categoryKey}});
      props.goBack(false);
      
    }

    return (
        <View style = {{
            width: "100%",
            position: "absolute",
            bottom: 0
        }}>
            <View style = {[folderCommonStyles.column]}>

                {/* Title row with folder cutout */}
                <View style = {[folderCommonStyles.row]}>
                    <View style = {[folderBackdropListFragmentStyles.corner]}>

                    </View>
                    <Text style = {[folderBackdropListFragmentStyles.text]}>
                        {"               "}
                    </Text>
                    <View style = {[folderBackdropListFragmentStyles.triangle]}>

                    </View>
                </View>

                <View style = {[folderBackdropListFragmentStyles.container]}>
                    <FolderBackdropTextInputField backRefFunction={itemNameFunc} info={nameInfo}/>

                    <FolderBackdropTextInputField backRefFunction={itemTypeFunc} info={typeInfo}/>

                    <FolderBackdropTextInputField backRefFunction={itemExpirationDateFunc} info={expireInfo}/>
                    
                    <View style = {[folderCommonStyles.row, {marginTop: 40, justifyContent: "center"}]}>
                        <Checkbox
                        style = {{
                            padding: 15,
                            backgroundColor: "white"
                        }}
                        value={checkboxValue}
                        onValueChange = {checkboxUI}
                        >
                        </Checkbox>

                        <Text style = {{
                            fontSize: 19,
                            marginTop: 3,
                            paddingLeft: 20
                        }}>
                            {"Add to \"do not use\" list"}
                        </Text>
                    </View>

                    <FolderBackdropActionButton info = {buttonInfo} buttonFunction={addItemHandler} argument={new InventoryItem(itemName, itemType, itemExpirationDate, "test")}/>

                </View>
            </View>
        </View>
    )
}

const folderBackdropListFragmentStyles = StyleSheet.create({
    corner: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius: 20
    },

    text: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        height: 40,
        paddingTop: 10,
        color: "white",
        fontSize: 20
    },

    container: {
        borderTopRightRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingBottom: 40
    },

    triangle: {
        width:30,
        height:40,
        borderRightWidth:40,
        borderRightColor:"transparent",
        borderBottomWidth:40,
        borderBottomColor:'rgba(255, 255, 255, 0.7)'
    }

})