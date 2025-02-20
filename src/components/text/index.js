import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension';
import { Spacer } from '../spacers';
import { RowWrapper, RowWrapperBasic } from '../wrappers';
import { appStyles } from '../../utilities';
import { colors, fontFamily } from '../../constants';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';
import { PrimaryImage } from '..';

// Title Texts
export const XXLTitle = props => {
    return (
        <Text
            style={[styles.xxlTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const XLTitle = props => {
    return (
        <Text
            style={[styles.xlTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const LargeTitle = props => {
    return (
        <Text
            style={[styles.largeTitleStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const MediumTitle = props => {
    return (
        <Text
            style={[styles.mediumTitleStyle, { color: props.color ?? colors.appTextColor1 }, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const SmallTitle = props => {
    return (
        <Text
            style={[styles.smallTitleStyle, { fontFamily: props.fontFamily ?? fontFamily.appTextMedium, color: props.color ?? colors.appTextColor1 }, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const TinyTitle = props => {
    return (
        <Text
            style={[styles.tinyTitleStyle, { fontFamily: props.fontFamily ?? fontFamily.appTextMedium, color: props.color ?? colors.appTextColor2 }, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
// Normal Texts
export const LargeText = props => {
    return (
        <Text
            style={[styles.largeTextStyle, { color: props.color ?? colors.appTextColor2 }, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const MediumText = props => {
    return (
        <Text
            style={[styles.mediumTextStyle, { color: props.color ?? colors.appTextColor2 }, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const RegularText = props => {
    return (
        <Text
            numberOfLines={props.numberOfLines}
            style={[styles.regularTextStyle, { fontFamily: props.fontFamily ?? fontFamily.appTextRegular, color: props.color ?? colors.appTextColor1 }, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const RegularTextBlack = props => {
    return (
        <Text
            numberOfLines={props.numberOfLines}
            style={[styles.regularTextStyle, { fontFamily: props.fontFamily ?? fontFamily.appTextRegular, color: props.color ?? colors.appTextColor2 }, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const SmallText = props => {
    return (
        <Text
            style={[styles.smallTextStyle, { color: props.color ?? colors.appTextColor1 }, props.style]}
            onPress={props.onPress}
            numberOfLines={props.numberOfLines}
        >
            {props.children}
        </Text>
    );
}
export const TinyText = props => {
    return (
        <Text
            style={[styles.tinyTextStyle, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </Text>
    );
}
export const InputTitle = props => {
    return (
        <Text
            style={[styles.inputTitleStyle, props.style]}
        >
            {props.children}
        </Text>
    );
}

export const ButtonTextRegular = props => {
    return (
        <Text
            style={[styles.ButtonTextRegularStyle, props.style]}
        >
            {props.children}
        </Text>
    );
}
export const ButtonTextMedium = props => {
    return (
        <Text
            style={[styles.ButtonTextMediumStyle, props.style]}
        >
            {props.children}
        </Text>
    );
}

export const IconWithText = ({ text, onPress, textstyle, iconName, iconType, iconColor, iconSize, disabled, color, style ,customIcon,imgStyle}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress} activeOpacity={1} style={style}>
            <RowWrapperBasic>
                {customIcon ?
                    <PrimaryImage source={customIcon} size={totalSize(3)} styles={imgStyle}/>
                    :
                    <Icon name={iconName} type={iconType} color={iconColor} size={iconSize} style={{ height: iconSize, width: iconSize }} />
                }
                <Spacer isSmall horizontal />
                <Text style={[styles.mediumTextStyle, { color: color ?? colors.appTextColor1, fontSize: totalSize(1.50), fontFamily: fontFamily.appTextRegular }, textstyle]}>
                    {text}
                </Text>
            </RowWrapperBasic>
        </TouchableOpacity>
    )
}
export const TitleWithOption = ({ title, onPressOption, style, option }) => {
    return (
        <RowWrapper>
            <Text style={[styles.smallTitleStyle, style]}>
                {title}
            </Text>
            {option && <TouchableOpacity onPress={onPressOption}
                activeOpacity={.6}>
                <Text style={[styles.regularTextStyle,
                styles.optionText, style]}>
                    {option}
                </Text>
            </TouchableOpacity>}
        </RowWrapper>
    )
}

const styles = StyleSheet.create({
    xxlTitleStyle: {
        ...appStyles.h1
    },
    xlTitleStyle: {
        ...appStyles.h2
    },
    largeTitleStyle: {
        ...appStyles.h3
    },
    mediumTitleStyle: {
        ...appStyles.h4
    },
    smallTitleStyle: {
        ...appStyles.h5
    },
    tinyTitleStyle: {
        ...appStyles.h6,
        fontFamily: fontFamily.appTextBold,
        // fontWeight: 'bold'
    },
    largeTextStyle: {
        ...appStyles.textLarge
    },
    mediumTextStyle: {
        ...appStyles.textMedium
    },
    regularTextStyle: {
        ...appStyles.textRegular
    },
    smallTextStyle: {
        ...appStyles.textSmall
    },
    tinyTextStyle: {
        ...appStyles.textTiny
    },
    inputTitleStyle: {
        fontSize: 13,
        ...appStyles.textBold,
        ...appStyles.textBlue
    },
    ButtonTextRegularStyle: {
        ...appStyles.ButtonTextRegular,
        color: colors.appColor1
    },
    ButtonTextMediumStyle: {
        ...appStyles.ButtonTextMedium,
        color: colors.appColor1
    },
    textWithDoubleIcons: {
        paddingVertical: height(1.5),
        backgroundColor: colors.appBgColor3,
        borderRadius: 12,
        borderWidth: .5,
        borderColor: colors.appBorder2,
        marginHorizontal: width(5),
    },
    optionText: {
        paddingVertical: 4,
        color: colors.appBgColor2,
        fontFamily: fontFamily.appTextBold
    }
});
