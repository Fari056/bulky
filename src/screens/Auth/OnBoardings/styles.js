import { StyleSheet } from 'react-native'
import { height, width } from 'react-native-dimension'
import { colors } from '../../../constants'


export const styles = StyleSheet.create({
    skipText: {
        alignSelf: 'flex-end',
        marginRight: width(5),
        marginTop: height(3),
        color: colors.appTextColor3
    },
    skipText: {
        position: "absolute",
        top: height(3),
        right: width(5),
        color: colors.appTextColor3,
    },
    gradientWrapper: {
        flex: 1,
        width: width(100),
    },
    title: {
        color: colors.appTextColor3,
        alignSelf: "center",
        textAlign: "center",
        marginHorizontal: width(5),
        position: "absolute",
        bottom: height(27),
    },
    description: {
        color: colors.appTextColor4,
        alignSelf: "center",
        textAlign: "center",
        marginHorizontal: width(5),
        lineHeight: 18,
        position: "absolute",
        bottom: height(19),
    },
    indicator: {
        height: height(1.5),
        width: height(1.5),
        backgroundColor: colors.appBgColor3,
        marginHorizontal: 3,
        borderRadius: height(0.75),
    },
    selectedIndicator: {
        backgroundColor: colors.appBgColor4,
        height: height(1.8),
        width: height(1.8),
        borderRadius: height(0.9),
    },
    indicatorContainer: {
        bottom: height(14),
        right: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})