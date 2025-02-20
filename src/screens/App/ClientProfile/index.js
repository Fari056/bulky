import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ComponentWrapper, MainHeader, MainWrapper, ScrollView, Spacer, } from '../../../components'
import { ImageSection } from './ImageSection'
import { InfoSection } from './InfoSection'
import Locations from './Locations'
import InputForm from './Form'
import { SCREEN } from '../../../constants'
import { signin } from '../../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../../../backend/utility'
const ClientProfile = ({ navigation, route }) => {
    const { navigate } = navigation
    const [editMode, setMode] = useState(false)
    const user_redux = useSelector(state => state.user)
    // console.log(user_redux)
    const [user, setUser] = useState(user_redux)
    const dispatch = useDispatch();
     useEffect(() => {
        setUser(user_redux)
    }, [user_redux])
     const handleUpdateUser = async (updatedUser) => {
       dispatch(signin(updatedUser));
       setMode(false);
       await updateData("users", updatedUser.id, updatedUser);
     };
     const edit_img=(newUri)=>{
      setUser((prevUser) => ({
        ...prevUser,
        photo: newUri,
      }));
     }
    return (
      <MainWrapper>
        <ComponentWrapper>
          <MainHeader
            title={"Profile"}
            right={editMode ? "Done" : "Edit"}
            onPressRight={() => {
              if (editMode) {
                handleUpdateUser(user);
              }
              setMode(!editMode);
            }}
          />
          <ScrollView>
            <ImageSection uri={user?.photo} editMode={editMode} onProfileImageChange={edit_img} />
            {editMode && <InputForm user={user} setuser={setUser} />}
            {!editMode && <InfoSection user={user} />}
            {!editMode && (
              <Locations
                onPressAddLocation={() =>
                  navigate(SCREEN?.enterPickupPoint, { profileLocation: true })
                }
              />
            )}
            <Spacer isBasic />
            <Spacer isBasic />
            <Spacer isBasic />
          </ScrollView>
        </ComponentWrapper>
      </MainWrapper>
    );
}

export default ClientProfile

const styles = StyleSheet.create({})