import { View, Text } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { BottomSheet, ComponentWrapper, MainWrapper, ScrollView, Spacer } from '../../../components'
import { AbsoluteButton, EditProfile, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { ProfileForm } from '../../../components/appComponents/generalComponents'
import { Images, PickPhotoFromGallery, takePhotoFromCamera } from '../../../utilities'
import { height } from 'react-native-dimension'
import { SCREEN } from '../../../constants'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../hooks'

const CompleteProfile = ({ navigation, route }) => {
      const { replace, navigate } = navigation
    const RBSheet1 = useRef();

    const {
        CompleteProfile, loading,
        phoneNumber, setPhone,
        profile, setProfile,
        firstName, setFirstName,
        lastName, setLastName,
        location, setLocation,
    } = useAuth()
useEffect(() => {
  if (route.params?.location) {
    setLocation(route.params.location);
  }
}, [route.params?.location]);
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
        <ScrollView>
          <ComponentWrapper>
            <Spacer isDoubleBase />
            <TitleWithDescription title={"Complete Your Profile"} />
            <Spacer isBasic />
            <EditProfile
              onPress={() => RBSheet1.current.open()}
              source={
                profile?.path ? { uri: profile?.path } : { uri: Images.user1 }
              }
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
              onChangeLocation={(e) => setLocation(e)}
              onPress={snd}
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
            // onPress={() => account_redux !== 'client' ? navigate(SCREEN.selectPaymentMethods) : replace(SCREEN.appStack)} />
            onPress={CompleteProfile}
          />
        </ScrollView>
        {/* <AbsoluteButton title={'NEXT'} onPress={() => account_redux == 'driver' ? navigate(SCREEN.completeDriverProfile) : account_redux == 'helper' ? replace(SCREEN.driverStack) : replace(SCREEN.appStack)} /> */}
      </MainWrapper>
    );
}

export default CompleteProfile