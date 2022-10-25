import { Button, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { folderCommonStyles } from "./FolderCommonStyles"

export interface FolderBackdropActionButtonArgument {
    title: string
}

interface FolderBackdropActionButtonArgumentFields {
    info: FolderBackdropActionButtonArgument
}

/**
 *  Button styled for a folder backdrop
 * 
 *  @name FolderBackdropActionButton
 *  @param info Title of the button
 *  @param buttonFunction Callback function
 *  @param argument Argument to pass into callback function
 */
export const FolderBackdropActionButton = ({info, buttonFunction, argument}: {info: FolderBackdropActionButtonArgument, buttonFunction:Function, argument:any}) => {
    console.log("I AM MAKIMA's DOG")
    console.log(JSON.stringify(argument))
    return (
        <View style = {[folderCommonStyles.row, {
            justifyContent: "center",
            width: "100%",
            marginTop: 30
        }]}>
           <TouchableOpacity style = {{
                padding: 6,
                backgroundColor: "#127589",
                borderRadius: 30,
                paddingRight: 70,
                paddingLeft: 70,
                width: "100%",
                minWidth: 300,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 80,
                
                
                
           }}
           onPress={() => {console.log("OOH LA LA... you touch my tralala");buttonFunction()}}>
                <Text style = {{
                    color: "white",
                    fontSize: 28
                }}>
                    {info.title}
                </Text>
           </TouchableOpacity>
        </View>
    )
}