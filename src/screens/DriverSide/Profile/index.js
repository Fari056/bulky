import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ComponentWrapper, MainHeader, MainWrapper, ScrollView } from '../../../components'
import { ImageSection } from './ImageSection'
import { InfoSection } from './InfoSection'
import InputForm from './Form'
import { useSelector , useDispatch} from 'react-redux'
import { signin } from '../../../redux/actions'
import { updateData } from '../../../backend/utility'
const Profile = ({navigation}) => {
  const { navigate } = navigation;
    const [editMode, setMode] = useState(false)
    const user_redux = useSelector(state => state.user)
    const [user, setUser] = useState(user_redux)
    // console.log(user)
    const dispatch = useDispatch();
    useEffect(() => {
        setUser(user_redux)
    }, [user_redux])
  const handleUpdateUser = async(updatedUser) => {
     dispatch(signin(updatedUser));
    setMode(false);
    await updateData("users", updatedUser.id, updatedUser);
  };
  const edit_img = (newUri) => {
    setUser((prevUser) => ({
      ...prevUser,
      photo: newUri,
    }));
  };
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
        </ComponentWrapper>
        <ScrollView>
          <ImageSection
            editMode={editMode}
            uri={user?.photo}
            onProfileImageChange={edit_img}
          />
          {editMode && (
            <ComponentWrapper>
              <InputForm user={user} setUser={setUser} />
            </ComponentWrapper>
          )}
          {!editMode && <InfoSection user={user} />}
        </ScrollView>
      </MainWrapper>
    );
}

export default Profile