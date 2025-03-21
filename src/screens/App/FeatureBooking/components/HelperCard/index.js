import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { LargeText, RegularText, RowWrapper, RowWrapperBasic, Spacer } from '../../../../../components'
import { Icons } from '../../../../../assets'
import { Image } from '../../../../../core_ui'
import { colors, fontFamily, fontSize } from '../../../../../constants'
import { Icon } from 'react-native-elements';
import { appStyles } from '../../../../../utilities'

export const HelperCard = ({ onPress, count = 2, setCount }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.card}>
            <RowWrapper style={styles.row}>
                <RowWrapperBasic>
                    <Image style={{ height: 24, width: 24 }} src={Icons['Helper']} />
                    <Spacer isBasic horizontal />
                    <Text style={styles.text}>{`${count} Helper`}</Text>
                </RowWrapperBasic>
                <RowWrapperBasic>
                    <TouchableOpacity
                        onPress={() => count > 2 && setCount(count - 1)}
                        style={styles.btn}>
                        <LargeText>-</LargeText>
                    </TouchableOpacity>
                    <LargeText>{count}</LargeText>
                    <TouchableOpacity
                        onPress={() => count < 15 && setCount(count + 1)}
                        style={styles.btn}>
                        <LargeText>+</LargeText>
                    </TouchableOpacity>
                </RowWrapperBasic>
            </RowWrapper>
        </TouchableOpacity>
    )
}

export const HelperPriceCard = ({ title, value }) => {
    return (
        <>
            <Spacer isBasic />
            <Spacer isSmall />
            <RowWrapper>
                <Text style={styles.priceCardText}>{title}</Text>
                <Text style={styles.priceCardText}>{value}</Text>
            </RowWrapper>
        </>
    )
}
export const HelperTotalCard = ({ title, value }) => {
    return (
        <>
            <Spacer isBasic />
            <Spacer isSmall />
            <RowWrapper>
                <Text style={styles.priceCardTotal}>{title}</Text>
                <Text style={styles.priceCardTotal}>{value}</Text>
            </RowWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.appBgColor1,
        borderRadius: 8,
        ...appStyles.shadow,
        paddingVertical: 16,
        marginHorizontal: '5%'
    },
    row: {
        marginStart: 16,
        marginEnd: 10
    },
    text: {
        color: colors.appTextColor31,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium
    },
    btn: {
        height: 24, width: 24,
        backgroundColor: '#F9FAFA',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    },
    priceCardText: {
        fontSize: fontSize.medium,
        fontFamily: fontFamily.appTextLight,
        color: colors.appTextColor16

    },
    priceCardTotal: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextBold,
        color: colors.appTextColor16
    },
})