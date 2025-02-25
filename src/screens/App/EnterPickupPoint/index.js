import React, { useEffect, useRef, useState } from "react";
import {
  ComponentWrapper,
  MainHeader,
  MainWrapper,
} from "../../../components";
import {
  PickupPoints,
  Pickup,
  PreviousLocations,
} from "../../../components/appComponents/staticComponents";
import { SCREEN } from "../../../constants";
import { useSelector } from "react-redux";
import { saveData, getData } from "../../../backend/utility";
import Geocoder from "react-native-geocoding";
import { GOOGLE_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { signin } from "../../../redux/actions";
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const EnterPickupPoint = ({ navigation, route }) => {
  const { navigate, goBack } = navigation;
  const { profileLocation } = route?.params ?? "";
  // const [pickupPoint, setPickupPoint] = useState('')
  const [showBill, setShowBill] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const dispatch = useDispatch();
  const user_redux = useSelector((state) => state.user);
  const favoriteAddress = user_redux.favoriteAddress ?? [];
  const currentLoc = user_redux.cords || "";
  //  console.log(currentLoc)
  //  console.log(currentLoc.longitude);
  const [pickupText, setPickupText] = useState("");
  const [pickuppoint, setPickupPoint] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const dateTimeSheet = useRef();
  const pickupAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);
  Geocoder.init(GOOGLE_API_KEY);
  useEffect(() => {
    if (currentLoc) {
      Geocoder.from(currentLoc.latitude, currentLoc.longitude)
        .then((response) => {
          const address =
            response.results[0]?.formatted_address || "Unknown Address";
          setCurrentAddress(address);
        })
        .catch((error) => {
          console.error("Error fetching current address:", error);
          setCurrentAddress("Unable to fetch location");
        });
    }
  }, [currentLoc]);
  const handlePickupSelect = async (data, details) => {
    const { lat, lng } = details.geometry.location;
    if (data && details && details.geometry && details.geometry.location) {
      setPickupPoint({
        name: data.description,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
    }
    try {
      const response = await Geocoder.from(lat, lng);
      const address =
        response.results[0]?.formatted_address || "Unknown Address";
      setPickupText(address);
      const newPickupPoint = {
        name: address,
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setPickupPoints((prevPoints) => [...prevPoints, newPickupPoint]);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const handleDestinationSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;
    if (data && details && details.geometry && details.geometry.location) {
      setDestination({
        name: data.description,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
    }
  };
  const onPressDone = async () => {
    if (profileLocation) {
      try {
        const Data = await getData("users", user_redux.id, "favoriteAddress");
        const updatedPickupPoints = [...(Data || []), ...pickupPoints];
        const res = await saveData("users", user_redux.id, {
          favoriteAddress: updatedPickupPoints,
        });
        const updatedUser = {
          ...user_redux,
          favoriteAddress: updatedPickupPoints,
        };
        dispatch(signin(updatedUser));
        console.log("Favorites updated successfully:", res);
        navigate(SCREEN.clientProfile);
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    } else if (pickuppoint && destination) {
      navigate(SCREEN.locationDetail, {
        pickuppoint,
        destination,
      });
    }
  };
  const SavedLocation = (address) => {
    // console.log("address", address);
    setPickupPoint({
      latitude: address.latitude,
      longitude: address.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

    setPickupText(address.name);
    setDestination({
      name: address.name,
      latitude: address.latitude,
      longitude: address.longitude,
    });

    if (pickupAutocompleteRef.current && destinationAutocompleteRef.current) {
      pickupAutocompleteRef.current.setAddressText(address.name);
      destinationAutocompleteRef.current.setAddressText(address.name);
    }
  };
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Add Location"} />
        {profileLocation ? (
          <Pickup
            ref={pickupAutocompleteRef}
            showBill={showBill}
            onPressClose={() => setShowBill(!showBill)}
            pickupPoint={pickuppoint}
            onChangePickupPoint={handlePickupSelect}
          />
        ) : (
          <PickupPoints
            showBill={showBill}
            onPressClose={() => setShowBill(!showBill)}
            pickupPoint={pickuppoint}
            onChangePickupPoint={handlePickupSelect}
            onChangeDestination={handleDestinationSelect}
            currentLoc={currentLoc}
            pickupAutocompleteRef={pickupAutocompleteRef}
            destinationAutocompleteRef={destinationAutocompleteRef}
          />
        )}
      </ComponentWrapper>
      <PreviousLocations
        onPressDone={onPressDone}
        onPressPickup={() => setShowMap(true)}
        pickupPoint={pickuppoint}
        destination={destination}
        favoriteAddress={favoriteAddress}
        currentLoc={currentAddress}
        SavedLocation={SavedLocation}
      />
    </MainWrapper>
  );
};
export default EnterPickupPoint;