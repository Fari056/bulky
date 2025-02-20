import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermissions,
} from "react-native-vision-camera";
import { Icon } from "react-native-elements";
import {
  MainWrapper,
  AbsoluteWrapper,
  ButtonColored,
  SmallTitle,
  MediumText,
  RegularText,
  Spacer,
  Wrapper,
} from "../../../components";
import { colors, SCREEN } from "../../../constants";
import { width, height } from "react-native-dimension";
import { useDispatch } from "react-redux";
import { saveData, uploadScan } from "../../../backend/utility";
import { getCurrentUserId } from "../../../backend/auth";
import { signin } from "../../../redux/actions";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
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
    }
  } catch (error) {
    console.error("Failed to request camera permission:", error);
    return false;
  }
};

const CardScanner = ({ navigation, route }) => {
  const { navigate, goBack } = navigation;
   const { scanDrivingCard, driverdata } = route?.params;
   const { insuranceImg } = route?.params;
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [cameraInitialized, setCameraInitialized] = useState(false);
  const [count, setCount] = useState(1);
  const [imageUris, setImageUris] = useState([]);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef();
  const device = useCameraDevice("back");
   const dispatch = useDispatch();
  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await requestCameraPermission();
      setCameraPermissionGranted(hasPermission);
    };
    checkPermissions();
  }, []);
  const snd_db = async (licenseImg) => {
    const _uid = await getCurrentUserId();
    const Data = {
      ...driverdata,
      licenseImg,
      insuranceImg,
      userId: _uid
    };
    const res = await saveData("users", _uid, Data);
    if (res) {
      dispatch(signin(Data));
      navigate(SCREEN.driverProfileCompleted);
    }
  };
  const submit = async () => {
    if (!cameraRef.current || count > 2 || !cameraInitialized) return;
    setLoading(true);
    try {
      const photo = await cameraRef.current.takePhoto();
      const newImageUri = photo.path;
      const fileName = `profile/${Date.now()}_card_image_${count}.jpg`;
      const url = await uploadScan(newImageUri, fileName);
      setImageUris((prevUris) => [...prevUris, url]);
      setCount(count + 1);
      if (count === 2) {
        if (scanDrivingCard) {
          const licenseImg = [...imageUris, url];
          await snd_db(licenseImg);
        } else {
           const insuranceImg = [...imageUris, url];
           navigate(SCREEN.scanDriverInsuranceCard, {
             scanDrivingCard: true,
             insuranceImg,
             driverdata,
           });
        }
      }
    } catch (error) {
      console.error("Error capturing or uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  if (!cameraPermissionGranted || !device) {
    return <ActivityIndicator color={colors.primary} size={"large"} />;
  }
  return (
    <MainWrapper style={{ flex: 1 }}>
      <Wrapper style={{ flex: 1 }}>
        {cameraPermissionGranted && device && (
          <Camera
            style={{ flex: 1 }}
            ref={cameraRef}
            photo={true}
            isActive={true}
            device={device}
            onInitialized={() => setCameraInitialized(true)}
          />
        )}
        <AbsoluteWrapper style={styles.absoluteWrapper}>
          <Spacer isBasic />
          <TouchableOpacity onPress={() => goBack()}>
            <Icon
              name="chevron-back-outline"
              type="ionicon"
              style={styles.icon}
              color={colors.appIcon5}
            />
          </TouchableOpacity>
          <Spacer isBasic />
          <SmallTitle style={styles.title}>
            Scan Your {scanDrivingCard ? "Driving License" : "Insurance Card"}
          </SmallTitle>
          <Spacer isSmall />
          <MediumText style={styles.count}>{`${count}/2`}</MediumText>
          <Spacer isSmall />
          <RegularText style={styles.desc}>
            Place the {count === 1 ? "front" : "back"} side of your card on the
            blue box
          </RegularText>
        </AbsoluteWrapper>
      </Wrapper>
      <AbsoluteWrapper style={styles.btn}>
        <ButtonColored isLoading={loading} text="NEXT" onPress={submit} />
      </AbsoluteWrapper>
    </MainWrapper>
  );
};

export default CardScanner;

const styles = StyleSheet.create({
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionDeniedText: {
    fontSize: 16,
    color: colors.appTextColor3,
    textAlign: "center",
  },
  settingsLink: {
    color: colors.primary,
    marginTop: 10,
    fontSize: 16,
  },
  absoluteWrapper: {
    alignSelf: "center",
  },
  icon: {
    alignSelf: "flex-start",
  },
  title: {
    color: colors.appTextColor3,
    alignSelf: "center",
  },
  count: {
    color: colors.appTextColor3,
    alignSelf: "center",
  },
  desc: {
    color: colors.appTextColor3,
  },
  btn: {
    bottom: height(5),
    right: width(5),
    left: width(5),
  },
});
