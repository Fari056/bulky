// App.js
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, FlatList } from "react-native";
import { BookingRequestCard, Wrapper } from "../../../../components";
import { MainWrapper, MainHeader, ComponentWrapper } from "../../../../components";
import { Spacer } from "../../../../components";
import { colors, SCREEN } from "../../../../constants";
import { useSelector } from "react-redux";
const BookingRequest = ({ navigation }) => {
  const { navigate } = navigation;
 const user_redux = useSelector((state) => state.user);
 const bookings_redux = useSelector((state) => state.bookings);
  const [bookings, setBookings] = useState(bookings_redux);
  useEffect(() => {
    if (bookings_redux && user_redux.id) {
      const userId = user_redux.id;
       const userBookings = bookings_redux.filter(
         (booking) =>
           booking.user &&
           booking.userid === userId &&
           booking.status === "pending"
       );
      setBookings(userBookings);
    }
  }, [bookings_redux, user_redux.id]);
  return (
    <MainWrapper>
      <ComponentWrapper style={{
        flex: 1
      }}>
        <MainHeader title={"Bookings Requests"} />
        <Spacer isSmall />
        <Wrapper flex={1}>
          <FlatList
            ListHeaderComponent={<Spacer isSmall />}
            data={bookings}
            removeClippedSubviews={false}
            renderItem={({ item, index }) => (
              <BookingRequestCard
                key={index}
                item={item}
                onPress={() => navigate(SCREEN.BookingDetails, { item })}
              // onPress={() => console.log(item)}
              />
            )}
          />
        </Wrapper>
      </ComponentWrapper>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F7F7",
  },
  scrollViewContent: {
    flexGrow: 1,
    marginVertical: 20,
    bottom: 30
  },
});

export default BookingRequest;
