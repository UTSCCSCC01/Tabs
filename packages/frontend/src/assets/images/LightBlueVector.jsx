import React from "react"
import Svg, { Path } from "react-native-svg"
import { Text, View, StyleSheet, Button, TextInput, Dimensions } from 'react-native';

const SvgComponentLightBlue = (props) => (
  <Svg
  width={Dimensions.get('screen').width}
  height={1.4*Dimensions.get('screen').height}

  viewBox={"0 0 " + 0.96*(Dimensions.get('screen').width) +" " +0.9*(Dimensions.get('screen').height)}
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
    {...props}
  >
     <Path
      d="M97.557 0H22.045C8.2 0-3 5.549-3 12.331v389.446c0 6.782 8.065 5.016 21.909 5.016h336.529c13.844 0 17.528 1.766 17.528-5.016V22.07c0-6.782 1.324-9.739-12.52-9.739H122.728L97.558 0Z"
      fill="#B8D6DC"
    />
  </Svg>
)

export default SvgComponentLightBlue
