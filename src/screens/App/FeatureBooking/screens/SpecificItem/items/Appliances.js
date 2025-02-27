import React, { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet } from "react-native";
import { width } from "react-native-dimension";
import ImagePicker from "react-native-image-crop-picker";
import {
  ComponentWrapper,
  DueButtons,
  MainHeader,
  MainWrapper,
  MediumText,
  RegularText,
  RowWrapper,
  Spacer,
  TextInputSearch,
  Wrapper
} from "../../../../../../components";
import { SizeOptions } from "../../../../../../components/appComponents/generalComponents";
import { SCREEN, colors } from "../../../../../../constants";
import { ToastError } from "../../../../../../utilities";
import { AddImage, ItemDetailCard } from "../../../components";
const Data = [
  { id: "1", title: "Refrigerator ", count: 1 },
  { id: "2", title: "Stove/Oven", count: 1 },
  { id: "3", title: "Microwave", count: 1 },
  { id: "4", title: "Dishwasher", count: 1 },
  { id: "5", title: "Hot water heater", count: 1 },
];
export const Appliances = ({ route, navigation }) => {
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
  const [data, setData] = useState(Data);
  const [selectedSizes, setSelectedSizes] = useState({
    small: false,
    medium: false,
    large: false,
    extraLarge: false,
  });
  const [selected, setSelected] = useState(null);
  const { title } = route?.params?.item ?? false;
  const [imageUrls, setImageUrls] = useState(item?.images || []);
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
    }).then(async (selectedImages) => {
      let count = [...imageUrls, ...selectedImages]?.length;
      if (count > 3) {
        ToastError("up to 3 images are allowed");
        return;
      }
      setImageUrls((prevUrls) => [...prevUrls, ...selectedImages]);
    });
  };

  const handleIncrement = (index) => {
    const newData = [...data];
    newData[index].count += 1;
    setData(newData);
  };

  const handleDecrement = (index) => {
    const newData = [...data];
    if (newData[index].count > 1) {
      newData[index].count -= 1;
      setData(newData);
    }
  };
  const handleContinue = () => {
    const selectedItems = data.filter((item, index) => index === selected);
    const updatedItem = {
      ...item,
      selectedItems,
      images: imageUrls,
      selectedSizes,
    };
    const Index = itemdetails.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    let newItem;
    if (Index !== -1) {
      newItem = itemdetails.map((existingItem, index) =>
        index === Index ? updatedItem : existingItem
      );
    } else {
      newItem = [...itemdetails, updatedItem];
    }
    navigate(SCREEN.SelectedItems, {
      item: updatedItem,
      pickupdetails,
      destinationdetails,
      itemdetails: newItem,
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
      <Wrapper flex={1}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Spacer isBasic />}
          ItemSeparatorComponent={<Spacer isBasic />}
          // ListFooterComponent={<Spacer isSmall />}
          renderItem={({ item, index }) => {
            return (
              <ItemDetailCard
                onPress={() => setSelected(index)}
                active={selected == index}
                count={item?.count}
                title={item?.title}
                onAdd={() => handleIncrement(index)}
                onSub={() => handleDecrement(index)}
              />
            );
          }}
        />
      </Wrapper>
      <Wrapper>
        <ComponentWrapper>
          <MediumText>Add More item</MediumText>
          <SizeOptions onSelectionChange={setSelectedSizes} />
        </ComponentWrapper>
      </Wrapper>
      <Wrapper flex={0.5}>
        <ComponentWrapper>
          <Spacer isSmall />
          <MediumText>Add Pictures</MediumText>
          <Spacer isSmall />
          <RowWrapper style={styles.rowWrapper}>
            <AddImage onPress={handleImagePicker} />
            <ScrollView horizontal>
              {imageUrls?.map((item, index) => (
                <Image
                  key={index}
                  source={{ uri: item?.path }}
                  style={styles.selectedImg}
                />
              ))}
            </ScrollView>
          </RowWrapper>
        </ComponentWrapper>
      </Wrapper>
      <DueButtons
        onPress={handleContinue}
        disabled={selected === null}
        text={"continue"}
        onBack={() => goBack()}
      />
    </MainWrapper>
  );
};

export default Appliances;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.appTextColor2,
  },
  rowWrapper: {
    marginHorizontal: 0,
  },
  selectedImg: {
    height: width(16),
    width: width(16),
    marginLeft: 10,
    borderRadius: 10,
  },
});
