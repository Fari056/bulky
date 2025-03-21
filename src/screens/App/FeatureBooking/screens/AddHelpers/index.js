import { StyleSheet, Text, } from 'react-native'
import React, { useState } from 'react'
import { ComponentWrapper, DueButtons, Hrline, LargeText, MainHeader, MainWrapper, RegularText, Spacer } from '../../../../../components'
import { SCREEN, colors, fontFamily, fontSize } from '../../../../../constants'
import { HelperCard, HelperPriceCard, HelperTotalCard } from '../../components'

const AddHelpers = ({ navigation, route }) => {
  const {
    pickupdetails,
    destinationdetails,
    pickuppoint,
    destination,
    itemdetails,
    isEdit,
    deliverydetails,
    date,
    time,
  } = route.params;
  const { navigate, goBack } = navigation
  const [count, setCount] = useState(2)
  const [price, setPrice] = useState(50);
  const pickupFloors = pickupdetails?.floors ?? 0;
  const destinationFloors = destinationdetails?.floors ?? 0;
  const total_charges = count * price;
  const b = (screen) =>
    navigate(screen, {
      pickupdetails,
      destinationdetails,
      itemdetails,
      pickuppoint,
      destination,
      deliverydetails: {
        helperscount: count,
        helperprice: price,
        totalcharges: total_charges,
      },
      date,
      time,
      isEdit,
    });
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Required Helper"} />
        <Spacer isBasic />
        <Spacer isBasic />
        <Text style={styles.text}>
          Your Total weight is <Text style={styles.boldText}>200lbs</Text> so
          your required minimum <Text style={styles.boldText}>2 helper</Text>{" "}
          for this delivery.
        </Text>
        <Spacer isBasic />
        <Spacer isSmall />
      </ComponentWrapper>
      <HelperCard count={count} setCount={setCount} />
      <Spacer isDoubleBase />
      <ComponentWrapper>
        <LargeText color={colors.appTextColor1}>Charges for helper</LargeText>
      </ComponentWrapper>
      <HelperPriceCard title={"No of Floors"} value={pickupFloors.toString()} />
      <HelperPriceCard
        title={"No of Floors"}
        value={destinationFloors.toString()}
      />
      <HelperPriceCard title={"No of Helper"} value={count.toString()} />
      <HelperPriceCard title={"Per Helper"} value={price.toString()} />
      <Hrline Width={"90%"} style={styles.hrline} />
      <HelperTotalCard
        title={"Total"}
        value={`$${total_charges.toString()}.00`}
      />
      <DueButtons
        text={"continue"}
        onBack={() => goBack()}
        onPress={() => b(isEdit ? SCREEN.Summery : SCREEN.DeliveryDateTime)
        }
      />
    </MainWrapper>
  );
}

export default AddHelpers

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    color: colors.appTextColor2,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.appTextLight,
    lineHeight: 24
  },
  hrline: {
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: colors.appTextColor4
  },
  boldText: {
    fontFamily: fontFamily.appTextMedium
  }
})
