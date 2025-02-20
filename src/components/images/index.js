import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { totalSize, height, width } from 'react-native-dimension'

export const PrimaryImage = ({ source, styles = {}, size, borderRadius, tintColor, resizeMode }) => {
    let defaultSize = totalSize(15)
    return (
        <Image source={source} resizeMode={resizeMode ? resizeMode : 'contain'}
            style={[{ height: size ?? defaultSize, width: size ?? defaultSize, borderRadius: borderRadius ?? 0, tintColor: tintColor }, styles,]} />
    )
}
export const RoundImage = ({ source, styles = {}, size }) => {
    let defaultSize = totalSize(6)
    return (
        <Image source={source} resizeMode={'contain'}
            style={[{ height: size ?? defaultSize, width: size ?? defaultSize, borderRadius: 150 }, styles]} />
    )
}
export const Avatar = ({ source, styles = {}, size }) => {
    let defaultSize = totalSize(4)
    return (
        <Image source={source} resizeMode={'contain'}
            style={[{ height: size ?? defaultSize, width: size ?? defaultSize, borderRadius: 150 }, styles]} />
    )
}

const styles = StyleSheet.create({})