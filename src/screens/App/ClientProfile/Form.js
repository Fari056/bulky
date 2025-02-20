import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PrimaryImage, Spacer, TextInputBordered, Wrapper } from '../../../components'
import { Icons } from '../../../assets'
import {totalSize} from 'react-native-dimension'
import { SCREEN } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
const InputForm = ({user, setuser}) => {
     const navigation = useNavigation(); 
      const { navigate } = navigation;
        const snd = ()=>{
            navigate(SCREEN.location)
        }
      const edit = (field, value) => {
       setuser({ ...user, [field]: value });
     };
    return (
      <Wrapper>
        <TextInputBordered
          title={"First Name"}
          placeholder={"Jahanzaib"}
          value={user?.firstName}
          onChangeText={(text) => edit("firstName", text)}
        />
        <Spacer isSmall />
        <TextInputBordered
          title={"Last Name"}
          placeholder={"Shoaib"}
          value={user?.lastName}
          onChangeText={(text) => edit("lastName", text)}
        />
        <Spacer isSmall />
        <TextInputBordered
          title={"Phone Number"}
          placeholder={"Enter your phone number"}
          value={user?.phone}
          onChangeText={(text) => edit("phone", text)}
        />
        <Spacer isSmall />
        <TextInputBordered
          title={"Location"}
          placeholder={"Enter your location"}
          editable={false}
          onPress={snd}
          value={user?.location}
          right={<PrimaryImage size={totalSize(2.8)} source={Icons.marker} />}
        />
      </Wrapper>
    );
}

export default InputForm

const styles = StyleSheet.create({})