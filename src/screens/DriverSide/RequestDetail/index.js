import React, { useState , useEffect} from 'react'
import { View, Text, StyleSheet , Image, FlatList} from 'react-native'
import { AbsoluteWrapper, ButtonBorderd, ButtonColored, ComponentWrapper, MainHeader, MainWrapper, MediumText, RowWrapper, RowWrapperBasic, ScrollView, Spacer } from '../../../components'
import { AbsoluteButtonWithBorder, DestinationToPickupLocation, DriverContactInfo, DriverContactPreview, DriverDeliveryInfo, RequestNote, ShippingAddress, VehicleLocation } from '../../../components/appComponents/staticComponents'
import { SCREEN, colors } from '../../../constants'
import ItemForDelivery from './ItemForDelivery'
import RequiredHelper from './RequiredHelper'
import ItemsWeight from './ItemsWeight'
import { width, height } from 'react-native-dimension'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ItemDetails from './ItemDetails'
import { Images } from '../../../utilities'
import HelperChat from './HelperChat'
import moment from "moment";
import { useDispatch} from 'react-redux'
import { updateData } from '../../../backend/utility'
import { set_bookings } from '../../../redux/actions'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../../../backend/auth'
import { Icons } from '../../../assets'
const RequestDetail = ({ navigation, route }) => {
    const bookings = useSelector((state) => state.bookings);
    const { navigate, goBack } = navigation
    const dispatch = useDispatch();
    const [accept, setAccept] = useState(false)
      const { item = {} } = route.params || {};
       const user = item.user || {};
        const { photo = "", firstName = "", lastName = "", phone = "" } = user;
        const itemImages = {
          Bed: Icons.Bed,
          Bike: Icons.Bike,
          Boxes: Icons.Boxes,
          Motorcycle: Icons.Motorcycle,
          Appliances: Icons.Appliances,
          Construction: Icons.Construction,
          Boats: Icons.Boats,
          TV:Icons.TV
        };
    const {
      deliverydetails: { totalcharges, helperscount },
      pickupdetails: { pickupaddress, floors: pickupFloors },
      destinationdetails: { destination, floors: dropoutFloors },
      date,
      time,
      weight = "45kg",
      items: itemdetails = [],
    } = item;
    distance = '30 min'
    const formatDate = (timestamp) => {
      return timestamp?.seconds
        ? moment.unix(timestamp.seconds).format("YYYY-MM-DD")
        : "N/A";
    };
    const formatTime = (timestamp) => {
      return timestamp?.seconds
        ? moment.unix(timestamp.seconds).format("hh:mm A")
        : "N/A";
    };
 const handleAccept = async () => {
   try {
    const currentUserId = await getCurrentUserId();
     const updatedItem = { ...item, status: "accept", driverId: currentUserId };
     const cleanUpdatedItem = Object.fromEntries(
       Object.entries(updatedItem).filter(([key, value]) => value !== undefined)
     );
     await updateData("bookings", item.id, cleanUpdatedItem);
     const updatedBookings = bookings.map((booking) =>
        booking.id === item.id ? cleanUpdatedItem : booking);
      dispatch(set_bookings(updatedBookings));
     accept ? navigate(SCREEN.driverBookings) : setAccept(!accept);
   } catch (error) {
     console.log("Error updating booking status:", error);
   }
 };
    return (
      <MainWrapper>
        <ComponentWrapper>
          <MainHeader title={"Request Details"} />
        </ComponentWrapper>
        <KeyboardAwareScrollView>
          <DriverContactInfo
            name={firstName || ''}
            phoneNumber={phone}
            photo={photo||''}
            requestAccepted={true}
            onPressChat={()=>navigate(SCREEN.Chat, { receiver_id:item.userid })}
          />
          <DriverDeliveryInfo
            time={formatTime(time) || "12:00 am"}
            distance={distance}
            price={totalcharges || "0.00"}
            date={formatDate(date)}
          />
          <ShippingAddress
            pickupLocation={pickupaddress}
            dropoutLocation={destination}
            pickupStairs={pickupFloors}
            dropoutStairs={dropoutFloors}
          />
          {accept && <HelperChat />}

          <ItemDetails
            title={"No of helpers:"}
            subTitle={helperscount}
            source={Images.userGroup}
          />
          <ItemDetails
            title={"Weight:"}
            subTitle={weight}
            iconName={"weight-kilogram"}
          />
          {itemdetails.map((itemDetail) => (
            <View key={itemDetail.id}>
              <ItemDetails
                title={"Item for delivery"}
                subTitle={itemDetail.title}
                source={itemImages[itemDetail.title]}
                onPress={() => navigate(SCREEN.driverItemImages)}
              />
            </View>
          ))}
          <Spacer height={height(14)} />
        </KeyboardAwareScrollView>
        <AbsoluteWrapper style={styles.absoluteBtn}>
          {accept ? (
            <>
              <MediumText
                onPress={() => navigate(SCREEN.driverViewReceipt)}
                style={styles.receipt}
              >
                VIEW RECEIPT
              </MediumText>
              <Spacer isBasic />
              <ButtonColored
                style={{ marginHorizontal: width(5) }}
                text={"START"}
                onPress={() => navigate(SCREEN.driverConnectingWithUser)}
              />
            </>
          ) : (
            <RowWrapper>
              <ButtonBorderd
                style={{ width: width(42) }}
                text={"IGNORE"}
                onPress={() => goBack()}
              />
              <ButtonColored
                style={{ width: width(42) }}
                text={"ACCEPT"}
                onPress={handleAccept}
              />
            </RowWrapper>
          )}
        </AbsoluteWrapper>
      </MainWrapper>
    );
}

export default RequestDetail
const styles = StyleSheet.create({
    absoluteBtn: {
        bottom: height(2),
        left: 0,
        right: 0
    },
    receipt: {
        alignSelf: 'center',
        textDecorationLine: 'underline',
        color: colors.appTextColor1
    }
})