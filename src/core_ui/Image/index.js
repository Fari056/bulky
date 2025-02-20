import { StyleSheet, Image as RNImage } from 'react-native'
import React from 'react'

export const Image = ({ style, src, uri, resizeMode }) => {
    return (
        <RNImage style={style} resizeMode={resizeMode} source={src ?? { uri: uri }} />
    )
}

export default Image

const styles = StyleSheet.create({})