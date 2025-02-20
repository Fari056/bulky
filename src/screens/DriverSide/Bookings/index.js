import { View, Text, FlatList, StyleSheet, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
import { BookingCard, ComponentWrapper, HomeHeader, MainWrapper, PrimaryImage, RegularText, Spacer, TinyTitle, Wrapper } from '../../../components'
import { colors, SCREEN } from '../../../constants'
import { width, height, totalSize } from 'react-native-dimension'
import { Images } from '../../../utilities'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../../../backend/auth'
const Bookings = ({ navigation }) => {
    const { navigate } = navigation
    const bookings_redux = useSelector((state) => state.bookings);
   const [data, setData] = useState(bookings_redux);
    useEffect(() => {
      const fetch = async () => {
        const userId = await getCurrentUserId();
        if (bookings_redux && Array.isArray(bookings_redux)) {
          const filteredBookings = bookings_redux.filter(
            (booking) =>
              booking.status === "accept" && booking.driverId === userId
          );
          setData(filteredBookings);
        }
      };
      fetch();
    }, [bookings_redux]);
    const renderEmptyBookings = () => {
        return (
            <Wrapper style={styles.emptyBox}>
                <PrimaryImage source={Images.emptyBox} size={totalSize(10)} />
                <Spacer isBasic />
                <RegularText color={colors.appTextColor32}>You don't have any booking </RegularText>
            </Wrapper>
        )
    };

    return (
      <MainWrapper>
        <HomeHeader
          onPressMenu={() => navigate(SCREEN.driverSetting)}
          onPressProfile={() => navigate(SCREEN.driverProfile)}
          title="Bulky"
        />
        <ComponentWrapper style={{ flex: 1 }}>
          <Spacer isBasic />
          <TinyTitle>Your Bookings</TinyTitle>
          <Spacer isBasic />
          <FlatList
            style={{ flex: 1 }}
            data={data}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyBookings}
            ItemSeparatorComponent={<Spacer isSmall />}
            ListFooterComponent={<Spacer isBasic />}
            renderItem={({ item }) => {
              const user = item.user || {};
              return (
                <BookingCard
                  name={`${user.firstName} ${user.lastName}`}
                  profileImage={user.photo}
                  booking={item}
                  lineStyle={{ width: width(88) }}
                  onPressCard={() =>
                    navigate(SCREEN.driverConnectingWithUser, {
                      bookingDetails: item,
                    })
                  }
                  onPressPhone={() =>
                    Linking.openURL(`tel:${user.phoneNumber}`)
                  }
                  onPressChat={() =>
                    navigate(SCREEN.Chat, { receiver_id: item.driverId })
                  }
                />
              );
            }}
          />
       
        </ComponentWrapper>
      </MainWrapper>
    );
}

export default Bookings

const styles = StyleSheet.create({
    emptyBox: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})