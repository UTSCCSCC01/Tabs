import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, StyleSheet, Button, TextInput, Dimensions } from 'react-native';

const SvgComponent = (props) => {

  return ( 

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
      d="M100.557 0H25.045C11.2 0 0 6.176 0 13.725v433.462c0 7.548 8.065 5.582 21.909 5.582h336.529c13.844 0 17.528 1.966 17.528-5.582V24.565c0-7.55 1.324-10.84-12.52-10.84H125.728L100.557 0Z"
      fill="#106A7C"
    />
  </Svg>
)
  
  
  }

export default SvgComponent