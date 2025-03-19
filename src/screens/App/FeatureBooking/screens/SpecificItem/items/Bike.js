import {
  StyleSheet,
} from "react-native";
import React from "react";
import {
  ComponentWrapper,
  DueButtons,
  MainHeader,
  MainWrapper,
  RegularText,
  RowWrapper,
  Spacer,
  TextInputSearch,
  Wrapper,
} from "../../../../../../components";
import { SCREEN, colors } from "../../../../../../constants";
const Bike = ({ route, navigation }) => {
  const {
    item,
    pickupdetails,
    destinationdetails,
    itemdetails = [],
    pickuppoint,
    destination,
    isEditMode,
    deliverydetails,
    date,
    time,
  } = route.params;
  const { navigate, goBack } = navigation;
  const { title } = route?.params?.item ?? false;
  const handleContinue = () => {
      const existing = itemdetails.findIndex(
        (existingItem) => existingItem.id === item.id
      );
        if (existing !== -1) {
         itemdetails[existing] = item;
      } else {
        itemdetails.push(item);
      }
    navigate(SCREEN.SelectedItems, {
      item,
      pickupdetails,
      destinationdetails,
      itemdetails,
      pickuppoint,
      destination,
      isEditMode,
      deliverydetails,
      date,
      time,
    });
  };
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Item Details"} />
        <Spacer isBasic />
        <RegularText style={styles.text}>
          Select Items that you want to deliver
        </RegularText>
        <Spacer isBasic />
        <TextInputSearch left editable={false} value={title} />
      </ComponentWrapper>
      <DueButtons
        onPress={handleContinue}
         text={"continue"}
        onBack={() => goBack()}
      />
    </MainWrapper>
  );
};

export default Bike;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.appTextColor2,
  },
  rowWrapper: {
    marginHorizontal: 0,
  },
});
