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
const TV = ({ route, navigation }) => {
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
   const [selectedOption, setSelectedOption] = useState(
     item?.selectedTVSize || null
   );

  const options = [
    { id: "1", label: "Up to 50" },
    { id: "2", label: "over 50" },
  ];
  const { navigate, goBack } = navigation;
  const { title } = route?.params?.item ?? false;
 const handleContinue = () => {
    const updatedItem = {
     ...item,
     selectedTVSize: selectedOption,
   };
   const existingItemIndex = itemdetails.findIndex(
     (existingItem) => existingItem.id === item.id
   );

   if (existingItemIndex !== -1) {
     itemdetails[existingItemIndex] = updatedItem;
   } else {
      itemdetails.push(updatedItem);
   }

   navigate(SCREEN.SelectedItems, {
     item: updatedItem,
     pickupdetails,
     destinationdetails,
     itemdetails: itemdetails,
     pickuppoint,
     destination,
     selectedOption,
     isEditMode,
     deliverydetails,
     date,
     time,
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
      />
      <DueButtons
        onPress={handleContinue}
        text={"continue"}
        onBack={() => goBack()}
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
