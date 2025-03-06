import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ComponentWrapper, DueButtons, MainHeader, MainWrapper, Spacer, Wrapper } from '../../../../../components'
import { SummeryDateTimeCard, SummeryHelperCard, SummeryProductCard, SummeryTitleCard } from '../../components'
import { SCREEN } from '../../../../../constants'
import moment from 'moment'
import { useSelector } from 'react-redux'
const Summery = ({ navigation, route }) => {

  const request_redux = useSelector((state) => state.requestData)
  const [data, setData] = useState(request_redux)
  const { navigate, goBack } = navigation
  console.log(data?.deliverydetails)
  const renderItemList = () => {
    return (
      <>
        <SummeryTitleCard
          title={"Items to deliver"}
          onPress={() => navigate(SCREEN.ItemDetail, { isEdit: true })}
        />
        {data?.items?.map((item, index) => (
          <View key={item?.uniqueId}>
            <SummeryProductCard item={item} title={item?.type} />
            {index < data?.items?.length - 1 && <Spacer isSmall />}
          </View>
        ))}
        <Spacer isSmall />
      </>
    );
  };
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Your Delivery Summery"} />
      </ComponentWrapper>
      <ScrollView>
        {renderItemList()}
        <SummeryTitleCard
          title={"Items to deliver"}
          onPress={() => navigate(SCREEN.AddHelpers, { isEdit: true })}
        />
        <SummeryHelperCard count={data?.deliverydetails?.numHelpers || 0} />
        <Spacer isSmall />
        <SummeryTitleCard
          title={"Date & Time"}
          onPress={() =>
            navigate(SCREEN.DeliveryDateTime, { isEdit: true })
          }
        />
        <SummeryDateTimeCard
          date={moment(data?.date)?.format("DD MMM YYYY")}
          time={moment(data?.time)?.format("hh:mm A")}
        />
      </ScrollView>
      <Spacer isBottomTabBarHeight={35} />
      <DueButtons
        text={"continue"}
        onBack={() => goBack()}
        onPress={() => navigate(SCREEN.Bill)}
      />
    </MainWrapper>
  );
}

export default Summery

const styles = StyleSheet.create({})