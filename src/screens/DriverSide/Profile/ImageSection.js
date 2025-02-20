import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { Avatar, BottomSheet, MediumText, SmallText, Spacer, TinyTitle, Wrapper } from '../../../components'
import { Images, PickPhotoFromGallery, appStyles, takePhotoFromCamera } from '../../../utilities'
import { totalSize, height } from 'react-native-dimension'
import { EditProfile } from '../../../components/appComponents/staticComponents'
import { colors } from '../../../constants'
import { uploadFile } from '../../../backend/utility'
export const ImageSection = ({ uri, editMode, onProfileImageChange }) => {
    const RBSheet1 = useRef();
     const [profileUri, setProfileUri] = useState(uri);
     const ImgUpload = async (localPath) => {
       const fileName = `profile/${Date.now()}_profile_image.jpg`;
       try {
         const firebaseUrl = await uploadFile(localPath, fileName);
         setProfileUri(firebaseUrl);
         onProfileImageChange(firebaseUrl);
       } catch (error) {
         console.error("Image upload failed:", error);
       }
     };
    const openCamera = async () => {
        let image = await takePhotoFromCamera()
         if (image && image.path) {
           await ImgUpload(image.path);
         }
        RBSheet1.current.close()
        // setProfile(image)
    }

    const openGallery = async () => {
        let image = await PickPhotoFromGallery()
         if (image && image.path) {
           await ImgUpload(image.path);
         }
        RBSheet1.current.close()
        // setProfile(image)
    }

    return (
        <>
            <Spacer isBasic />
            {editMode && <EditProfile onPress={() => RBSheet1.current.open()} source={{ uri: uri ?? Images.user4 }} />}
            {!editMode && <Wrapper style={appStyles.center} >
                <Avatar source={{ uri: uri ?? Images.user4 }} size={totalSize(13)} />
                <Spacer isSmall />
                <MediumText>Rating:{' '}
                    <MediumText color={colors.appTextColor27}>4.3</MediumText>
                    <SmallText>(43)</SmallText>
                </MediumText>
            </Wrapper>}
            <Spacer isBasic />
            <Spacer isBasic />
            <BottomSheet heights={height(25)} onCameraPress={openCamera} onGalleryPress={openGallery} onClosePress={() => RBSheet1.current.close()} innerRef={RBSheet1} />
        </>
    )
}
