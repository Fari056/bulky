import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Spacer, TextInputBordered, TinyTitle, Wrapper } from '../../../components'
import { CustomDropDown } from '../../../components/appComponents/staticComponents'
import { VehicleName, vehicleCompanies } from '../../../../tempData'
import { useSelector } from 'react-redux'
import { useNavigation } from "@react-navigation/native";
import { SCREEN } from '../../../constants'
const InputForm = ({ user, setUser }) => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const account_redux = useSelector(state => state?.account_type)
  const [Company, setCompany] = useState(user.make || "");
  const [Vehicle, setVehicle] = useState(user.model || "");
  const edit = (field, value) => {
    setUser({ ...user, [field]: value });
  };
  const snd = () => {
    navigate(SCREEN.location);
  };
  return (
    <Wrapper>
      <TinyTitle>Personal Information </TinyTitle>
      <Spacer isSmall />
      <TextInputBordered
        title={"First Name"}
        value={user.firstName}
        placeholder={"First Name"}
        onChangeText={(text) => edit("firstName", text)}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={"Last Name"}
        value={user.lastName}
        placeholder={"Last Name"}
        onChangeText={(text) => edit("lastName", text)}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={"Phone Number"}
        value={user.phone}
        placeholder={"Enter your phone number"}
        onChangeText={(text) => edit("phone", text)}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={"Location"}
        value={user?.location}
        placeholder={"Enter your location"}
        editable={false}
        onPress={snd}
      />
      <Spacer isSmall />
      <TinyTitle>Vehicle Details </TinyTitle>
      <CustomDropDown
        title={"Vehicle Company"}
        placeholder={"Select vehicle company"}
        initialItems={vehicleCompanies}
        value={Company}
        setValue={(value) => {
          setCompany(value);
          edit("make", value);
        }}
      />
      <CustomDropDown
        title={"Vehicle Name"}
        placeholder={"Select vehicle name"}
        initialItems={VehicleName}
        value={Vehicle}
        setValue={(value) => {
          setVehicle(value);
          edit("model", value);
        }}
      />
      <Spacer isSmall />
    </Wrapper>
  );
}

export default InputForm

const styles = StyleSheet.create({})