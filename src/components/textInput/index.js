import React from 'react'
import { TouchableOpacity, TextInput, View, TextStyle, ViewStyle, Text } from "react-native";
import { ComponentWrapper, Wrapper, RowWrapperBasic } from '../wrappers';
import { InputTitle, RegularText, SmallText, TinyText } from '../text';
import { Spacer } from "../spacers";
import * as Animatable from 'react-native-animatable'
import { height, width } from 'react-native-dimension';
import { styles } from './styles';
import { colors, sizes } from '../../constants';
import { appStyles } from '../../utilities';
import { Icon } from 'react-native-elements';


export const TextInputBordered = ({ autoFocus, iconName, error, onPressRight, iconType, required, left, onPress, content, keyboardType, title, isButton, titleStyle, placeholder, editable, animation, multiline, onFocus, buttonContentStyle, onBlur, onChangeText, rightStyle, secureTextEntry, value, iconColor, iconSize, containerStyle, inputContainerStyle, onPressIcon, inputStyle, right, iconStyle }) => {
    var focused = false
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
        >
            {
                title ?
                    <Wrapper style={{ marginStart: width(.5) }}>
                        <InputTitle style={[titleStyle, { marginBottom: 8 }]}>
                            {title}
                            {required ?
                                <RegularText style={{ color: colors.appTextColor2 }}> *</RegularText>
                                : null
                            }
                        </InputTitle>
                    </Wrapper>
                    :
                    null
            }
            <Wrapper animation={animation} style={[styles.textInputBorderedContainer, containerStyle]}>

                <RowWrapperBasic style={[{
                    borderRadius: sizes.inputRadius,
                    borderWidth: 0,
                    borderColor: colors.appTextColor5
                }, inputContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <View style={{ flex: 8 }}>
                        {
                            isButton ?
                                content ?
                                    content
                                    :
                                    <ComponentWrapper style={[{}, buttonContentStyle]}>
                                        <RegularText color={colors.appTextColor5} >{value ? value : placeholder}</RegularText>
                                    </ComponentWrapper>
                                :
                                <TextInput
                                    autoFocus={autoFocus}
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    multiline={multiline}
                                    placeholderTextColor={'#A5A5A5'}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputField, {}, inputStyle]}
                                />
                        }</View>
                    {
                        right ?
                            <TouchableOpacity activeOpacity={.5}
                                style={[{ height: height(4), paddingHorizontal: 12 }, rightStyle]}
                                onPress={onPressRight}>
                                {right}
                            </TouchableOpacity>
                            :
                            iconName ?
                                <View style={{ padding: 12, alignItems: 'center' }}>
                                    <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor2} iconStyle={iconStyle} onPress={onPressIcon} />
                                </View>
                                :
                                null
                    }

                </RowWrapperBasic>
            </Wrapper>
            {
                error ?
                    <ComponentWrapper style={{ marginLeft: width(0) }} animation="shake">
                        <Spacer height={sizes.TinyMargin} />
                        <SmallText>{error}</SmallText>
                    </ComponentWrapper>
                    :
                    null
            }
        </TouchableOpacity >
    );
}

export const TextInputSearch = ({ autoFocus, right, left, editable, onPress, placeholder, onChangeText, value, onPressSearch, animation, containerStyle, isButton }) => {
    return (
        <TextInputBordered
            autoFocus={autoFocus}
            onPress={onPress}
            editable={editable}
            containerStyle={[{ borderWidth: 0, height: height(5), }, containerStyle]}
            inputContainerStyle={styles.textInputSearch}
            placeholderTextColor={colors.appTextColor5}
            placeholder={placeholder ? placeholder : "Search..."}
            onChangeText={onChangeText}
            value={value}
            animation={animation}
            disabled
            isButton={isButton}
            rightStyle={{ height: null }}
            left={left ? left : <Icon name="search" type="feather" size={18} color={colors.appIcon14} style={{ marginLeft: 10 }} />}
            right={right}
        />

    )
}



