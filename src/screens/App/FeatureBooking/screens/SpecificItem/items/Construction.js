import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { totalSize, width } from "react-native-dimension";
import { options } from "../../../../../../../tempData";
import {
  ComponentWrapper,
  MainWrapper,
  RadioButton,
  RegularText,
  Spacer,
  TextInputSearch,
  Wrapper
} from "../../../../../../components";
import { colors } from "../../../../../../constants";
import { heightPercentageToDP } from "react-native-responsive-screen";
const Construction = ({ title, selectedOption, setSelectedOption }) => {

  // const handleContinue = () => {
  //    const updatedItem = {
  //      ...item,
  //      selectedOption,
  //    };
  //      const existing = itemdetails.findIndex(
  //        (existingItem) => existingItem.id === item.id
  //      );
  //      let updated;
  //      if (existing !== -1) {
  //        updated = itemdetails.map((existingItem, index) =>
  //          index === existing ? updatedItem : existingItem
  //        );
  //      } else {
  //        updated = [...itemdetails, updatedItem];
  //      }
  //   navigate(SCREEN.SelectedItems, {
  //     item: updatedItem,
  //     pickupdetails,
  //     destinationdetails,
  //     itemdetails: updated,
  //     pickuppoint,
  //     destination,
  //     isEditMode,
  //     deliverydetails,
  //     date,
  //     time,
  //   });
  // };
  const renderItem = ({ item }) => (
    <Wrapper style={styles.itemContainer}>
      <RadioButton
        title={item.label}
        active={selectedOption === item.label}
        onPress={() => setSelectedOption(item.label)}
      />
    </Wrapper>
  );

  return (
    <MainWrapper>
      <ComponentWrapper>
        <Spacer isBasic />
        <RegularText style={styles.text}>
          Select Items that you want to deliver
        </RegularText>
        <Spacer isBasic />
        <TextInputSearch left editable={false} value={title} />
      </ComponentWrapper>
      <FlatList
        ListFooterComponent={
          <><Spacer isDoubleBase />
            <Spacer isDoubleBase />
          </>
        }
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </MainWrapper>
  );
};

export default Construction;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.appTextColor2,
  },
  itemContainer: {
    marginBottom: totalSize(1),
    paddingVertical: totalSize(1),
    paddingHorizontal: width(4),
    borderWidth: 1,
    borderColor: colors.appBorder5,
    borderRadius: totalSize(1),
    width: width(90),
    margin: width(5),
  },
});
