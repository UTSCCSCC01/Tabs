import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponentLightBlue = (props) => (
  <Svg
    width={375}
    height={613}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M100.557 0H25.045C11.2 0 0 8.358 0 18.572v586.561c0 10.215 8.065 7.555 21.909 7.555h336.529c13.844 0 17.528 2.66 17.528-7.555V33.24c0-10.214 1.324-14.668-12.52-14.668H125.728L100.557 0Z"
      fill="#fff"
      fillOpacity={0.7}
    />
  </Svg>
)

export default SvgComponentLightBlue
