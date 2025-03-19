import { StyleSheet } from "react-native";
import React , {useState}from "react";
import {
  ComponentWrapper,
  DueButtons,
  MainHeader,
  MainWrapper,
  RegularText,
  RowWrapper,
  Spacer,
  TextInputSearch,
  SelectableButtons,
  Wrapper,
} from "../../../../../../components";
import { FormText, CheckBoxItem } from "../../../../../../components/appComponents/generalComponents";
import { SCREEN, colors } from "../../../../../../constants";
const Boxes = ({ route, navigation }) => {
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
  } = route.params || {};
  const { navigate, goBack } = navigation;
  const { title } = route?.params?.item ?? false;
   const [Text, setText] = useState("");
   const [isOversized, setIsOversized] = useState(false);
  const toggleOversized = () => setIsOversized(!isOversized);
  const handleContinue = () => {
      const updatedItem = {
        ...item,
        numberOfboats: Text,
        isOversized,
      };
       const existing = itemdetails.findIndex(
         (existingItem) => existingItem.id === item.id
       );
       if (existing !== -1) {
         itemdetails[existing] = updatedItem;
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
      <DueButtons
        onPress={handleContinue}
        text={"continue"}
        onBack={() => goBack()}
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
