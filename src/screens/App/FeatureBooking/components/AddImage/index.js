import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { Wrapper } from '../../../../../components'
import { height, width } from 'react-native-dimension'
import { colors } from '../../../../../constants'

export const AddImage = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={.7}
            style={styles.addImageWrapper}
            onPress={onPress}
        >
            <Icon type='feather' name='plus' color={colors.appButton1} size={32} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    addImageWrapper: {
        // marginTop: 16,
        backgroundColor: colors.appBgColor9,
        height: width(16),
        width: width(16),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10

    }
})