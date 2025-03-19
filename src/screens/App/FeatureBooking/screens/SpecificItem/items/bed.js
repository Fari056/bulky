import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { totalSize, width } from "react-native-dimension";
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
export const Bed = ({ title, selectedOption, setSelectedOption, data }) => {

  const renderItem = ({ item }) => (
    <Wrapper style={styles.itemContainer}>
      <RadioButton
        title={item?.label}
        active={selectedOption === item.label}
        onPress={() => setSelectedOption(item.label)}
      />
    </Wrapper>
  );

  return (
    <MainWrapper>
      <ComponentWrapper>
        {/* <MainHeader title={"Item Details"} /> */}
        <Spacer isBasic />
        <RegularText style={styles.text}>
          Select Items that you want to deliver
        </RegularText>
        <Spacer isBasic />
        <TextInputSearch left editable={false} value={title} />
      </ComponentWrapper>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* <DueButtons
        onPress={handleContinue}
        text={"continue"}
        onBack={() => goBack()}
      /> */}
    </MainWrapper>
  );
};

export default Bed;

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
