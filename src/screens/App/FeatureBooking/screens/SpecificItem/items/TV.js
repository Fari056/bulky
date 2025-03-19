import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { totalSize, width } from "react-native-dimension";
import {
  ComponentWrapper,
  DueButtons,
  MainHeader,
  MainWrapper,
  RadioButton,
  RegularText,
  Spacer,
  TextInputSearch,
  Wrapper
} from "../../../../../../components";
import { SCREEN, colors } from "../../../../../../constants";
const TV = ({ title, selectedOption, setSelectedOption }) => {

  const options = [
    { id: "1", label: "Up to 50" },
    { id: "2", label: "over 50" },
  ];
  //  const handleContinue = () => {
  //     const updatedItem = {
  //      ...item,
  //      selectedTVSize: selectedOption,
  //    };
  //    const existingItemIndex = itemdetails.findIndex(
  //      (existingItem) => existingItem.id === item.id
  //    );

  //    if (existingItemIndex !== -1) {
  //      itemdetails[existingItemIndex] = updatedItem;
  //    } else {
  //       itemdetails.push(updatedItem);
  //    }

  //    navigate(SCREEN.SelectedItems, {
  //      item: updatedItem,
  //      pickupdetails,
  //      destinationdetails,
  //      itemdetails: itemdetails,
  //      pickuppoint,
  //      destination,
  //      selectedOption,
  //      isEditMode,
  //      deliverydetails,
  //      date,
  //      time,
  //    });
  //  };

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
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </MainWrapper>
  );
};

export default TV;

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
