import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AbsoluteWrapper, Wrapper } from '../wrappers'
import { height, totalSize, width } from 'react-native-dimension'
import { colors, sizes } from '../../constants'
import { appStyles } from '../../utilities'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
export const RoundBgIcon = ({ children, bgColor, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.5} >
            <Wrapper style={[styles.roundWrapper, { backgroundColor: bgColor ?? colors.white20 }, style]}>
                {children}
            </Wrapper>
        </TouchableOpacity>
    )
}

export const ButtonWithIcon = ({ buttonStyle, onPress, shadow, shadowColored, iconSize, iconColor, iconName, iconType, buttonColor, buttonSize, customIcon, iconStyle, disabled }) => {
    const defaultButtonsize = totalSize(5)
    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled}
            style={
                [styles.IconButtonContainer,
                {
                    height: buttonSize ? buttonSize : defaultButtonsize,
                    width: buttonSize ? buttonSize : defaultButtonsize,
                    backgroundColor: buttonColor ? buttonColor : colors.primary
                },
                shadow ? appStyles.shadow : null,
                shadowColored ? appStyles.shadowColored : null,
                    buttonStyle]
            }
        >


            <Icon
                name={iconName ? iconName : "heart"}
                type={iconType ? iconType : "material-community"}
                size={iconSize ? iconSize : sizes.icons.large}
                color={iconColor ? iconColor : colors.appColor1}
                iconStyl={iconStyle}
            />

        </TouchableOpacity>
    );
}

export const CameraButton = ({ buttonStyle, onPress, shadow, shadowColored, iconSize, iconColor, iconName, iconType, buttonColor, buttonSize, customIcon, iconStyle, disabled }) => {
    const defaultButtonsize = totalSize(5)
    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled}
            style={
                [styles.IconButtonContainer,
                {
                    height: buttonSize ? buttonSize : defaultButtonsize,
                    width: buttonSize ? buttonSize : defaultButtonsize,
                    backgroundColor: buttonColor ? buttonColor : colors.primary
                },
                shadow ? appStyles.shadow : null,
                shadowColored ? appStyles.shadowColored : null,
                    buttonStyle]
            }
        >
            <Icon name='camera' type='ionicon' color={colors.appIcon5} size={20} />
        </TouchableOpacity>
    );
}
export const AbsoluteBackBtn = () => {
    const navigation = useNavigation()
    return (
        <AbsoluteWrapper style={styles.backBtnWrapper}>
            <TouchableOpacity style={styles.absoluteBackBtn} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back-outline" type="ionicon" color={colors.appIcon15} size={18} />
            </TouchableOpacity>
        </AbsoluteWrapper>
    )
}


const styles = StyleSheet.create({
    roundWrapper: {
        height: height(5),
        width: height(5),
        // backgroundColor: 'red',
        borderRadius: height(3),
        ...appStyles.center
    },
    IconButtonContainer: {
        height: totalSize(5),
        width: totalSize(5),
        backgroundColor: colors.appColor1,
        borderRadius: 10,
        ...appStyles.center,
        //  ...appStyles.shadow
    },
    backBtnWrapper: {
        top: height(2),
        left: width(5),
    },
    absoluteBackBtn: {
        backgroundColor: colors.appBgColor1,
        height: height(4),
        width: height(4),
        borderRadius: height(2),
        justifyContent: 'center',
        alignItems: 'center'
    }
})