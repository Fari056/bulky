import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { PrimaryImage, Spacer } from '../../../components'
import { Images } from '../../../utilities'
import { height, width, totalSize } from 'react-native-dimension'

const ImagesList = ({ onPressImg }) => {
    return (
        <FlatList
            data={[Images.bed1, Images.bed3, Images.bed4, Images.bed1,]}
            numColumns={2}
            ItemSeparatorComponent={() => <Spacer isBasic />}
            ListHeaderComponent={() => <Spacer isBasic />}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity activeOpacity={0.7} onPress={onPressImg}>
                        <PrimaryImage resizeMode={'cover'} source={item} styles={styles.img} />
                    </TouchableOpacity>
                )
            }} />
    )
}

export default ImagesList

const styles = StyleSheet.create({
    img: {
        height: height(22),
        width: width(43),
        marginHorizontal: 10
    }
})