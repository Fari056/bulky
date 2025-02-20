import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ComponentWrapper, DueButtons, MainHeader, MainWrapper, RegularTextBlack } from '../../../../../components'
import { LocationDetailCard } from '../../components'
import { SCREEN } from '../../../../../constants'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from "@env";
const LocationDetail = ({ navigation, route }) => {
  const { pickuppoint, destination } = route.params;
  const { navigate, goBack } = navigation
  const [pActive, setPActive] = useState(null)
  const [dActive, setDActive] = useState(null)
  const [pCount, setPCount] = useState(1)
  const [dCount, setDCount] = useState(1)
  const [pickupName, setPickupName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  Geocoder.init(GOOGLE_API_KEY);

  useEffect(() => {
    const fetchLocationName = async (latitude, longitude, setterFunction) => {
      try {
        const res = await Geocoder.from(latitude, longitude);
        const addressComponent = res.results[0].formatted_address;
        setterFunction(addressComponent);
      } catch (error) {
        console.error(error);
        setterFunction("Unable to fetch address");
      }
    };

    if (pickuppoint) {
      fetchLocationName(
        pickuppoint.latitude,
        pickuppoint.longitude,
        setPickupName
      );
    }
    if (destination) {
      fetchLocationName(
        destination.latitude,
        destination.longitude,
        setDestinationName
      );
    }
  }, [pickuppoint, destination]);

  const Valid = () => {
    return pickuppoint && destination && pActive !== null && dActive !== null;
  };
  const edit = ()=>{
    goBack();
  }

  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Location Details"} />
        <RegularTextBlack style={styles.text}>
          Please add location details
        </RegularTextBlack>
        <LocationDetailCard
          title={"Pickup Point"}
          value={pickupName}
          count={pCount}
          setCount={setPCount}
          setActive={setPActive}
          active={pActive}
          onEditPress={edit}
        />
        <LocationDetailCard
          title={"Drop Off Point"}
          value={destinationName}
          count={dCount}
          setCount={setDCount}
          setActive={setDActive}
          active={dActive}
          onEditPress={edit}
        />
      </ComponentWrapper>
      <DueButtons
        text={"Continue"}
        onBack={() => goBack()}
        onPress={() => {
          if (Valid()) {
            navigate(SCREEN.ItemDetail, {
              // pickuppoint,
              // destination,
              pickupdetails: {
                pickupaddress: pickupName,
                elevator: pActive,
                floors: pCount,
                cords: pickuppoint,
              },
              destinationdetails: {
                destination: destinationName,
                elevator: dActive,
                floors: dCount,
                cords: destination,
              },
            });
          }
        }}
        // disabled={pActive == null || dActive == null || Valid()}
        disabled={!Valid()} />
    </MainWrapper>
  );
}

export default LocationDetail

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 24
  }
})