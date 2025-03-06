import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, } from 'react-native'
import { ComponentWrapper, DueButtons, Hrline, LargeText, MainHeader, MainWrapper, Spacer } from '../../../../../components'
import { SCREEN, colors, fontFamily, fontSize } from '../../../../../constants'
import { HelperCard, HelperPriceCard, HelperTotalCard } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { setRequestData } from '../../../../../redux/actions'

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
  const request_redux = useSelector((state) => state.requestData)
  const dispatch = useDispatch()
  const { navigate, goBack } = navigation
  const [count, setCount] = useState(2)
  const [data, setData] = useState(request_redux)
  const [price, setPrice] = useState(50);
  const pickupFloors = pickupdetails?.floors ?? 0;
  const destinationFloors = destinationdetails?.floors ?? 0;
  const total_charges = count * price;


  const b = (screen) => {

    let temp = {
      ...request_redux,
      deliverydetails: {
        numHelpers: count,
        helperPrice: price,
        totalCharges: total_charges,
      }
    }
    dispatch(setRequestData(temp))
    isEdit ? navigate(SCREEN.Summery) : navigate(SCREEN.DeliveryDateTime)
    // navigate(screen, {
    //   pickupdetails,
    //   destinationdetails,
    //   itemdetails,
    //   pickuppoint,
    //   destination,
    //   deliverydetails: {
    //     helperscount: count,
    //     helperprice: price,
    //     totalcharges: total_charges,
    //   },
    //   date,
    //   time,
    //   isEdit,
    // });
  }


  const calculateTotalWeight = () => {
    return data?.items?.reduce((total, item) => total + (parseFloat(item.weight) || 0), 0);
  };
  useEffect(() => {
    setData(request_redux)
    setCount(Math.ceil(totalWeight / 200))
  }, [request_redux])

  const totalWeight = calculateTotalWeight();
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Required Helper"} />
        <Spacer isBasic />
        <Spacer isBasic />
        <Text style={styles.text}>
          Your Total weight is <Text style={styles.boldText}>{totalWeight}lbs</Text> so
          your required minimum <Text style={styles.boldText}>{Math.ceil(totalWeight / 200)} helper</Text>{" "}
          for this delivery.
        </Text>
        <Spacer isBasic />
        <Spacer isSmall />
      </ComponentWrapper>
      <HelperCard min={Math.ceil(totalWeight / 200)} count={count} setCount={setCount} />
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
