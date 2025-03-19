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

export const Appliances = ({
  title, data, setData,
  selectedSizes, setSelectedSizes,
  selected, setSelected,
  imageUrls, setImageUrls

}) => {

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
      maxFiles: 3,
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
  // const handleContinue = () => {
  //   const selectedItems = data.filter((item, index) => index === selected);
  //   const updatedItem = {
  //     ...item,
  //     selectedItems,
  //     images: imageUrls,
  //     selectedSizes,
  //   };
  //   const Index = itemdetails.findIndex(
  //     (existingItem) => existingItem.id === item.id
  //   );
  //   let newItem;
  //   if (Index !== -1) {
  //     newItem = itemdetails.map((existingItem, index) =>
  //       index === Index ? updatedItem : existingItem
  //     );
  //   } else {
  //     newItem = [...itemdetails, updatedItem];
  //   }
  //   navigate(SCREEN.SelectedItems, {
  //     item: updatedItem,
  //     pickupdetails,
  //     destinationdetails,
  //     itemdetails: newItem,
  //     pickuppoint,
  //     destination,
  //     isEditMode,
  //     deliverydetails,
  //     date,
  //     time,
  //   });
  // };

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
      <ScrollView>
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
          <Spacer isSmall />
          <ComponentWrapper>
            <MediumText>Add More item</MediumText>
            <Spacer isSmall />
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
        <Spacer isDoubleBase />
        <Spacer isDoubleBase />
      </ScrollView>
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
