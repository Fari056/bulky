import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { BottomSheet, ComponentWrapper, InputTitle, MainWrapper, ScrollView, Spacer } from '../../../components'
import { AbsoluteButton, EditProfile, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { ProfileForm } from '../../../components/appComponents/generalComponents'
import { Images, PickPhotoFromGallery, takePhotoFromCamera } from '../../../utilities'
import { colors, SCREEN } from '../../../constants'
import { useAuth } from '../../../hooks'
import { width, height } from 'react-native-dimension'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from "@env";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const CompleteProfile = ({ navigation, route }) => {
  const { replace, navigate } = navigation
  const RBSheet1 = useRef();

  const {
    CompleteProfile: completeProfile, loading,
    phoneNumber, setPhone,
    profile, setProfile,
    firstName, setFirstName,
    lastName, setLastName,
    location, setLocation,
  } = useAuth()

  // useEffect(() => {
  //   if (route.params?.location) {
  //     setLocation(route.params.location);
  //   }
  // }, [route.params?.location]);
  const openCamera = async () => {
    let image = await takePhotoFromCamera()
    RBSheet1.current.close()
    setProfile(image)
  }
  const openGallery = async () => {
    let image = await PickPhotoFromGallery()
    RBSheet1.current.close()
    setProfile(image)
  }
  const snd = () => {
    navigate(SCREEN.Profilelocation);
  };
  return (
    <MainWrapper>
      <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS === 'ios' ? 150 : 100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <ComponentWrapper>
          <Spacer isDoubleBase />
          <TitleWithDescription title={"Complete Your Profile"} />
          <Spacer isBasic />
          <EditProfile
            onPress={() => RBSheet1.current.open()}
            source={profile?.path ? { uri: profile?.path } : { uri: Images.user1 }}
          />
          <Spacer height={height(3)} />
          <ProfileForm
            firstName={firstName}
            onChangeFirstName={(e) => setFirstName(e)}
            secondName={lastName}
            onChangeSecondName={(e) => setLastName(e)}
            phone={phoneNumber}
            onChangePhone={(e) => setPhone(e)}
            location={location?.address}
          />
          <InputTitle>Location</InputTitle>
          <Spacer isSmall />
          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            fetchDetails={true}
            keyboardShouldPersistTaps="handled"
            onPress={(data, details) => {
              const { lat, lng } = details.geometry.location;
              setLocation({
                address: data.description,
                latitude: lat,
                longitude: lng,
              });
            }}
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
        </ComponentWrapper>
        <BottomSheet
          heights={height(25)}
          onCameraPress={openCamera}
          onGalleryPress={openGallery}
          onClosePress={() => RBSheet1.current.close()}
          innerRef={RBSheet1}
        />
        <Spacer isDoubleBase />
        <Spacer isDoubleBase />
        <Spacer isDoubleBase />
        <Spacer isDoubleBase />
        <AbsoluteButton
          title={"NEXT"}
          isLoading={loading}
          onPress={completeProfile}
        />
      </KeyboardAwareScrollView>
      {/* <AbsoluteButton title={'NEXT'} onPress={() => account_redux == 'driver' ? navigate(SCREEN.completeDriverProfile) : account_redux == 'helper' ? replace(SCREEN.driverStack) : replace(SCREEN.appStack)} /> */}
    </MainWrapper>
  );
}

export default CompleteProfile

const styles = StyleSheet.create({
  searchContainer: {
    width: width(90),
    alignSelf: "center",
    zIndex: 1,
  },
  textInput: {
    color: "#1A1A1A",
    borderWidth: 1,
    height: height(6),
    borderRadius: 10,
    width: width(90),
    borderColor: colors.appBorder2,
    backgroundColor: colors.appBgColor2,
  },
});