import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Animated, View, ActivityIndicator } from "react-native"
// import { appStyles, colors } from '../../services'
import { width, height, totalSize } from 'react-native-dimension'
import { RowWrapper, RowWrapperBasic, Wrapper } from '../wrappers'
import { Spacer } from '../spacers'
import { useState } from 'react'
import { useRef } from 'react'
import { colors, fontFamily, fontSize } from '../../constants'
import { appStyles } from '../../utilities'
import { IconWithText, RegularTextBlack, SmallText } from '..'
import { Icon } from 'react-native-elements'

export const ButtonBorderd = ({ text = '', onPress, bgColor, background, icon, textColor, style, isLoading }) => {
    return (
        <TouchableOpacity activeOpacity={.5}
            disabled={isLoading}
            style={[styles.buttonBorder, { backgroundColor: bgColor ?? null, borderColor: background ?? colors.appBorder1 }, style]}
            onPress={onPress}>
            {icon ? <RowWrapperBasic >
                {icon}
                <Spacer isSmall horizontal />
                <Text style={[styles.borderdButtonText, { color: textColor ?? colors.appTextColor1 }]}>{text}</Text>
            </RowWrapperBasic>
                : isLoading ? <ActivityIndicator color={colors.appTextColor3} />
                    : <Text style={[styles.borderdButtonText, { color: textColor ?? colors.appTextColor1 }]}>{text}</Text>}
        </TouchableOpacity>
    )
}

export const ButtonColored = ({ text = '', onPress, disabled, background, textColor, animation, duration, withIcon, style, isLoading, testStyle }) => {
    return (
        <Wrapper animation={animation} duration={duration} >
            <TouchableOpacity activeOpacity={.8}
                disabled={disabled || isLoading}
                style={[styles.buttonColored, { backgroundColor: background ? background : disabled ? colors.appButton2 : colors.appButton1, }, style]}
                onPress={onPress}>
                {withIcon ? <RowWrapperBasic >
                    <Spacer isSmall horizontal />
                    <Text style={[styles.coloredButtonText, { color: textColor ?? colors.appTextColor3 },]}>{text}</Text>
                </RowWrapperBasic>
                    :
                    isLoading ? <ActivityIndicator color={colors.appTextColor3} />
                        : <Text style={[styles.coloredButtonText, { color: textColor ?? colors.appTextColor3 }, testStyle]}>{text}</Text>}
            </TouchableOpacity>
        </Wrapper>
    )
}

export const SelectableButtons = ({ buttons, onClick, animatedBtnStyle, btnStyle }) => {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateXOpposit = translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const onPress = i => {
        onClick(i + 1)
        Animated.spring(translateX, {
            toValue: i * btnWidth,
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    };
    return (
        <View
            style={[styles.btnContainer, btnStyle]}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={() => onPress(i)}>
                    <Text style={styles.btnTextInactive}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    { width: btnWidth, transform: [{ translateX }] }, animatedBtnStyle
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }], animatedBtnStyle },
                        ]}>
                        <Text style={styles.btnTextActive}>{btn}</Text>
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
}

export const RadioButton = ({ onPress, active, title, titleStyle, style }) => {
    return (
        <TouchableOpacity activeOpacity={.9} onPress={onPress}>
            <RowWrapperBasic>
                {!active && <Wrapper style={[styles.radioInActive, style]} />}
                {active && <Wrapper style={[styles.radioActive, style]} >
                    <Wrapper style={styles.radioActiveInner} />
                </Wrapper>}
                <Spacer horizontal isSmall />
                <RegularTextBlack style={titleStyle}>{title}</RegularTextBlack>
            </RowWrapperBasic>
        </TouchableOpacity>
    )
}

export const DueButtons = ({ onBack, text, onPress, disabled, isLoading }) => {
    return (
        <Wrapper style={styles.dueButtons}>
            <RowWrapper>
                <TouchableOpacity
                    onPress={onBack}
                    style={styles.dueBordered}>
                    <Text style={styles.dueBorderedText}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={isLoading || disabled}
                    onPress={onPress}
                    style={[styles.dueColored, { backgroundColor: disabled ? colors.appBgColor20 : colors.appButton1 }]}>
                    {isLoading ? <ActivityIndicator color={colors.appTextColor3} /> : <Text style={styles.dueColoredText}>{text?.toUpperCase()}</Text>}
                </TouchableOpacity>
            </RowWrapper>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    buttonBorder: {
        height: height(6.5),
        borderRadius: 10,
        ...appStyles.center,
        // marginHorizontal: width(5),
        borderWidth: 1,
    },
    borderdButtonText: {
        fontSize: totalSize(1.75),
        fontFamily: fontFamily.appTextBold,
        fontWeight: '700',
    },
    buttonColored: {
        height: height(6.5),
        borderRadius: 10,
        ...appStyles.center,
        // marginHorizontal: width(5),
    },
    coloredButtonText: {
        fontSize: totalSize(1.7),
        fontFamily: fontFamily.appTextBold,
        fontWeight: '500',
    },
    buttonRounedIcon: {
        height: width(12),
        width: width(12),
        borderRadius: 150,
        // backgroundColor: colors.appButton1,
        // ...appStyles.shadow,
        ...appStyles.center,
    },
    btnContainer: {
        height: 35,
        borderRadius: 100,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: colors.appBgColor1,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.appBorder1
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedBtnContainer: {
        height: 33,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: colors.appButton1,
        borderRadius: 100
    },
    animatedBtn: {
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextActive: {
        color: colors.appTextColor3,
        fontFamily: fontFamily.appTextMedium
    },
    btnTextInactive: {
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextMedium
    },
    radioInActive: {
        height: 24,
        width: 24, borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.appBorder5
    },
    radioActive: {
        height: 24,
        width: 24, borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.appBorder1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioActiveInner: {
        height: 15,
        width: 15,
        borderRadius: 8,
        backgroundColor: colors.appBorder1
    },
    dueButtons: {
        position: 'absolute', bottom: height(2),
        right: 0, left: 0
    },
    dueBordered: {
        borderRadius: 10,
        borderWidth: 1,
        width: width(44),
        height: height(5.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.appBorder1
    },
    dueBorderedText: {
        color: colors.appTextColor1,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.appTextMedium
    },
    dueColored: {
        height: height(5.5),
        width: width(44),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dueColoredText: {
        color: colors.appTextColor3,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.appTextMedium
    }

})