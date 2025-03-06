import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text, Linking
} from "react-native";
import { BookingDetailCard } from "../../../../components";
import { CancelRequestBottomSheet } from "../../../../components";
import { updateData } from "../../../../backend/utility";
import { SCREEN } from "../../../../constants";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  MainWrapper,
  MainHeader,
  ComponentWrapper,
} from "../../../../components";
import Chat from "../../../DriverSide/Chat";
import { Spacer } from "../../../../components";
import { useSelector } from "react-redux";
const BookingDetails = ({ route, navigation }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const { item } = route.params;
  const bottomSheetRef = useRef(null);
  const { navigate } = navigation;

  const cancel = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };

  const handleReasonSelect = async (reason) => {
    setSelectedReason(reason);
    item.status = "cancel";
    item.cancelreason = reason;
    const res = await updateData("bookings", item.id, {
      status: "cancel",
      cancelreason: reason,
    });
    if (res) {
      console.log("Updated item:", item);
    }
  };

  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Booking Details"} />
        <Spacer isSmall />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <BookingDetailCard
            item={item}
            user={item?.user}
            onPresscall={() => Linking.openURL(`tel:0308912345`)}
            onPressChat={() => navigate(SCREEN.Chat, { receiver_id: item.id })}
          />
          <Text
            style={styles.cancelButton}
            onPress={item?.status === "pending" ? cancel : null}
          >
            {item?.status === "pending" ? "CANCEL REQUEST" : "CANCELLED"}
          </Text>
        </ScrollView>
        <CancelRequestBottomSheet
          innerRef={bottomSheetRef}
          heights={heightPercentageToDP("55%")}
          onPressKeepDelivery={() => navigate(SCREEN.DeliveryCanceled)}
          onPressReason={handleReasonSelect}
          driverCancellation={false}
        />
      </ComponentWrapper>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cancelButton: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    paddingVertical: 10,
  },
});

export default BookingDetails;
