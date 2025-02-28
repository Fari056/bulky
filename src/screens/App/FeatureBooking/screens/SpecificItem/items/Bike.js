import React from "react";
import {
  StyleSheet,
} from "react-native";
import {
  ComponentWrapper,
  MainHeader,
  MainWrapper,
  RegularText,
  Spacer,
  TextInputSearch
} from "../../../../../../components";
import { colors } from "../../../../../../constants";
const Bike = ({ title }) => {

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
