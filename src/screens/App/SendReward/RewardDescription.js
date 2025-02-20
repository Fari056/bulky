import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentWrapper, MediumText, RegularText, Spacer } from '../../../components'
import { Strings } from '../../../constants/strings.js'
import { colors } from '../../../constants'
import{totalSize} from 'react-native-dimension'
const RewardDescription = () => {
  return (
   <ComponentWrapper>
    <Spacer isBasic />
    <RegularText style={styles.description} >{Strings.rewardDescription}</RegularText>
    <Spacer isSmall />
    <MediumText>Note: </MediumText>
    <Spacer isSmall />
    <RegularText style={styles.description} >{Strings.rewardNote}</RegularText>
   </ComponentWrapper>
  )
}

export default RewardDescription

const styles = StyleSheet.create({
    description:{
       color:colors.appTextColor2 ,
       textAlign:'justify',
       lineHeight:18,
    }
})