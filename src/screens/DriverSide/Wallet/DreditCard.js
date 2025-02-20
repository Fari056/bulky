import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../constants'
import { MediumText, PrimaryImage, RowWrapper, RowWrapperBasic, Spacer } from '../../../components'
import { totalSize, height, width } from 'react-native-dimension'
import { Images } from '../../../utilities'
import { Icons } from '../../../assets'

const DebitCard = ({ name = 'Bulky', balance = '15.00' }) => {
  return (
    <LinearGradient colors={colors.gradiant6} style={styles.debitCard}>
      <MediumText color={colors.appTextColor3}>{`${name} Wallet`}</MediumText>
      <Spacer isSmall />
      <RowWrapper style={{ marginHorizontal: width(0) }}>
        <MediumText style={styles.balanceText} >{`$ ${balance}`}</MediumText>
        <RowWrapperBasic >
          <PrimaryImage source={Icons.cardChip} size={totalSize(3)} />
          <PrimaryImage source={Icons.cardMenu} size={totalSize(3)} />
        </RowWrapperBasic>
      </RowWrapper>
      <Spacer isSmall />
      <PrimaryImage source={Images.masterCard} size={totalSize(5)} />
    </LinearGradient>
  )
}

export default DebitCard

const styles = StyleSheet.create({
  debitCard: {
    height: height(20),
    width: width(90),
    alignSelf: 'center',
    borderRadius: totalSize(1.5),
    padding: totalSize(2),
    justifyContent: 'center',
    marginVertical: height(2)
  },
  balanceText: {
    color: colors.appTextColor3,
    fontSize: totalSize(2.5)
  }
})