import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ComponentWrapper, IconWithText, MediumText, RegularText, RowWrapper, Spacer, Wrapper } from '../../../components'
import { colors, fontFamily } from '../../../constants'
import { height, width, totalSize } from 'react-native-dimension'
import { Images } from '../../../utilities'

const ItemForDelivery = ({ onPressCard ,hideTitle}) => {
    return (
        <ComponentWrapper>
            {hideTitle ??
                <MediumText>Items For Delivery</MediumText>
            }
            <Spacer isSmall />
            <TouchableOpacity onPress={onPressCard} activeOpacity={0.7} style={styles.container}>
                <RowWrapper style={styles.removeMargin}>
                    <IconWithText text={'Bed'} textstyle={styles.bed} customIcon={Images.bed} />
                    <IconWithText text={'3'} iconName={'image-inverted'} iconType={'entypo'} iconColor={colors.appIcon10} />
                </RowWrapper>
                <Spacer isSmall />
                <RegularText color={colors.appTextColor2}>Full size, include a mattress, include a box spring</RegularText>
            </TouchableOpacity>
        </ComponentWrapper>
    )
}

export default ItemForDelivery

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
    }
})