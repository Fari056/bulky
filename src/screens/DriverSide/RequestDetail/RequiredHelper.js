import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonWithIcon, ComponentWrapper, IconWithText, MediumText, RegularText, RowWrapper, Spacer, Wrapper } from '../../../components'
import { colors, fontFamily } from '../../../constants'
import { height, width, totalSize } from 'react-native-dimension'
import { Images } from '../../../utilities'

const RequiredHelper = ({ onPressChat, requestAccepted }) => {
    return (
        <ComponentWrapper>
            <Spacer isSmall />
            <MediumText>Required Helper</MediumText>
            <Spacer isSmall />
            <TouchableOpacity activeOpacity={0.7} style={styles.container}>
                <RowWrapper style={styles.removeMargin}>
                    <IconWithText text={'1 Helper'} textstyle={styles.bed} customIcon={Images.userGroup} />
                    {requestAccepted &&
                        <ButtonWithIcon buttonStyle={[styles.iconButtons, {}]} iconName={'chatbubble-ellipses'} iconType={'ionicon'} iconColor={colors.appIcon5} iconSize={totalSize(2.7)} onPress={onPressChat} />
                    }
                </RowWrapper>
                <Spacer isSmall />
                <RegularText color={colors.appTextColor2}>Lorem ipsum dolor sit amet nsectetur adipiscing elit</RegularText>
            </TouchableOpacity>
        </ComponentWrapper>
    )
}

export default RequiredHelper

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.appBorder11,
        padding: totalSize(1.3),
        borderRadius: totalSize(1)
    },
    bed: {
        color: colors.appTextColor2,
        fontFamily: fontFamily.appTextMedium,
        fontSize: totalSize(1.6)
    },
    removeMargin: {
        marginHorizontal: 0
    },
    iconButtons: {
        height: height(4.3),
        width: height(4.3),
        borderRadius: height(2.15),
        backgroundColor: colors.appButton4,
    },
})