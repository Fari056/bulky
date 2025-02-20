import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ComponentWrapper, IconWithText, MediumText, RowWrapper } from '../../../components'
import { Images, fontFamily } from '../../../utilities'
import { height, width } from 'react-native-dimension'
import { colors } from '../../../constants'

const ItemDetails = ({ title, subTitle, source, iconName, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={.7} onPress={onPress}>

            <ComponentWrapper>
                <RowWrapper style={styles.rowWrapper}>
                    <MediumText style={styles.title}>{title}</MediumText>
                    <IconWithText text={subTitle} customIcon={source} textstyle={styles.text} iconName={iconName} iconType={'material-community'} />

                </RowWrapper>
            </ComponentWrapper>
        </TouchableOpacity>
    )
}

export default ItemDetails

const styles = StyleSheet.create({
    text: {
        fontFamily: fontFamily.appTextMedium,
        color: colors.appTextColor2
    },
    rowWrapper: {
        marginHorizontal: 0,
        marginVertical: height(1)
    },
    title: {
        width: width(30)
    }
})