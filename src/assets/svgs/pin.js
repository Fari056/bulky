import * as React from "react"
import Svg, { Path, G, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function Pin({ size = 150 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 230 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    // {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115 230c63.513 0 115-51.487 115-115S178.513 0 115 0 0 51.487 0 115s51.487 115 115 115z"
        fill="#0109C8"
        fillOpacity={0.1}
      />
      <G filter="url(#filter0_d_56_6961)" clipRule="evenodd">
        <Path
          fillRule="evenodd"
          d="M115.5 144c15.74 0 28.5-12.76 28.5-28.5S131.24 87 115.5 87 87 99.76 87 115.5 99.76 144 115.5 144z"
          fill="#0109C8"
        />
        <Path
          d="M115.5 144c15.74 0 28.5-12.76 28.5-28.5S131.24 87 115.5 87 87 99.76 87 115.5 99.76 144 115.5 144z"
          stroke="#fff"
          strokeWidth={2}
        />
      </G>
      <Path
        d="M129.838 106.94l-13.094 23.33c-.248.487-.662.73-1.243.73-.073 0-.182-.014-.327-.042a1.321 1.321 0 01-.774-.469 1.276 1.276 0 01-.295-.824l.295-12.356-13.009-3.456a1.41 1.41 0 01-.861-.282 1.255 1.255 0 01-.491-.741 1.297 1.297 0 01.087-.876c.131-.278.342-.487.632-.626l27.205-6.182c.189-.097.4-.146.633-.146.392 0 .719.132.981.396.218.195.352.435.403.72.051.285.004.56-.142.824z"
        fill="#fff"
      />
      <Defs></Defs>
    </Svg>
  )
}

export default Pin
