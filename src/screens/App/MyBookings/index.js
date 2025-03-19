import React, { useEffect, useState } from 'react'
import { View, Text, Linking, FlatList } from 'react-native'
import { ComponentWrapper, MainHeaderRight, MainWrapper } from '../../../components'
import { BookingsList } from '../../../components/appComponents/generalComponents'
import { colors, SCREEN } from '../../../constants'
import { width, height } from "react-native-dimension";
import { BookingCard, Spacer } from "../../../components";
import { getAllOfCollection } from "../../../backend/utility";
import { getCurrentUserId } from '../../../backend/auth'
import { useSelector } from 'react-redux'
const MyBookings = ({ navigation }) => {
  const { navigate } = navigation
  const user_redux = useSelector((state) => state.user);
  const bookings_redux = useSelector((state) => state.bookings);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    if (bookings_redux && user_redux.id) {
      const userId = user_redux.id;
      const userBookings = bookings_redux.filter(
        (booking) => booking.user && booking.userid === userId
      );
      setBookings(userBookings);
    }
  }, [bookings_redux, user_redux.id]);
  const renderBookingItem = ({ item }) => {
    return (
      <BookingCard
        booking={item}
        name={`${item.user.firstName} ${item.user.lastName}`}
        profileImage={item.user.photo}
        onPressPhone={() => Linking.openURL(`tel:0308912345}`)}
        onPressChat={() => navigate(SCREEN.Chat, { id: item.id })}
      />
    );
  };

  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeaderRight
          title={"My Bookings"}
          right={"Requests"}
          rightTextStyle={colors.primary}
          onPressRight={() => navigate(SCREEN.BookingRequest)}
        />
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Spacer isSmall />}
          ListHeaderComponent={() => <Spacer isBasic />}
          ListFooterComponent={() => <Spacer height={height(4)} />}
        />
      </ComponentWrapper>
    </MainWrapper>
  );
}

export default MyBookings