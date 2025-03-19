import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper, RegularText, Spacer, TextInputSearch, Wrapper } from '../../../../../components'
import { SCREEN, colors } from '../../../../../constants'
import { ItemCard } from '../../components'
import { totalSize } from 'react-native-dimension'
import { Itemdata } from '../../../../../../tempData'
const ItemDetails = ({ navigation, route }) => {
  const {
    pickupdetails,
    destinationdetails,
    itemdetails,
    pickuppoint,
    destination,
    deliverydetails,
    date,
    time,
    isEditMode,
  } = route.params;
  const { navigate, onSave } = navigation
  const scrn_map = {
    Bed: SCREEN.SpecificItem
    //  || SCREEN.Bed
    ,
    Bike: SCREEN.Bike,
    Boxes: SCREEN.Boxes,
    Boats: SCREEN.Boats,
    Motorcycle: SCREEN.Motorcycle,
    TV: SCREEN.TV,
    Construction: SCREEN.Construction,
    Appliances: SCREEN.Appliances,
  };
  const press = (item) => {
    const screen = scrn_map[item.type];
    if (screen) {
      navigate(screen, {
        pickupdetails,
        destinationdetails,
        item,
        itemdetails,
        pickuppoint,
        destination,
        isEditMode,
        deliverydetails,
        date,
        time,
      });
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
        <TextInputSearch placeholder={"Search for item"} />
        <Spacer isBasic />
        <RegularText style={[styles.text, { fontSize: totalSize(1.8) }]}>
          or
        </RegularText>
        <Spacer isBasic />
        <RegularText
          style={{ textAlign: "center" }}
          color={colors.appTextColor11}
        >
          Select From here
        </RegularText>
        <Spacer isBasic />
      </ComponentWrapper>
      <Wrapper flex={1}>
        <FlatList
          data={Itemdata}
          keyExtractor={(item) => item.uniqueId}
          ItemSeparatorComponent={<Spacer isSmall />}
          ListHeaderComponent={<Spacer isSmall />}
          ListFooterComponent={<Spacer isSmall />}
          renderItem={({ item }) => {
            return <ItemCard title={item?.title} onPress={() => press(item)} />;
          }}
        />
      </Wrapper>
    </MainWrapper>
  );
}

export default ItemDetails

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.appTextColor2
  },
})