import { StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useState } from "react";
import {
  ComponentWrapper,
  DueButtons,
  MainHeader,
  MainWrapper,
  RegularText,
  RowWrapper,
  RadioButton,
  Spacer,
  TextInputSearch,
  SelectableButtons,
  Wrapper,
} from "../../../../../../components";
import { SelectableItem } from "../../../../../../components/appComponents/generalComponents";
import { SCREEN, colors } from "../../../../../../constants";
import { totalSize, width, height } from "react-native-dimension";
const Bed = ({ route, navigation }) => {
  const {
    item,
    pickupdetails,
    destinationdetails,
    itemdetails,
    pickuppoint,
    destination,
  } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { id: "1", label: "Headboard" },
    { id: "2", label: "Footboard" },
    { id: "3", label: " California King" },
  ];
  const { navigate, goBack } = navigation;
  const { title } = route?.params?.item ?? false;
  const handleContinue = () => {
    navigate(SCREEN.SelectedItems, {
      //   item: updatedItem,
      //   pickupdetails,
      //   destinationdetails,
      //   itemdetails,
      //   pickuppoint,
      //   destination,
    });
  };
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
        <MainHeader title={"Item Details"} />
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
        removeClippedSubviews={false}
      />
      <DueButtons
        onPress={handleContinue}
        text={"continue"}
        onBack={() => goBack()}
      />
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
