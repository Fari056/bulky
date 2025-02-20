import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AbsoluteWrapper, ButtonColored, MainWrapper, MediumTitle, PrimaryImage, RegularText, SmallTitle, Spacer } from '../../../components'
import { Images } from '../../../utilities'
import { totalSize, width, height } from 'react-native-dimension'
import { SCREEN, colors } from '../../../constants'

const ScanDriverInsuranceCard = ({ navigation, route }) => {
  const { navigate } = navigation
  const { scanDrivingCard } = route?.params ?? false
  const { driverdata } = route.params;
  console.log("vehicle data is ", driverdata)
  const { insuranceImg } = route?.params;
  return (
    <MainWrapper>
      <Spacer isDoubleBase />
      <SmallTitle style={styles.title}>
        Scan Your {scanDrivingCard ? "Driving License" : "Insurance Card"}
      </SmallTitle>
      <Spacer isBasic />
      <RegularText style={styles.desc}>
        Please scan your Scan Your insurance card to complete your profile.
      </RegularText>
      <PrimaryImage
        source={Images.insuranceCard}
        size={totalSize(55)}
        styles={styles.img}
      />
      <AbsoluteWrapper style={styles.button}>
        <ButtonColored
          text="SCAN"
          onPress={() =>
            navigate(SCREEN.cardScanner, {
              scanDrivingCard: scanDrivingCard,
              driverdata,
              insuranceImg,
            })
          }
        />
      </AbsoluteWrapper>
    </MainWrapper>
  );
}

export default ScanDriverInsuranceCard
const styles = StyleSheet.create({
  title: {
    color: colors.appTextColor2,
    alignSelf: 'center'
  },
  desc: {
    textAlign: 'center',
    marginHorizontal: width(5),
    color: colors.appTextColor29,
    lineHeight: 18
  },
  img: {
    alignSelf: 'center'
  },
  button: {
    bottom: height(5),
    left: width(5),
    right: width(5)
  }
})