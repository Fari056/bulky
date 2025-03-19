import { GOOGLE_API_KEY } from "@env"
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Geocoder from 'react-native-geocoding'
import { ComponentWrapper, DueButtons, MainHeader, MainWrapper, RegularTextBlack } from '../../../../../components'
import { SCREEN } from '../../../../../constants'
import { LocationDetailCard } from '../../components'
import { useDispatch } from "react-redux"
import { setRequestData } from "../../../../../redux/actions"

const LocationDetail = ({ navigation, route }) => {
  const { pickuppoint, destination } = route.params;
  const { navigate, goBack } = navigation
  const [pActive, setPActive] = useState(null)
  const [dActive, setDActive] = useState(null)
  const [pCount, setPCount] = useState(1)
  const [dCount, setDCount] = useState(1)
  const [pickupName, setPickupName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const dispatch = useDispatch();
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
  const edit = () => {
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

            let pickupdetails = {
              pickupaddress: pickupName,
              elevator: pActive,
              floors: pCount,
              cords: pickuppoint,
            }
            let destinationdetails = {
              destination: destinationName,
              elevator: dActive,
              floors: dCount,
              cords: destination,
            }
            dispatch(setRequestData({ pickupdetails, destinationdetails }))
            navigate(SCREEN.ItemDetail, {
              pickupdetails,
              destinationdetails
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