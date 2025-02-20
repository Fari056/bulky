import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width, height } from 'react-native-dimension'
import { colors } from '../../constants'
import { LargeText, MediumText } from '..'

export const Hrline = ({ Width, height, color, style }) => {
    return (
        <View style={[{ height: height ?? .5, width: Width ?? width(100), backgroundColor: color ?? colors.appButton1 }, style]} />
    )
}

export const LineWithText = () => {
    return (
        <View style={styles.lineContainer} >
            <View style={styles.line} />
            <MediumText>or</MediumText>
            <View style={styles.line} />
        </View>
    );
}


const styles = StyleSheet.create({
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: height(3.5)
    },
    line: {
        backgroundColor: colors.appBorder3,
        height: 1,
        width: width(40)
    }
})