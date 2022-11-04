import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { Dimensions } from 'react-native';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: SvgProps) => (
<Svg
width={Dimensions.get('screen').width}
height={1.4*Dimensions.get('screen').height}

viewBox={"0 0 " + 0.96*(Dimensions.get('screen').width) +" " +0.9*(Dimensions.get('screen').height)}
fill="none"

preserveAspectRatio="none"
  {...props}
>
   <Path
    d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd"
  />
</Svg>
)


export default SvgComponent
