import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
// import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ButtonBorderd,
  ComponentWrapper,
  DueButtons,
  MainHeader,
  MainWrapper,
  Spacer,
  TextInputBordered,
  Wrapper,
} from "../../../../../components";
import { SCREEN, colors, fontFamily, fontSize } from "../../../../../constants";
import DateTimePicker from "react-native-modal-datetime-picker";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { setRequestData } from "../../../../../redux/actions";

const DeliveryDateTime = ({ navigation, route }) => {
  // const {
  //   pickupdetails,
  //   destinationdetails,
  //   itemdetails,
  //   pickuppoint,
  //   destination,
  //   deliverydetails,
  // } = route.params;
  const { navigate, goBack } = navigation;
  const request_redux = useSelector((state) => state.requestData)
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (selectedDate) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  const onChangeTime = (selectedTime) => {
    setTime(selectedTime);
    setShowTimePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Delivery Date & Time"} />
        {/* <Spacer isBasic /> */}
        {/* <Text style={styles.text}>
          Select Number of helper Required in this delivery
        </Text> */}
        <Spacer isBasic />
        <Spacer isBasic />
        <TextInputBordered
          title={"Date"}
          isButton
          buttonContentStyle={{ top: heightPercentageToDP(2), alignItems: 'flex-start' }}
          placeholder={"Select Date"}
          value={date.toLocaleDateString()}
          editable={false}
          onPress={showDatepicker}
        />
        <Spacer isBasic />
        <TextInputBordered
          title={"Time"}
          isButton
          buttonContentStyle={{ top: heightPercentageToDP(2), alignItems: 'flex-start' }}
          placeholder={"Select Time"}
          value={time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          editable={false}
          onPress={showTimepicker}
        />
        <Spacer isDoubleBase />
        <ButtonBorderd text="ADD RECEIPT" />
        <Spacer isBasic />
        <Text style={styles.text}>
          If item is being picked up from a retail location receipt required.
        </Text>
      </ComponentWrapper>
      <DueButtons
        text={"continue"}
        onBack={() => goBack()}
        onPress={() => {
          if (!date || !time) {
            Alert.alert("Please select date and time")
            return
          }
          let temp = {
            ...request_redux,
            date: date,
            time: time,
          }
          dispatch(setRequestData(temp))
          navigate(SCREEN.Summery)
          console.log(date)
        }}
      // navigate(SCREEN.Summery, {
      //   pickuppoint,
      //   destination,
      //   itemdetails,
      //   pickupdetails,
      //   destinationdetails,
      //   deliverydetails,
      //   date: date,
      //   time: time,
      // })
      // }
      />

      {showDatePicker && (
        <DateTimePicker
          minimumDate={new Date()}
          isVisible={showDatePicker}
          value={date}
          mode={"date"}
          onConfirm={onChangeDate}
          onCancel={() => setShowDatePicker(false)}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          minimumDate={new Date()}
          value={time}
          isVisible={showTimePicker}
          mode={"time"}
          onConfirm={onChangeTime}
          onCancel={() => setShowTimePicker(false)}
        />
      )}
    </MainWrapper>
  );
};

export default DeliveryDateTime;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.appTextColor2,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.appTextLight,
  },
});
