import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ComponentWrapper,
  MainHeader,
  MainWrapper,
  RegularText,
  Spacer,
  TextInputSearch
} from "../../../../../../components";
import { CheckBoxItem, FormText } from "../../../../../../components/appComponents/generalComponents";
import { colors } from "../../../../../../constants";

const Boxes = ({
  title,
  isOversized, setIsOversized,
  Text, setText
}) => {

  const toggleOversized = () => setIsOversized(!isOversized);
  // const handleContinue = () => {
  //   const updatedItem = {
  //     ...item,
  //     numberOfboats: Text,
  //     isOversized,
  //   };
  //   const existing = itemdetails.findIndex(
  //     (existingItem) => existingItem.id === item.id
  //   );
  //   if (existing !== -1) {
  //     itemdetails[existing] = updatedItem;
  //   } else {
  //     itemdetails.push(updatedItem);
  //   }

  // };
  return (
    <MainWrapper>
      <ComponentWrapper>
        {/* <MainHeader title={"Item Details"} /> */}
        <Spacer isBasic />
        <RegularText style={styles.text}>
          Select Items that you want to deliver
        </RegularText>
        <Spacer isBasic />
        <TextInputSearch
          left
          editable={false}
          value={title}
        />
      </ComponentWrapper>
      <FormText value={Text} onChange={setText} />
      <CheckBoxItem
        title="Oversized boxes"
        description="(larger than 50-inch TV boxes, for example)"
        value={isOversized}
        onpress={toggleOversized}
      />
    </MainWrapper>
  );
};

export default Boxes;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.appTextColor2,
  },
  rowWrapper: {
    marginHorizontal: 0,
  },
});
