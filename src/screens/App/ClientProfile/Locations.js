import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Icons } from '../../../assets'
import { ButtonColored, MediumText, RegularText, RowWrapper, RowWrapperBasic, Spacer, TinyTitle, Wrapper } from '../../../components'
import { width } from 'react-native-dimension'
import { appStyles, fontFamily, fontSize } from '../../../utilities'
import { Icon } from 'react-native-elements'
import { colors } from '../../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFromArray } from '../../../backend/utility'
import { signin } from '../../../redux/actions'
const Locations = ({ onPressAddLocation }) => {
  const [locations, setLocations] = useState([]);
  const user_redux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user_redux.favoriteAddress) {
      setLocations(user_redux.favoriteAddress);
    }
  }, [user_redux.favoriteAddress]);
  const chunkText = (text, wordsPerLine) => {
    const words = text.split(" ");
    let lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines.join("\n");
  };
  const split_name = (name) => {
    const words = name.split(" ");
    const title = words.slice(0, 2).join(" ");
    const address = words.slice(2).join(" ");
    return { title, address: chunkText(address, 4) };
  };
  const deleteLocation = async (index) => {
    try {
      await deleteFromArray(
        "users",
        user_redux.id,
        "favoriteAddress",
        index
      );
      const updatedLocations = locations.filter((_, i) => i !== index);
      setLocations(updatedLocations);
      const updatedUser = {
        ...user_redux,
        favoriteAddress: updatedLocations,
      };
      dispatch(signin(updatedUser));
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const LocationCard = ({ text, title, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, appStyles.shadow]}
    >
      <RowWrapperBasic>
        <Image style={styles.icon} source={Icons.marker} />
        <Spacer isBasic horizontal />
        <Wrapper>
          <TinyTitle style={styles.title}>{title}</TinyTitle>
          <Spacer isXTiny />
          <RegularText
            style={styles.text}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {text}
          </RegularText>
        </Wrapper>
      </RowWrapperBasic>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => deleteLocation(index)}
      >
        <Icon name="trash" type="ionicon" size={22} color={"#FF0000"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <Wrapper>
      <Spacer isDoubleBase />
      <TinyTitle>{"Add Favorite Locations"}</TinyTitle>
      <Spacer isSmall />
      {user_redux.favoriteAddress &&
        user_redux.favoriteAddress.map((location, index) => {
          const { title, address } = split_name(location.name);
          return (
            <LocationCard
              key={index}
              title={title}
              text={address}
              index={index}
            />
          );
        })}
      <Spacer isBasic />
      <ButtonColored text="Add Location" onPress={onPressAddLocation} />
    </Wrapper>
  );
}

export default Locations
const styles = StyleSheet.create({
  icon: {
    height: width(8),
    width: width(8),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 3

  },
  title: {
    fontSize: fontSize.medium
  },
  text: {
    fontFamily: fontFamily.appTextLight,
    color: colors.appTextColor16

  }
})