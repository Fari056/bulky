import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function Pin2(props) {
    return (
        <Svg
            width={53}
            height={73}
            viewBox="0 0 53 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* <G filter="url(#filter0_f_56_7059)">
                <Rect
                    x={13}
                    y={52}
                    width={26}
                    height={10}
                    rx={3.5}
                    fill="#B3B3B3"
                    fillOpacity={0.8}
                />
            </G> */}
            <G filter="url(#filter1_d_56_7059)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.224 52c1.95 0 11.238-11.665 13.529-15.38 3.52-5.712 5.694-9.091 5.694-15.396C45.447 10.607 36.84 2 26.223 2 15.608 2 7 10.607 7 21.224c0 6.338 2.014 9.694 5.523 15.396C14.969 40.594 24.273 52 26.223 52z"
                    fill="#AB0000"
                />
                <Path
                    d="M26.224 53c.346 0 .659-.121.889-.234.247-.122.5-.285.75-.468.499-.366 1.069-.873 1.674-1.463 1.214-1.184 2.653-2.786 4.088-4.487 2.863-3.393 5.795-7.283 6.979-9.203l.272-.442c3.36-5.446 5.571-9.03 5.571-15.48C46.447 10.055 37.393 1 26.223 1 15.055 1 6 10.054 6 21.224c0 6.642 2.157 10.21 5.671 15.92 1.264 2.054 4.242 5.946 7.13 9.308 1.447 1.685 2.893 3.263 4.112 4.427.607.58 1.179 1.077 1.68 1.436.25.179.502.339.749.457.23.11.54.228.882.228z"
                    stroke="#fff"
                    strokeWidth={2}
                />
            </G>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.224 30.835a9.612 9.612 0 100-19.223 9.612 9.612 0 000 19.223z"
                fill="#fff"
            />
            <Defs></Defs>
        </Svg>
    )
}

export default Pin2
