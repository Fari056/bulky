import * as React from "react"
import Svg, { Mask, Path, G, Defs, Pattern, Use, Image } from "react-native-svg"

const SideBar = ({ color = "#1a1a1a" }) => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                d="M4.125 6.375h15.75m-15.75 12h15.75-15.75zm0-6h15.75-15.75z"
                stroke={color}
                strokeWidth={2.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default SideBar
