import { FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ComponentWrapper, DueButtons, LargeText, MainHeader, MainWrapper, RegularText, Spacer, Wrapper } from '../../../../../components'
import { SCREEN, colors, fontFamily } from '../../../../../constants'
import { SelectedItemCard } from '../../components'
const SelectedItems = ({ navigation, route }) => {
  const {
    item,
    pickupdetails,
    destinationdetails,
    pickuppoint,
    destination,
    itemdetails = [],
    selectedItems,
    selectedOption,
    isEditMode,
    deliverydetails,
    date,
    time,
  } = route.params;
  const { navigate, goBack } = navigation
  const [data, setData] = useState(itemdetails);

  useEffect(() => {
    if (item) {
      setData((prevData) => {
        const existingItemIndex = prevData.findIndex(
          (existingItem) => existingItem.id === item.id
        );
        const newData =
          existingItemIndex !== -1
            ? prevData.map((existingItem, index) =>
              index === existingItemIndex ? item : existingItem
            )
            : [...prevData, item];
        return newData;
      });
    }
  }, [item]);
  const handleDeleteItem = (id) => {
    setData((prevData) => prevData.filter(item => item.id !== id));
  };
  const edit = () => {
    const screenMap = {
      Appliances: SCREEN.Appliances,
      Construction: SCREEN.Construction,
      TV: SCREEN.TV,
      Motorcycle: SCREEN.Motorcycle,
      Boats: SCREEN.Boats,
      Boxes: SCREEN.Boxes,
      Bike: SCREEN.Bike,
      Bed: SCREEN.SpecificItem,
    };
    const screenName = screenMap[item?.title] || SCREEN.Default;
    navigate(screenName, {
      item: {
        ...item,
        selectedTVSize: selectedOption,
      },
      pickupdetails,
      destinationdetails,
      pickuppoint,
      destination,
      itemdetails: data,
      selectedItems,
      isEditMode,
    });
  };
  const sub = () => {
    const nextScreen = isEditMode ? SCREEN.Summery : SCREEN.AddHelpers;
    navigation.navigate(nextScreen, {
      pickupdetails,
      destinationdetails,
      itemdetails: data,
      pickuppoint,
      destination,
      deliverydetails,
      date,
      time,
    });
  };
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Add Items"} />
        <Spacer isBasic />
        <RegularText style={styles.text}>
          Select Items that you want to deliver
        </RegularText>
        <Spacer isBasic />
      </ComponentWrapper>
      <FlatList
        data={data}
        removeClippedSubviews={false}
        renderItem={({ item }) => {
          return (
            <SelectedItemCard
              onPressEdit={edit}
              onPressDelete={() => handleDeleteItem(item?.id)}
              item={item}
              title={item?.title}
            />
          );
        }}
        ItemSeparatorComponent={<Spacer isSmall />}
        ListHeaderComponent={<Spacer isSmall />}
        ListFooterComponent={
          <ComponentWrapper>
            <Spacer isBasic />
            <RegularText
              color={colors.appTextColor10}
              style={{
                textAlign: "center",
                fontFamily: fontFamily.appTextLight,
              }}
            >
              {
                "Curabitur ultrices tortor et venenatis cursus. Sed vel ante eros. Donec semper viverra venenatis."
              }
            </RegularText>
            <LargeText
              onPress={() =>
                navigate(SCREEN.ItemDetail, {
                  pickupdetails,
                  destinationdetails,
                  itemdetails: data,
                  deliverydetails,
                  date,
                  time,
                  isEditMode,
                })
              }
              style={styles.footer}
            >
              {"Add More Item"}
            </LargeText>
          </ComponentWrapper>
        }
      />
      <DueButtons onPress={sub} text={"continue"} onBack={() => goBack()} />
    </MainWrapper>
  );
}

export default SelectedItems

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.appTextColor2,

  },
  footer: {
    color: colors.appTextColor1,
    textAlign: 'center',
    marginTop: 16,
  }
})