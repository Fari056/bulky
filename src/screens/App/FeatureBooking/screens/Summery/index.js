import { StyleSheet, Text, View , ScrollView} from 'react-native'
import React from 'react'
import { ComponentWrapper, DueButtons, MainHeader, MainWrapper, Spacer, Wrapper } from '../../../../../components'
import { SummeryDateTimeCard, SummeryHelperCard, SummeryProductCard, SummeryTitleCard } from '../../components'
import { SCREEN } from '../../../../../constants'
import moment from 'moment'
const Summery = ({ navigation, route }) => {
  const {
    itemdetails,
    pickupdetails,
    destinationdetails,
    deliverydetails = {},
    date,
    time,
    pickuppoint,
    destination,
  } = route.params;
  const { navigate, goBack } = navigation
 const renderItemList = () => {
   return (
     <>
       <SummeryTitleCard
         title={"Items to deliver"}
         onPress={() =>
           navigate(SCREEN.ItemDetail, {
             itemdetails,
             pickupdetails,
             destinationdetails,
             deliverydetails,
             date,
             time,
             pickuppoint,
             destination,
             isEditMode: true,
           })
         }
       />
       {itemdetails.map((item, index) => (
         <View key={item.uniqueId}>
           <SummeryProductCard item={item} title={item.title} />
           {index < itemdetails.length - 1 && <Spacer isSmall />}
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
          onPress={() =>
            navigate(SCREEN.AddHelpers, {
              itemdetails,
              pickupdetails,
              destinationdetails,
              deliverydetails,
              date,
              time,
              pickuppoint,
              destination,
              isEdit: true,
            })
          }
        />
        <SummeryHelperCard count={deliverydetails.helperscount || 0} />
        <Spacer isSmall />
        <SummeryTitleCard
          title={"Date & Time"}
          onPress={() =>
            navigate(SCREEN.DeliveryDateTime, {
              itemdetails,
              pickupdetails,
              destinationdetails,
              deliverydetails,
              date,
              time,
              pickuppoint,
              destination,
            })
          }
        />
        <SummeryDateTimeCard
          date={moment(date)?.format("DD MMM YYYY")}
          time={moment(time)?.format("hh:mm A")}
        />
      </ScrollView>
      <Spacer isBottomTabBarHeight={35} />
      <DueButtons
        text={"continue"}
        onBack={() => goBack()}
        onPress={() =>
          navigate(SCREEN.Bill, {
            itemdetails,
            pickupdetails,
            destinationdetails,
            deliverydetails,
            date,
            time,
            pickuppoint,
            destination,
          })
        }
      />
    </MainWrapper>
  );
}

export default Summery

const styles = StyleSheet.create({})