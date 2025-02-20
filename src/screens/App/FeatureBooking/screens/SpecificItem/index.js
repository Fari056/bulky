import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ComponentWrapper, DueButtons, LargeText, MainHeader, MainWrapper, MediumText, RegularText, RowWrapper, Spacer, TextInputSearch, Wrapper } from '../../../../../components'
import { SCREEN, colors } from '../../../../../constants'
import { AddImage, ItemDetailCard } from '../../components'
import ImagePicker from 'react-native-image-crop-picker';
import { totalSize, width, height } from 'react-native-dimension'
import { uniqueID, uploadFile } from '../../../../../backend/utility'
import { ToastError } from '../../../../../utilities'
import { Check_Box } from '../../../../../components/appComponents/generalComponents'
const Data = [
  { id: "1", title: "Twin", count: 1 },
  { id: "2", title: "Full", count: 1 },
  { id: "3", title: "Queen", count: 1 },
  { id: "4", title: "King", count: 1 },
];

const SpecificItem = ({ route, navigation }) => {
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
  const [selected, setSelected] = useState(null)
  const { title } = route?.params?.item ?? false
  const [imageUrls, setImageUrls] = useState(item?.images || []);

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo'
    }).then(async (selectedImages) => {
      let count = [...imageUrls, ...selectedImages]?.length
      if (count > 3) {
        ToastError('up to 3 images are allowed')
        return
      }
      setImageUrls((prevUrls) => [
        ...prevUrls,
        ...selectedImages,
      ]);
    });
  };

  const handleContinue = () => {
    if (selected === null) {
      return;
    }
    const updatedItem = {
      ...item,
      id: uniqueID(),
      images: imageUrls,
      selectedItem: data[selected],
    };
     const Index = itemdetails.findIndex(
       (existingItem) => existingItem.id === item.id
     );

     if (Index !== -1) {
       itemdetails[Index] = updatedItem;
     } else {
       itemdetails.push(updatedItem);
     }
    navigate(SCREEN.SelectedItems, {
      item: updatedItem,
      pickupdetails,
      destinationdetails,
      itemdetails,
      pickuppoint,
      destination,
      isEditMode,
      deliverydetails,
      date,
      time,
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

      <ComponentWrapper>
        <MediumText>Add More item</MediumText>
      </ComponentWrapper>
      <Check_Box description="Spilt box spring" />
      <Wrapper flex={1}>
        <ComponentWrapper>
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
}

export default SpecificItem

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.appTextColor2
  },
  selectedImg: {
    height: width(16),
    width: width(16),
    marginLeft: 10,
    borderRadius: 10,
  },
  rowWrapper: {
    marginHorizontal: 0,
  }
})