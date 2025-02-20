import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, useCameraDevices , useCameraDevice} from "react-native-vision-camera";
import { CameraFooter, CameraHeader, MainWrapper } from "../../../components";
import { SCREEN, colors } from "../../../constants";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { uploadScan } from "../../../backend/utility";
const requestCameraPermission = async () => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  try {
    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log("Camera permission granted");
      return true;
    } else if (result === RESULTS.DENIED) {
      Alert.alert(
        "Camera Permission",
        "Camera permission is required to use this feature. Please enable it in the settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        "Camera Permission",
        "Camera permission has been denied permanently. You can enable it in the settings.",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
      return false;
    }
  } catch (error) {
    console.error("Failed to request camera permission:", error);
    return false;
  }
};
const DeliveryPicture = ({ navigation }) => {
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const { navigate } = navigation;
  const devices = useCameraDevices();
  const cameraRef = useRef();
  const device = useCameraDevice("back");
 useEffect(() => {
   const checkPermissions = async () => {
     const hasPermission = await requestCameraPermission();
     if (hasPermission) {
       setCameraPermissionGranted(true);
     } else {
       setCameraPermissionGranted(false);
     }
   };
   checkPermissions();
 }, []);
 if (!device || !cameraPermissionGranted) {
   return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <Text>Loading camera...</Text>
       <ActivityIndicator color={colors.primary} size={"large"} />
     </View>
   );
 }
    const img = async () => {
      if (!cameraRef.current) {
         return;
      }
      try {
        const photo = await cameraRef.current.takePhoto();
        const uri = photo.path;
        const fileName = `images/${new Date().toISOString()}.jpg`;
        const imageUrl = await uploadScan(uri, fileName);
        navigate(SCREEN.review, { imageUrl });
      } catch (error) {
        console.error("Error capturing or uploading image:", error);
         }
    };

  return (
    <MainWrapper style={{ flex: 1 }}>
      <CameraHeader />
      <Camera
        style={{ flex: 1 }}
        ref={cameraRef}
        photo={true}
        isActive={true}
        device={device}
      />
      <CameraFooter onPress={img} />
    </MainWrapper>
  );
};

export default DeliveryPicture;
