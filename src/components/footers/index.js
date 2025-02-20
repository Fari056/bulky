import { StyleSheet, View } from "react-native"
import { AbsoluteWrapper, Wrapper } from "../wrappers"
import { colors } from "../../constants"
import { ButtonBorderd, ButtonColored } from ".."
import { height, width, totalSize } from 'react-native-dimension'

export const CameraFooter = ({ onPress }) => {
    return (
        <Wrapper style={styles.cameraFooter}>
            <ButtonColored text="ADD REVIEW" onPress={onPress} />
        </Wrapper>
    )
}
export const SendRewardFooter = ({ onPressColored, onPressBordered }) => {
    return (
        <>
            <View style={styles.absoluteColored}>
                <ButtonColored text="SEND TIP" onPress={onPressColored} />
            </View>
            <ButtonBorderd text="BACK TO HOME" style={styles.absoluteBordered} onPress={onPressBordered} />
        </>
    )
}
const styles = StyleSheet.create({
    cameraFooter: {
        backgroundColor: colors.appBgColor1,
        padding: totalSize(2.5)
    },
    absoluteBordered: {
        position: 'absolute',
        bottom: height(12),
        left: width(5),
        right: width(5)
    },
    absoluteColored: {
        position: 'absolute',
        bottom: height(3),
        left: width(5),
        right: width(5),
    }
})