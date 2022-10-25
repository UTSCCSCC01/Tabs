import React from 'react'
import { ViewStyle } from 'react-native'
import Svg, {Path} from 'react-native-svg'

interface folderSVGProps {
    color?: string,
    width?: number,
    height?: number,
    style?: ViewStyle
}

const FolderIcon = ({color = 'white', width = 375, height = 275, style={}} : folderSVGProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 375 275" fill={color} opacity={'50%'}>
            <Path d="M99.5571 0H24.0449C10.201 0 -0.999995 3.74931 -0.999995 8.33181L-1 271.471C-1 276.053 7.0649 274.86 20.9088 274.86H357.438C371.282 274.86 374.966 276.053 374.966 271.471V37.4501V14.9123C374.966 10.3298 376.29 8.33181 362.446 8.33181H124.728L99.5571 0Z" fill={color}/>
        </Svg>
    )
}

export default FolderIcon