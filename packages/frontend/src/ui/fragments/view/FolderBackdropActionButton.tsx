import { Button, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { folderCommonStyles } from "./FolderCommonStyles"

export interface FolderBackdropActionButtonArgument {
    title: string
}

interface FolderBackdropActionButtonArgumentFields {
    info: FolderBackdropActionButtonArgument
}

export const FolderBackdropActionButton = ({info, buttonFunction, argument}: {info: FolderBackdropActionButtonArgument, buttonFunction:Function, argument:any}) => {
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
           onPress={() => {buttonFunction(argument)}}>
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