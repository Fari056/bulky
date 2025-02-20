import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { PrimaryImage, Spacer } from '../../../components'
import { Images } from '../../../utilities'
import { height, width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
const ImagePreview = ({ navigation }) => {
  const { goBack } = navigation
  return (
    <View>

        <Icon containerStyle={styles.backIcon} name='chevron-back' type='ionicon' onPress={() => goBack()} />

      <FlatList
        data={[Images.bed1, Images.bed3, Images.bed4, Images.bed1,]}
        ItemSeparatorComponent={() => <Spacer isBasic />}
        ListHeaderComponent={() => <Spacer isBasic />}
        contentContainerStyle={{ alignItems: 'center' }}
        pagingEnabled={true}
        horizontal

        renderItem={({ item }) => {
          return (
            <View>
              <PrimaryImage source={item} styles={styles.img} />
            </View>
          )
        }} />
    </View>

  )
}

export default ImagePreview
const styles = StyleSheet.create({
  img: {
    height: height(100),
    width: width(100),
    // marginHorizontal: 10
  },
  backIcon: {
    marginTop: height(2.5),
    marginLeft: width(5),
    alignSelf: 'flex-start'
  }
})