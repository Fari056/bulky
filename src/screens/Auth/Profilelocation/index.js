import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { useSelector, useDispatch } from "react-redux";
import { ComponentWrapper, MainHeader, MainWrapper } from "../../../components";
import { AbsoluteButton } from "../../../components/appComponents/staticComponents";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { updateData } from "../../../backend/utility";
import { signin } from "../../../redux/actions";
import { GOOGLE_API_KEY } from "@env";
import { SCREEN } from "../../../constants";
const { width, height } = Dimensions.get("window");
const ProfileLocation = ({ navigation }) => {
  const { goBack, navigate } = navigation;
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationName, setLocationName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    Geocoder.init(GOOGLE_API_KEY);
  }, []);
  const onMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      setLocationName(`${address} (Lat: ${latitude}, Lng: ${longitude})`);
      setSelectedLocation({ address, latitude, longitude });
      console.log(address, latitude, longitude);
    } catch (error) {
      console.warn(error);
    }
  };
  const onPlaceSelected = async (data, details = null) => {
    if (details) {
      const { lat, lng } = details.geometry.location;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setSelectedLocation({
        address: data.description,
        latitude: lat,
        longitude: lng,
      });
    }
  };
  const onContinue = () => {
    if (selectedLocation) {
      navigate(SCREEN.completeProfile, {
        location: {
          address: selectedLocation.address,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
      });
    }
  };

  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title="Add Location" />
      </ComponentWrapper>
      <MapView style={styles.map} region={region} onPress={onMapPress}>
        <Marker coordinate={region} />
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        fetchDetails={true}
        onPress={onPlaceSelected}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        styles={{
          container: styles.searchContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
      />
      <AbsoluteButton title="Done" onPress={onContinue} />
    </MainWrapper>
  );
};
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 40,
  },
  searchContainer: {
    position: "absolute",
    top: height * 0.08,
    width: "95%",
    alignSelf: "center",
    zIndex: 1,
  },
});
export default ProfileLocation;
