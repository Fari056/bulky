import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonWithIcon, ComponentWrapper, IconWithText, MediumText, RegularText, RowWrapper, Spacer, Wrapper } from '../../../components'
import { colors, fontFamily } from '../../../constants'
import { height, width, totalSize } from 'react-native-dimension'
import { Images } from '../../../utilities'
const ItemsWeight = () => {
  return (
    <ComponentWrapper>
            <Spacer isSmall />
            <MediumText>Weight</MediumText>
            <Spacer isSmall />
            <Wrapper activeOpacity={0.7} style={styles.container}>
                    <IconWithText text={'400 Kg'} textstyle={styles.bed} iconName={'weight-kilogram'} iconType={'material-community'} />
            </Wrapper>
        </ComponentWrapper>
  )
}

export default ItemsWeight

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