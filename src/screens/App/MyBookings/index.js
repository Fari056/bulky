import React, { useEffect, useState } from 'react'
import { FlatList, Linking } from 'react-native'
import { height } from "react-native-dimension"
import { useSelector } from 'react-redux'
import { BookingCard, ComponentWrapper, MainHeaderRight, MainWrapper, Spacer } from '../../../components'
import { colors, SCREEN } from '../../../constants'
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
        onPressChat={() => navigate(SCREEN.Chat, { receiver_id: item.userid })}
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