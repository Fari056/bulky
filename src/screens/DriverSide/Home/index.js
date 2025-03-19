import React, { useState, useEffect } from 'react'
import { FlatList, Linking } from 'react-native'
import { ComponentWrapper, HomeHeader, MainWrapper, RequestCard, Spacer, TinyTitle, Wrapper } from '../../../components'
import { SCREEN } from '../../../constants'
import { useSelector } from 'react-redux'
import moment from "moment";
import { getToken, request_Permission, foreground_Listener, background_Listener, Notification } from '../../../services'
import { saveData } from '../../../backend/utility'
import { getCurrentUserId } from '../../../backend/auth'
import { isPointWithinRadius } from "geolib";
const Home = ({ navigation }) => {
  const { navigate } = navigation;
  const bookings = useSelector((state) => state.bookings);
  const user_redux = useSelector((state) => state.user);
  const userLocation = user_redux?.cords;
  const [data, setData] = useState(bookings);
  const [ignoreList, setIgnoreList] = useState([]);
   const [driverLocation, setDriverLocation] = useState(userLocation);
  const RADIUS_IN_KM = 10;
  useEffect(() => {
      if (userLocation) {
        setDriverLocation(userLocation);
      }
    if (Array.isArray(bookings) && driverLocation) {
      const nearbyBookings = bookings.filter((booking) => {
        const bookingCoords = booking.pickupdetails.cords;
         if (
          !bookingCoords ||
          !bookingCoords.latitude ||
          !bookingCoords.longitude
        ) {
          console.warn("Invalid booking coordinates:", bookingCoords);
          return false;
        }
        const isWithinRadius = isPointWithinRadius(
          {
            latitude: bookingCoords.latitude,
            longitude: bookingCoords.longitude,
          },
          {
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
          },
          RADIUS_IN_KM * 1000
        );
        return (
          booking.status === "pending" &&
          !ignoreList.includes(booking.id) &&
          isWithinRadius
        );
      });
      setData(nearbyBookings);
    }
  }, [bookings, driverLocation, ignoreList]);
  useEffect(() => {
    const res = async () => {
      await request_Permission();
      await token_();
      const unsub = foreground_Listener();
      background_Listener();
      Notification();
      return () => unsub();
    };
    res();
  }, []);
  const token_ = async () => {
    try {
      let token = await getToken();
      let uid = await getCurrentUserId();
      const res = await saveData("users", uid, { token });
      console.log("saved", res);
    } catch (error) {
      console.error("Error in token_ function:", error);
    }
  };
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
  const handleIgnore = (id) => {
    setIgnoreList([...ignoreList, id]);
  };
  const renderBookingItem = ({ item }) => {
    const {
      user = {},
      deliverydetails = {},
      pickupdetails = {},
      destinationdetails = {},
      date,
      time,
    } = item;
    return (
      <RequestCard
        name={user?.firstName || ""}
        photo={user?.photo || ""}
        price={deliverydetails?.totalcharges}
        onPressAccept={() => navigate(SCREEN.driverRequestDetail, { item })}
        onPressChat={() => navigate(SCREEN.driverChat)}
        onPressPhone={() => Linking.openURL(`tel:${user?.phone}`)}
        date={formatDate(date)}
        time={formatTime(time)}
        weight={deliverydetails?.helperprice}
        pickupAddress={pickupdetails?.pickupaddress}
        destinationAddress={destinationdetails?.destination}
        onPressIgnore={() => handleIgnore(item.id)}
      />
    );
  };

  return (
    <MainWrapper>
      <HomeHeader
        onPressProfile={() => navigate(SCREEN.driverProfile)}
        onPressMenu={() => navigate(SCREEN.driverSetting)}
        title="Bulky"
      />
      <Wrapper flex={1}>
        <ComponentWrapper>
          <Spacer isBasic />
          <TinyTitle>Requests near you</TinyTitle>
          <Spacer isBasic />
        </ComponentWrapper>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={<Spacer isBasic />}
          ListFooterComponent={<Spacer isBasic />}
          renderItem={renderBookingItem}
          extraData={bookings}
        />
      </Wrapper>
    </MainWrapper>
  );
}

export default Home