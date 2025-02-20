import { StyleSheet } from "react-native";
import { height, width, totalSize } from 'react-native-dimension'
import { colors, sizes } from "../../constants";
export const styles = StyleSheet.create({
    textInputBorderedContainer: {
        borderWidth: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.appTextColor5,
        // marginHorizontal: sizes.marginHorizontal,
        height: height(6),
        borderRadius: 10,
        borderColor: colors.appBorder2,
        backgroundColor: colors.appBgColor2
        // borderBottomColor: colors.appBorder1,
    },
    textInputSearch: {
        // marginHorizontal: width(5),
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: colors.bgColor1,
        borderRadius: 8,
        height: height(5),
        // paddingStart: 10,
        // borderWidth: 1,
        // borderColor: colors.appBorder2
    }

})