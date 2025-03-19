import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconWithText, MediumText, RegularText, RowWrapper, RowWrapperBasic, SmallText, Spacer, Wrapper } from '../../../../../components'
import { Icons } from '../../../../../assets'
import { Image } from '../../../../../core_ui'
import { colors, fontFamily, fontSize } from '../../../../../constants'
import { Icon } from 'react-native-elements';

export const SummeryProductCard = ({ title, onPress, item }) => {
    const icon = Icons[title]
    return (
        <Wrapper style={styles.card}>
            <RowWrapper style={styles.row}>
                <RowWrapperBasic>
                    <Image style={{ height: 24, width: 24 }} src={icon} />
                    <Spacer isSmall horizontal />
                    <MediumText color={colors.appTextColor2}>{title}</MediumText>
                </RowWrapperBasic>
            </RowWrapper>
            <Spacer isSmall />
            <RegularText style={styles.text}>
                {item?.selectedItem?.title} {item.size} size, quantity ( {item?.selectedItem?.qty ?? '1'} )
            </RegularText>
        </Wrapper>
    )
}

export const SummeryTitleCard = ({ title, onPress }) => {
    return (
        <>
            <Spacer isBasic />
            <RowWrapper>
                <Text style={styles.sumeryTitle}>{title}</Text>
                <TouchableOpacity activeOpacity={.6} onPress={onPress}>
                    <Icon name='edit' type='material' color={colors.appButton1} size={20} />
                </TouchableOpacity>
            </RowWrapper>
            <Spacer isBasic />
        </>
    )
}

export const SummeryHelperCard = ({ onPress, count = 2 }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={.7}
            style={styles.card}>
            <RowWrapper style={styles.row}>
                <RowWrapperBasic>
                    <Image style={{ height: 30, width: 30 }} src={Icons['Helper']} />
                    <Spacer isBasic horizontal />
                    <Wrapper>
                        <Text style={styles.helperText}>{`${count} Helper`}</Text>
                        <Text style={styles.helperText2}>Donec vestibulum, velit sit amet elit dapibus rutrum, elit felis</Text>
                    </Wrapper>
                </RowWrapperBasic>
            </RowWrapper>
        </TouchableOpacity>
    )
}
export const SummeryDateTimeCard = ({ onPress, count = 2, date, time }) => {
    return (
        <Wrapper style={styles.timeWrapper}>
            <RowWrapper style={styles.row}>
                <IconWithText
                    iconColor={colors.appIcon10}
                    text={date}
                    iconSize={20}
                    iconName={'calendar'} iconType={'feather'}
                    color={colors.appTextColor2}
                />
                <IconWithText
                    iconColor={colors.appIcon10}
                    iconSize={20}
                    text={time}
                    iconName={'clock'} iconType={'feather'}
                    color={colors.appTextColor2}
                />
            </RowWrapper>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.appBgColor14,
        borderRadius: 8,
        paddingVertical: 15,
        marginHorizontal: '5%'
    },
    row: {
        marginStart: 12,
        marginEnd: 10
    },
    text: {
        color: colors.appTextColor2,
        width: '70%',
        marginStart: 12,
        fontFamily: fontFamily.appTextLight
    },
    helperText2: {
        color: colors.appTextColor2,
        width: '70%',
        marginTop: 8,
        fontFamily: fontFamily.appTextLight
    },
    sumeryTitle: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium,
        color: colors.appTextColor16
    },
    helperText: {
        color: colors.appTextColor31,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.appTextMedium
    },
    timeWrapper: {
        backgroundColor: colors.appBgColor14,
        marginHorizontal: '5%',
        paddingVertical: 10,
        borderRadius: 10
    }
})