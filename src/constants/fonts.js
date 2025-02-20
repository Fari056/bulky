import { totalSize } from "react-native-dimension"

const fontFamily = {
    appTextLight: 'Brother1816-Light', // 300
    appTextRegular: 'Brother1816-Regular', // 400
    appTextMedium: 'Brother1816-Medium', // 500
    appTextBold: 'Brother1816-Bold', //700
    appTextExtraBold: 'Brother1816-ExtraBold', // 800
    appTextExtraBlack: 'Brother1816-Black', // 900
}

const fontSize = {
    h1: totalSize(4.5),
    h2: totalSize(4),
    h3: totalSize(3.5),
    h4: totalSize(3),
    h5: totalSize(2.5),
    h6: totalSize(2),
    input: totalSize(1.75),
    large: totalSize(2),
    medium: totalSize(1.75),
    regular: totalSize(1.5),
    small: totalSize(1.25),
    tiny: totalSize(1)
}
export { fontSize, fontFamily } 