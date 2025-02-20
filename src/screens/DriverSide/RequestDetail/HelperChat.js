import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonWithIcon, ComponentWrapper, IconWithText, MediumText, PrimaryImage, RegularText, RowWrapper, Spacer, Wrapper } from '../../../components'
import { colors, fontFamily } from '../../../constants'
import { height, width, totalSize } from 'react-native-dimension'
import { Images } from '../../../utilities'
import { Icons } from '../../../assets'

const HelperChat = ({ onPressChat }) => {
    return (
        <ComponentWrapper>
            <Spacer isSmall />
            <MediumText>Helper Chat</MediumText>
            <Spacer isSmall />
            <TouchableOpacity activeOpacity={0.7} style={styles.container}>
                <RowWrapper style={styles.removeMargin}>
                    <IconWithText text={'Aadam Gabriel'} textstyle={styles.title} imgStyle={styles.imgStyle} customIcon={{uri:Images.user2}} />
                    <PrimaryImage size={totalSize(3)} source={Icons.helperGroup} />
                </RowWrapper>
            </TouchableOpacity>
            <Spacer isSmall />

        </ComponentWrapper>
    )
}

export default HelperChat

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.appBorder11,
        padding: totalSize(1.3),
        borderRadius: totalSize(1)
    },
    title: {
        color: colors.appTextColor2,
        fontFamily: fontFamily.appTextMedium,
        fontSize: totalSize(1.6)
    },
    removeMargin: {
        marginHorizontal: 0
    },
   
    imgStyle:{
        height:height(4),
        width:height(4),
        borderRadius:height(2)
    }
})