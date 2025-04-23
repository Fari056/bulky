import { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Switch,
  Animated,
  Linking,
  PermissionsAndroid,
  Platform, Alert, TextInput, Button
} from "react-native";
import {
  AbsoluteBackBtn,
  AbsoluteWrapper,
  BottomSheet,
  ButtonBorderd,
  ButtonColored,
  ButtonWithIcon,
  CameraButton,
  ComponentWrapper,
  Hrline,
  IconWithText,
  InputTitle,
  LargeText,
  MediumText,
  PrimaryImage,
  RegularText,
  RoundImage,
  RowWrapper,
  RowWrapperBasic,
  SmallTitle,
  Spacer,
  TextInputBordered,
  TextInputSearch,
  TinyTitle,
  TitleWithOption,
  Wrapper,
} from "../..";
import { Images } from "../../../utilities";
import { styles } from "./styles";
import MapViewDirections from "react-native-maps-directions";
import { totalSize, width, height } from "react-native-dimension";
import * as Animatable from "react-native-animatable";
import { colors, fontFamily } from "../../../constants";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";
import { DriverReview, GridImagesimages } from "../../../../tempData";
import LinearGradient from "react-native-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import ImagePicker from "react-native-image-crop-picker";
import { Icon } from "react-native-elements";
import { Strings } from "../../../constants/strings.js";
import { useClearByFocusCell } from "react-native-confirmation-code-field";
import MapSection from "../../../screens/App/Home/MapSection";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Bubble, InputToolbar, Send, Time } from "react-native-gifted-chat";
import { AirbnbRating } from "react-native-ratings";
import { Icons } from "../../../assets";
import { useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import { uploadImage } from "../../../backend/utility";

// SPLASH SCREEN
export const SplashScreen = () => {
  return (
    <Wrapper style={styles.splashContainer}>
      <Animatable.View animation={"fadeInLeft"}>
        <PrimaryImage source={Images.logo} />
      </Animatable.View>
      <Animatable.View animation={"bounceIn"} delay={1000}>
        <PrimaryImage styles={styles.slogan} source={Images.slogan} />
      </Animatable.View>
    </Wrapper>
  );
};



// ABSOLUTE BUTTON
export const AbsoluteButton = ({
  title,
  onPress,
  disabled,
  style,
  absoluteStyle,
  isLoading,
}) => {
  return (
    <AbsoluteWrapper style={[styles.absoluteButton, absoluteStyle]}>
      <ButtonColored
        style={style}
        isLoading={isLoading}
        disabled={disabled || isLoading}
        text={title}
        onPress={onPress}
      />
    </AbsoluteWrapper>
  );
};
// ABSOLUTE BUTTON with both colored and bordered button
export const AbsoluteButtonWithBorder = ({
  title,
  onPress,
  disabled,
  style,
  absoluteStyle,
  BorderedTitle,
  onPressBorderBtn,
}) => {
  return (
    <>
      <AbsoluteWrapper style={[styles.absoluteButtonBordered, absoluteStyle]}>
        <ButtonBorderd
          style={style}
          disabled={disabled}
          text={BorderedTitle}
          onPress={onPressBorderBtn}
        />
      </AbsoluteWrapper>
      <AbsoluteWrapper style={[styles.absoluteButton, absoluteStyle]}>
        <ButtonColored
          style={style}
          disabled={disabled}
          text={title}
          onPress={onPress}
        />
      </AbsoluteWrapper>
    </>
  );
};
// TITLE WITH DISCRIPTION
export const TitleWithDescription = ({
  title,
  titleStyle,
  description,
  descriptionStyle,
  descriptionColor,
}) => {
  return (
    <>
      <SmallTitle style={[styles.title, titleStyle]}>{title}</SmallTitle>
      <Spacer isSmall />
      <RegularText
        style={[
          styles.description,
          { color: descriptionColor ? descriptionColor : colors.appTextColor5 },
          descriptionStyle,
        ]}
      >
        {description}
      </RegularText>
    </>
  );
};
//ROW SIGNIN TEXT
export const SignInText = ({ onPressSignin, title, description }) => {
  return (
    <RegularText style={styles.signInText}>
      {description ? description : "Already have an account"}{" "}
      <RegularText
        style={{ color: colors.appTextColor7 }}
        onPress={onPressSignin}
      >
        {title ? title : "SIGN IN"}
      </RegularText>
    </RegularText>
  );
};

// SOCIAL ICONS WRAPPER
export const SocialWrapper = ({
  onPressGoogle,
  onPressFacebook,
  onPressApple,
}) => {
  return (
    <>
      <RegularText style={styles.continueText}>Continue with</RegularText>
      <Spacer isSmall />
      <RowWrapper style={{ marginHorizontal: width(11) }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressGoogle}
          style={styles.iconContainer}
        >
          <PrimaryImage size={totalSize(3.5)} source={Images.google} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.iconContainer}
          onPress={onPressFacebook}
        >
          <PrimaryImage size={totalSize(3.5)} source={Images.facebook} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressApple}
          style={styles.iconContainer}
        >
          <PrimaryImage size={totalSize(3.5)} source={Images.apple} />
        </TouchableOpacity>
      </RowWrapper>
    </>
  );
};
// PROFILE WITH CAMERA ICON
export const EditProfile = ({ source, onPress }) => {
  return (
    <Wrapper style={styles.container}>
      <RoundImage source={source} size={totalSize(13)} style={styles.profile} />
      <CameraButton
        buttonStyle={styles.editIcon}
        iconName={"camerao"}
        iconType={"antdesign"}
        iconColor={colors.appIcon5}
        iconSize={totalSize(1.75)}
        onPress={onPress}
      />
    </Wrapper>
  );
};
// OTP CODE INPUT
export const OTPInput = ({
  props,
  value,
  onChangeText,
  getCellOnLayoutHandler,
}) => {
  const ref = useBlurOnFulfill({ value });
  return (
    <CodeField
      cellCount={6}
      ref={ref}
      {...props}
      value={value}
      onChangeText={onChangeText}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <MediumText
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </MediumText>
      )}
    />
  );
};

// COUNT DOWN FOR OTP SCREEN
export const Countdown = () => {
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, minutes]);

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  return (
    <>
      <LargeText style={styles.time}>{formattedTime}</LargeText>
      <Spacer isSmall />
      <RegularText style={styles.sendAgain}>Send again</RegularText>
    </>
  );
};
// DRIVER PROFILE WITH DESCRIPTION
export const DriverProfileTitle = ({ description }) => {
  return (
    <>
      <Spacer isDoubleBase />
      <SmallTitle style={styles.title}>Complete Your Profile</SmallTitle>
      <TinyTitle style={styles.driverDesc}>{description}</TinyTitle>
      <Spacer height={height(4)} />
    </>
  );
};
//DROP DOWN

const useCustomDropDown = (initialItems) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(initialItems);

  return { open, setOpen, value, setValue, items, setItems };
};
export const CustomDropDown = ({
  title,
  initialItems,
  placeholder,
  value,
  setValue,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialItems);

  return (
    <Wrapper style={[styles.mainDropDown, { zIndex: open ? 100 : 10 }]}>
      <InputTitle style={{ marginBottom: 8 }}>{title} </InputTitle>
      <Wrapper>
        <DropDownPicker
          placeholder={placeholder}
          placeholderStyle={{ color: colors.appTextColor12 }}
          showTickIcon={true}
          style={[styles.dropDown]}
          open={open}
          setOpen={setOpen}
          value={value}
          items={items}
          setValue={setValue}
          onChangeValue={setValue}
          setItems={setItems}
          listMode="FLATLIST"
          dropDownContainerStyle={[styles.dropDownContainer, { marginTop: 8 }]}
        />
      </Wrapper>
    </Wrapper>
  );
};

export const RowCustomDropDown = ({
  title,
  initialItems,
  initialItems1,
  placeholder,
  title2,
  placeholder2,
}) => {
  const {
    open: open1,
    setOpen: setOpen1,
    value: value1,
    setValue: setValue1,
    items: items1,
    setItems: setItems1,
  } = useCustomDropDown(initialItems);
  const {
    open: open2,
    setOpen: setOpen2,
    value: value2,
    setValue: setValue2,
    items: items2,
    setItems: setItems2,
  } = useCustomDropDown(initialItems1);

  return (
    <Wrapper style={{ zIndex: open1 ? 100 : 10 }}>
      <RowWrapperBasic style={styles.mainDropDown}>
        <View style={{ marginRight: 10, alignSelf: "flex-start" }}>
          <InputTitle style={{ marginBottom: 8 }}>Model </InputTitle>
          <Wrapper>
            <DropDownPicker
              placeholder={"Select Color"}
              placeholderStyle={{ color: colors.appTextColor12 }}
              showTickIcon={true}
              style={styles.rowDropDown}
              open={open1}
              maxHeight={200}
              setOpen={setOpen1}
              value={value1}
              setValue={setValue1}
              items={items1}
              setItems={setItems1}
              listMode="SCROLLVIEW"
              dropDownContainerStyle={[
                styles.dropDownContainer,
                { marginTop: 8 },
              ]}
            />
          </Wrapper>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <InputTitle style={{ marginBottom: 8 }}>Color </InputTitle>
          <Wrapper>
            <DropDownPicker
              placeholder={"Select Color"}
              placeholderStyle={{ color: colors.appTextColor12 }}
              showTickIcon={true}
              style={styles.rowDropDown}
              open={open2}
              maxHeight={200}
              setOpen={setOpen2}
              value={value2}
              setValue={setValue2}
              items={items2}
              setItems={setItems2}
              listMode="SCROLLVIEW"
              dropDownContainerStyle={[
                styles.dropDownContainer,
                { marginTop: 8 },
              ]}
            />
          </Wrapper>
        </View>
      </RowWrapperBasic>
    </Wrapper>
  );
};
export const ImagePickerComponent = ({ onImagesSelected }) => {
  const [images, setImages] = useState([]);

  const checkAndroidPermission = async () => {
    if (Platform.OS === "android") {
      try {
        if (Platform.Version >= 33) {
          // Android 13+
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
              "Permissions Required",
              "Media access is required to select images. Please go to Settings and enable it manually.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Open Settings",
                  onPress: () => Linking.openSettings(),
                },
              ]
            );
            return false;
          }
        } else if (Platform.Version >= 29) {
          // Android 10+
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
              "Permissions Required",
              "Storage access is required to select images. Please go to Settings and enable it manually.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Open Settings",
                  onPress: () => Linking.openSettings(),
                },
              ]
            );
            return false;
          }
        }
      } catch (error) {
        console.error("Permission check failed: ", error);
        Alert.alert("Error", "An error occurred while requesting permissions.");
        return false;
      }
    }
    return true;
  };

  const handleImagePicker = async () => {
    const hasPermission = await checkAndroidPermission();
    if (!hasPermission) return;

    try {
      const selectedImages = await ImagePicker.openPicker({ multiple: true, mediaType: 'photo' });
      setImages((prevImages) => [...prevImages, ...selectedImages]);
      onImagesSelected((prevImages) => [...prevImages, ...selectedImages]);
      return
      // const imageUrls = await Promise.all(
      //   selectedImages.map(async (image) => await uploadImage(image))
      // );
      // const validImageUrls = imageUrls.filter((url) => url !== null);
      // // console.log("image url is ", validImageUrls)
    } catch (error) {
      console.error("Error  ", error);
    }
  };
  return (
    <Wrapper style={{ marginVertical: height(2) }}>
      <InputTitle style={{ marginBottom: 8 }}>Add Pictures</InputTitle>
      <Wrapper style={styles.imagesContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.imagePickerBtn}
          onPress={handleImagePicker}
        >
          <Icon name="add" type="ionicon" color={colors.appIcon1} size={30} />
        </TouchableOpacity>
        <ScrollView horizontal>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.path }}
              style={styles.selectedImg}
            />
          ))}
        </ScrollView>
      </Wrapper>
      <Spacer height={height(12)} />
    </Wrapper>
  );
};

// DRIVER PROFILE COMPLETED
export const CongratulationsScreen = ({ title, description }) => {
  return (
    <Wrapper style={styles.congratulationWrapper}>
      <Wrapper animation={"zoomIn"}>
        <PrimaryImage source={Images.profileCompleted} />
      </Wrapper>
      <Spacer isBasic />
      <TitleWithDescription
        descriptionStyle={styles.congratDescription}
        titleStyle={styles.congratTitle}
        title={title ? title : "Profile Registered"}
        description={
          description ??
          "Your profile is approved by admin. Now you can start earning"
        }
      />
    </Wrapper>
  );
};
//SETTING LIST DESCRIPTION AND DELETE ACCOUNT
export const DeleteAccount = ({ onPressDelete }) => {
  return (
    <Wrapper>
      <RegularText style={styles.DeleteAccount}>
        Donec vestibulum, velit sit amet dapibus rutrum, elit felis bibendum
        tellus, euismod sagittis neque enim eu felis. In interdum mollis nisl,
        vitae rutrum magna.
      </RegularText>
      <Spacer isBasic />
      <TouchableOpacity activeOpacity={0.8} onPress={onPressDelete}>
        <RowWrapperBasic>
          <Icon
            name="person-remove-outline"
            type="ionicon"
            size={20}
            color={colors.appTextColor15}
          />
          <RegularText style={styles.DeleteAccountTitle}>
            Delete Account
          </RegularText>
        </RowWrapperBasic>
      </TouchableOpacity>
    </Wrapper>
  );
};
//NOTIFICATION SETTING WRAPPER

export const NotificationSettingWrapper = ({
  enable,
  onValueChange,
  title,
}) => {
  return (
    <RowWrapper style={{ marginHorizontal: 0 }}>
      <RegularText style={styles.notificationTitle}>{title}</RegularText>
      <Switch
        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
        trackColor={{
          false: colors.appIcon13,
          true: colors.appIcon10,
        }}
        thumbColor={colors.appBgColor1}
        onValueChange={onValueChange}
        value={enable}
      />
    </RowWrapper>
  );
};
//FEEDBACK SCREEN
export const FeedBackInput = ({ feedBack, onChangeFeedBack }) => {
  return (
    <Wrapper>
      <RegularText style={styles.feedBack}>{Strings.feedBack} </RegularText>
      <Spacer isSmall />
      <TextInputBordered
        multiline={true}
        inputStyle={styles.input}
        placeholder={"Your feedback"}
        value={feedBack}
        onChangeText={onChangeFeedBack}
        containerStyle={styles.inputContainer}
      />
    </Wrapper>
  );
};
//DELETE MY ACCOUNT SCREEN
export const DeleteAccountInfo = ({ password, onChangePassword }) => {
  const [visible, setVisible] = useState(true);
  return (
    <Wrapper>
      <RowWrapperBasic>
        <Icon
          name="alert"
          type="foundation"
          size={20}
          color={colors.appTextColor15}
        />
        <RegularText
          style={[styles.DeleteAccountTitle, { fontWeight: "bold" }]}
        >
          Delete your account will:
        </RegularText>
      </RowWrapperBasic>
      <RegularText style={styles.DeleteAccountDesc}>
        {Strings.deleteAccount}
      </RegularText>
      <TextInputBordered
        title={"Password"}
        placeholder={"Enter your Password"}
        value={password}
        onChangeText={onChangePassword}
        iconName={visible ? "eye-outline" : "eye-off-outline"}
        iconType={"ionicon"}
        iconSize={20}
        onPressIcon={() => setVisible(!visible)}
        secureTextEntry={visible}
      />
      <Spacer isSmall />
      <RegularText style={styles.deleteAccountInfo}>
        {Strings.deleteAccountInfo}
      </RegularText>
    </Wrapper>
  );
};
//VERIFICATION FOR DELETE ACCOUNT
export const Verification = () => {
  const [value, setValue] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <Wrapper>
      <RegularText style={styles.DeleteAccountDesc}>
        {Strings.verificationForDelete}
      </RegularText>
      <Spacer height={height(7)} />
      <OTPInput
        props={props}
        value={value}
        onChangeText={setValue}
        getCellOnLayoutHandler={getCellOnLayoutHandler}
      />
      <Spacer height={height(7)} />
      <Countdown />
    </Wrapper>
  );
};
// ENTER PICKUP LOCATION
// export const PickupPoints = forwardRef(
export const PickupPoints = (({ pickupAutocompleteRef,
  destinationAutocompleteRef,
  onChangeDestination,
  showBill,
  onPressClose,
  onPressSelectDate,
  onChangePickupPoint, }) => {
  return (
    <Wrapper>
      <Spacer isSmall />
      <RowWrapperBasic>
        <Icon
          name="radio-btn-active"
          type="fontisto"
          color={colors.appIcon12}
          size={16}
        />
        <GooglePlacesAutocomplete
          ref={pickupAutocompleteRef}
          placeholder="Pickup Point"
          // minLength={2}
          fetchDetails={true}
          // onPress={(data, details) => onChangePickupPoint(data, details)}
          onPress={(data, details) => {
            if (
              data &&
              details &&
              details.geometry &&
              details.geometry.location
            ) {
              onChangePickupPoint(data, details);
            } else {
              console.error("Invalid data or details", data, details);
            }
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            container: styles.autocompleteContainer,
            listView: styles.listView,
            textInput: styles.textInput,
          }}
        />
      </RowWrapperBasic>
      <Wrapper style={[styles.vl]} />
      <RowWrapperBasic>
        <Icon
          name="map-marker"
          type="material-community"
          color={colors.appIcon11}
          size={22}
        />
        <GooglePlacesAutocomplete
          placeholder="Destination"
          ref={destinationAutocompleteRef}
          // minLength={2}
          fetchDetails={true}
          onPress={(data, details) => onChangeDestination(data, details)}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            container: styles.autocompleteContainer,
            listView: styles.listView,
            textInput: styles.textInput,
          }}
        />
      </RowWrapperBasic>
      <Spacer isBasic />
      {/* <RowWrapperBasic >
                <Icon name='calendar' type='antdesign' color={colors.appIcon10} size={22} />
                <TextInputSearch onPress={onPressSelectDate} left right={<Icon name="chevron-small-right" type="entypo" color={colors.appIcon15} />} editable={false} value={'Now'} containerStyle={[styles.inputBorder, { marginLeft: width(3) }]} />
            </RowWrapperBasic> */}
      {showBill && (
        <>
          <Spacer isBasic />
          <RowWrapper style={{ marginHorizontal: 0 }}>
            <RowWrapperBasic>
              <>
                <PrimaryImage source={Images.bill} size={22} />
                <ButtonColored
                  testStyle={styles.receipentBtnTxt}
                  style={styles.receipentBtn}
                  text="Receipt Bill"
                />
                <RegularText style={styles.fileName}>Image 152526 </RegularText>
              </>
            </RowWrapperBasic>
            <Icon
              name="closecircleo"
              type="antdesign"
              onPress={onPressClose}
              size={18}
            />
          </RowWrapper>
        </>
      )}
    </Wrapper>
  )
})

// export const PickupPoints = (
//   ({
//     pickupAutocompleteRef,
//     destinationAutocompleteRef,
//     onChangeDestination,
//     showBill,
//     onPressClose,
//     onPressSelectDate,
//     onChangePickupPoint,
//   }) => (
//     <Wrapper>
//       <Spacer isSmall />
//       <RowWrapperBasic>
//         <Icon
//           name="radio-btn-active"
//           type="fontisto"
//           color={colors.appIcon12}
//           size={16}
//         />
//         <GooglePlacesAutocomplete
//           ref={pickupAutocompleteRef}
//           placeholder="Pickup Point"
//           // minLength={2}
//           fetchDetails={true}
//           // onPress={(data, details) => onChangePickupPoint(data, details)}
//           onPress={(data, details) => {
//             if (
//               data &&
//               details &&
//               details.geometry &&
//               details.geometry.location
//             ) {
//               onChangePickupPoint(data, details);
//             } else {
//               console.error("Invalid data or details", data, details);
//             }
//           }}
//           query={{
//             key: GOOGLE_API_KEY,
//             language: "en",
//           }}
//           styles={{
//             container: styles.autocompleteContainer,
//             listView: styles.listView,
//             textInput: styles.textInput,
//           }}
//         />
//       </RowWrapperBasic>
//       <Wrapper style={[styles.vl]} />
//       <RowWrapperBasic>
//         <Icon
//           name="map-marker"
//           type="material-community"
//           color={colors.appIcon11}
//           size={22}
//         />
//         <GooglePlacesAutocomplete
//           placeholder="Destination"
//           ref={destinationAutocompleteRef}
//           // minLength={2}
//           fetchDetails={true}
//           onPress={(data, details) => onChangeDestination(data, details)}
//           query={{
//             key: GOOGLE_API_KEY,
//             language: "en",
//           }}
//           styles={{
//             container: styles.autocompleteContainer,
//             listView: styles.listView,
//             textInput: styles.textInput,
//           }}
//         />
//       </RowWrapperBasic>
//       <Spacer isBasic />
//       {/* <RowWrapperBasic >
//                 <Icon name='calendar' type='antdesign' color={colors.appIcon10} size={22} />
//                 <TextInputSearch onPress={onPressSelectDate} left right={<Icon name="chevron-small-right" type="entypo" color={colors.appIcon15} />} editable={false} value={'Now'} containerStyle={[styles.inputBorder, { marginLeft: width(3) }]} />
//             </RowWrapperBasic> */}
//       {showBill && (
//         <>
//           <Spacer isBasic />
//           <RowWrapper style={{ marginHorizontal: 0 }}>
//             <RowWrapperBasic>
//               <>
//                 <PrimaryImage source={Images.bill} size={22} />
//                 <ButtonColored
//                   testStyle={styles.receipentBtnTxt}
//                   style={styles.receipentBtn}
//                   text="Receipt Bill"
//                 />
//                 <RegularText style={styles.fileName}>Image 152526 </RegularText>
//               </>
//             </RowWrapperBasic>
//             <Icon
//               name="closecircleo"
//               type="antdesign"
//               onPress={onPressClose}
//               size={18}
//             />
//           </RowWrapper>
//         </>
//       )}
//     </Wrapper>
//   )
// );

export const Pickup = (({
  pickupAutocompleteRef,
  destinationAutocompleteRef,
  showBill, onPressClose, onPressSelectDate, onChangePickupPoint
}) => {
  return (
    <Wrapper>
      <Spacer isSmall />
      <RowWrapperBasic>
        <Icon
          name="radio-btn-active"
          type="fontisto"
          color={colors.appIcon12}
          size={16}
        />
        <GooglePlacesAutocomplete
          ref={pickupAutocompleteRef}
          placeholder="EnterPickup Point"
          // minLength={2}
          fetchDetails={true}
          onPress={(data, details) => onChangePickupPoint(data, details)}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            container: styles.autocompleteContainer,
            listView: styles.listView,
            textInput: styles.textInput,
          }}
        />
      </RowWrapperBasic>
      <Wrapper style={[styles.vl]} />
      <Spacer isBasic />
      {showBill && (
        <>
          <Spacer isBasic />
          <RowWrapper style={{ marginHorizontal: 0 }}>
            <RowWrapperBasic>
              <>
                <PrimaryImage source={Images.bill} size={22} />
                <ButtonColored
                  testStyle={styles.receipentBtnTxt}
                  style={styles.receipentBtn}
                  text="Receipt Bill"
                />
                <RegularText style={styles.fileName}>
                  Image 152526{" "}
                </RegularText>
              </>
            </RowWrapperBasic>
            <Icon
              name="closecircleo"
              type="antdesign"
              onPress={onPressClose}
              size={18}
            />
          </RowWrapper>
        </>
      )}
    </Wrapper>
  )
})

// export const Pickup = (
//     ({
//       pickupAutocompleteRef,
//       destinationAutocompleteRef,
//       showBill, onPressClose, onPressSelectDate, onChangePickupPoint
//     }) => (
//       <Wrapper>
//         <Spacer isSmall />
//         <RowWrapperBasic>
//           <Icon
//             name="radio-btn-active"
//             type="fontisto"
//             color={colors.appIcon12}
//             size={16}
//           />
//           <GooglePlacesAutocomplete
//             ref={pickupAutocompleteRef}
//             placeholder="EnterPickup Point"
//             // minLength={2}
//             fetchDetails={true}
//             onPress={(data, details) => onChangePickupPoint(data, details)}
//             query={{
//               key: GOOGLE_API_KEY,
//               language: "en",
//             }}
//             styles={{
//               container: styles.autocompleteContainer,
//               listView: styles.listView,
//               textInput: styles.textInput,
//             }}
//           />
//         </RowWrapperBasic>
//         <Wrapper style={[styles.vl]} />
//         <Spacer isBasic />
//         {showBill && (
//           <>
//             <Spacer isBasic />
//             <RowWrapper style={{ marginHorizontal: 0 }}>
//               <RowWrapperBasic>
//                 <>
//                   <PrimaryImage source={Images.bill} size={22} />
//                   <ButtonColored
//                     testStyle={styles.receipentBtnTxt}
//                     style={styles.receipentBtn}
//                     text="Receipt Bill"
//                   />
//                   <RegularText style={styles.fileName}>
//                     Image 152526{" "}
//                   </RegularText>
//                 </>
//               </RowWrapperBasic>
//               <Icon
//                 name="closecircleo"
//                 type="antdesign"
//                 onPress={onPressClose}
//                 size={18}
//               />
//             </RowWrapper>
//           </>
//         )}
//       </Wrapper>
//     )
//   )

export const SmallTitleWithDesc = ({
  title,
  location,
  titleStyle,
  locationStyle,
}) => {
  return (
    <Wrapper style={{ marginLeft: width(3), width: width(75), }}>
      <MediumText style={[styles.locationTitle, titleStyle]}>
        {title}
      </MediumText>
      {location && (
        <RegularText style={[styles.locationDesc, locationStyle]}>
          {location}
        </RegularText>
      )}
    </Wrapper>
  );
};
//CURRENT LOCATION AND SAVE DLOCATION ON ENTER PICKUP LOCATION
export const PreviousLocations = ({
  onPressPickup,
  onPressDone,
  pickupPoint,
  destination,
  favoriteAddress = [],
  currentLoc,
  SavedLocation,
}) => {
  const pickupAutocompleteRef = useRef(null);
  const [showBill, setShowBill] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [region, setRegion] = useState(null);
  const user_redux = useSelector((state) => state.user);
  const Loc = user_redux.cords || {};
  const log = Loc.longitude || "";
  const lat = Loc.latitude || "";
  useEffect(() => {
    if (pickupPoint && destination) {
      const midPoint = {
        latitude: (pickupPoint.latitude + destination.latitude) / 2,
        longitude: (pickupPoint.longitude + destination.longitude) / 2,
        latitudeDelta:
          Math.abs(pickupPoint.latitude - destination.latitude) * 2,
        longitudeDelta:
          Math.abs(pickupPoint.longitude - destination.longitude) * 2,
      };
      setRegion({
        ...midPoint,
        latitudeDelta: Math.max(0.01, midPoint.latitudeDelta),
        longitudeDelta: Math.max(0.01, midPoint.longitudeDelta),
      });
    }
  }, [pickupPoint, destination]);
  const handlePressSetLocation = () => {
    if (!pickupPoint) {
      console.log("Error", "Please select both pickup point and destination.");
      return;
    }
    setShowMap(true);
  };
  const CurrentLocation = () => {
    if (currentLoc) {
      if (pickupAutocompleteRef.current) {
        pickupAutocompleteRef.current.setAddressText(currentLoc);
      }
      SavedLocation({
        name: currentLoc,
        latitude: lat,
        longitude: log,
      });
    } else {
      console.log("No current location available");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {showMap && pickupPoint ? (
        <>
          <Spacer isBasic />
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={region}
          >
            {pickupPoint && (
              <Marker
                coordinate={pickupPoint}
                title="Pickup Point"
                pinColor="blue"
              />
            )}
            {destination && (
              <Marker
                coordinate={destination}
                title="Destination"
                pinColor="blue"
              />
            )}
            {pickupPoint && destination && (
              <MapViewDirections
                origin={pickupPoint}
                destination={destination}
                apikey={GOOGLE_API_KEY}
                strokeWidth={10}
                strokeColor="green"
                mode="DRIVING"
                onError={(error) => console.log("Directions error:", error)}
              />
            )}
          </MapView>
          <AbsoluteButton title={"Next"} onPress={onPressDone} />
        </>
      ) : (
        <Wrapper style={{ marginHorizontal: width(5) }}>
          <Spacer isBasic />
          <TouchableOpacity activeOpacity={1} onPress={CurrentLocation}>
            <RowWrapperBasic>
              <ButtonWithIcon
                iconName={"map-marker"}
                iconType={"material-community"}
                iconColor={colors.appIcon15}
                buttonStyle={styles.iconButton}
              />
              <SmallTitleWithDesc
                title={"Current Location"}
                location={currentLoc || "No Current Location share"}
              />
            </RowWrapperBasic>
          </TouchableOpacity>
          <Hrline style={styles.locationLine} />
          {favoriteAddress.length > 0 ? (
            favoriteAddress.map((address, index) => (
              <>
                <TouchableOpacity
                  key={index}
                  onPress={() => SavedLocation(address)}
                >
                  <RowWrapperBasic>
                    <ButtonWithIcon
                      iconName={"star"}
                      iconType={"font-awesome"}
                      iconSize={20}
                      iconColor={colors.appIcon15}
                      buttonStyle={styles.iconButton}
                    />
                    <SmallTitleWithDesc
                      title={"Saved Location"}
                      location={address.name}
                    />
                  </RowWrapperBasic>
                </TouchableOpacity>
                <Hrline style={styles.locationLine} />
              </>
            ))
          ) : (
            <RowWrapperBasic>
              <ButtonWithIcon
                iconName={"star"}
                iconType={"font-awesome"}
                iconSize={20}
                iconColor={colors.appIcon15}
                buttonStyle={styles.iconButton}
              />
              <SmallTitleWithDesc title={"No Saved Location"} />
            </RowWrapperBasic>
          )}
          <Hrline style={styles.locationLine} />
          <RowWrapperBasic>
            <ButtonWithIcon
              iconName={"map-marker"}
              iconType={"material-community"}
              iconColor={colors.appIcon15}
              buttonStyle={styles.iconButton}
            />
            <SmallTitleWithDesc title={"Lahore"} location={"Pakistan"} />
          </RowWrapperBasic>
          <Hrline style={styles.locationLine} />
          <RowWrapperBasic>
            <ButtonWithIcon
              iconName={"map-marker-radius"}
              iconType={"material-community"}
              iconSize={20}
              iconColor={colors.appIcon12}
              buttonStyle={styles.iconButton}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePressSetLocation}
            >
              <SmallTitleWithDesc
                titleStyle={styles.mapLocationText}
                title={"Set Location on map"}
              />
            </TouchableOpacity>
          </RowWrapperBasic>
        </Wrapper>
      )}
    </View>
  );
};
//VEHICLE LOCATION ON SELECT DRIVER SCREEN
export const VehicleLocation = ({ mapStyle, hideBackBtn }) => {
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={[{ height: "35%" }, mapStyle]}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      {!hideBackBtn && <AbsoluteBackBtn />}
    </>
  );
};

export const renderSend = (props) => {
  return (
    <Send alwaysShowSend={true} {...props}>
      <View style={{ marginRight: width(2.5), marginBottom: 10 }}>
        <Icon name="send" color={colors.appIcon16} />
      </View>
    </Send>
  );
};

export const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: colors.appBgColor12,
          padding: 5,
        },
        left: {
          backgroundColor: colors.appBgColor11,
          padding: 5,
        },
      }}
      textStyle={{
        right: {
          fontFamily: fontFamily.appTextRegular,
          fontSize: totalSize(1.6),
          color: colors.appTextColor19,
        },
        left: {
          fontFamily: fontFamily.appTextRegular,
          color: colors.appTextColor2,
          fontSize: totalSize(1.6),
        },
      }}
    />
  );
};
export const DriverChatBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: colors.appBgColor8,
          padding: 5,
        },
        left: {
          backgroundColor: colors.appBgColor1,
          padding: 5,
        },
      }}
      textStyle={{
        right: {
          fontFamily: fontFamily.appTextRegular,
          fontSize: totalSize(1.6),
          color: colors.appTextColor3,
        },
        left: {
          fontFamily: fontFamily.appTextRegular,
          color: colors.appTextColor2,
          fontSize: totalSize(1.6),
        },
      }}
    />
  );
};

export const renderTime = (props) => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: colors.appTextColor10,
          fontSize: totalSize(1.4),
          fontFamily: fontFamily.appTextRegular,
        },
        right: {
          color: colors.appTextColor10,
          fontSize: totalSize(1.4),
          fontFamily: fontFamily.appTextRegular,
        },
      }}
    />
  );
};
export const DriverChatTime = (props) => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: colors.appTextColor10,
          fontSize: totalSize(1.4),
          fontFamily: fontFamily.appTextRegular,
        },
        right: {
          color: colors.appTextColor3,
          fontSize: totalSize(1.4),
          fontFamily: fontFamily.appTextRegular,
        },
      }}
    />
  );
};
// export const renderInputToolbar = (props) => {
//   return (
//     <Wrapper style={{ flexDirection: "row", justifyContent: "flex-end" }}>
//       <InputToolbar {...props} />
//       <TouchableOpacity style={{ padding: 10, marginLeft: 10 }}>
//         <Icon name="mic" type="feather" size={20} color={colors.iconColor1} />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{ padding: 10, marginRight: width(10) }}
//         onPress={() => console.log("Camera button pressed")}
//       >
//         <Icon name="image" type="feather" size={20} color={colors.iconColor1} />
//       </TouchableOpacity>
//     </Wrapper>
//   );
// };
//DRIVER WRAPPER ONSELECT DRIVER SCREEN
export const DriverContactPreview = ({
  name,
  photo,
  rating = "4.9",
  onPressChat,
  onPressCall,
  style,
  hideRating,
  phoneNumber,
}) => {
  return (
    <>
      <Wrapper style={[styles.contactPreviewWrapper, style]}>
        <RowWrapper>
          <RowWrapperBasic>
            <RoundImage source={{ uri: photo }} />
            <Wrapper style={{ marginLeft: width(4) }}>
              <RegularText style={styles.ratingUserName}>{name}</RegularText>
              {!hideRating && (
                <IconWithText
                  iconName={"star"}
                  iconType={"antdesign"}
                  iconSize={totalSize(1.7)}
                  iconColor={colors.appIcon17}
                  text={rating}
                  textstyle={styles.ratingText}
                />
              )}
            </Wrapper>
          </RowWrapperBasic>
          <ButtonWithIcon
            buttonStyle={[styles.iconButtons, { marginRight: -width(15) }]}
            iconName={"chatbubble-ellipses"}
            iconType={"ionicon"}
            iconColor={colors.appIcon5}
            iconSize={totalSize(3)}
            onPress={onPressChat}
          />
          <ButtonWithIcon
            onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            buttonStyle={[
              styles.iconButtons,
              { backgroundColor: colors.appIcon12 },
            ]}
            iconName={"phone"}
            iconType={"material-community"}
            iconColor={colors.appIcon5}
            iconSize={totalSize(3)}
          />
        </RowWrapper>
      </Wrapper>
    </>
  );
};

//DRIVER WRAPPER ONSELECT DRIVER SCREEN
export const HelperGroups = ({ name = "Helpers Group ", style }) => {
  const userImages = [Images.user2, Images.user4, Images.user6];
  return (
    <Wrapper>
      <RowWrapper>
        <RowWrapperBasic>
          <View style={styles.userGroup}>
            {userImages.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.userIcon}
              />
            ))}
          </View>
          <RegularText
            style={[styles.ratingUserName, { marginLeft: width(4) }]}
          >
            {name}
          </RegularText>
        </RowWrapperBasic>
        <PrimaryImage source={Icons.helperGroup} size={totalSize(2.8)} />
      </RowWrapper>
    </Wrapper>
  );
};

export const DriverContactInfo = ({
  name, photo, phoneNumber,
  onPressChat,
  requestAccepted,
  style,
}) => {
  return (
    <>
      <Wrapper style={{ padding: totalSize(1.3) }}>
        <RowWrapper>
          <RowWrapperBasic>
            <RoundImage
              source={{ uri: photo || Images.user1 }}
              size={totalSize(5)}
            />
            <Wrapper style={{ marginLeft: width(4) }}>
              <RegularText style={styles.ratingUserName}>{name}</RegularText>
            </Wrapper>
          </RowWrapperBasic>
          {requestAccepted && (
            <>
              <ButtonWithIcon
                buttonStyle={[styles.iconButtons, { marginRight: -width(15) }]}
                iconName={"chatbubble-ellipses"}
                iconType={"ionicon"}
                iconColor={colors.appIcon5}
                iconSize={totalSize(3)}
                onPress={onPressChat}
              />
              <ButtonWithIcon
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                buttonStyle={[
                  styles.iconButtons,
                  { backgroundColor: colors.appIcon12 },
                ]}
                iconName={"phone"}
                iconType={"material-community"}
                iconColor={colors.appIcon5}
                iconSize={totalSize(3)}
              />
            </>
          )}
        </RowWrapper>
      </Wrapper>
    </>
  );
};

export const DestinationToPickupLocation = () => {
  return (
    <>
      <RowWrapper
        style={{ marginVertical: height(1), alignItems: "flex-start" }}
      >
        <Wrapper>
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"radio-button-on"}
            iconType={"ionicon"}
            iconColor={colors.appIcon12}
            text={"7958 Swift Village"}
          />
          <Wrapper style={styles.vl} />
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"map-marker"}
            iconType={"material-community"}
            iconColor={colors.appIcon11}
            text={"105 William St, Chicago, US"}
          />
        </Wrapper>
      </RowWrapper>
      <Hrline style={styles.spacerLine} />
    </>
  );
};
const formatAddressText = (text, wordLimitPerLine = 4) => {
  const words = text.split(" ");
  let formattedText = "";
  for (let i = 0; i < words.length; i++) {
    if (i > 0 && i % wordLimitPerLine === 0) {
      formattedText += "\n";
    }
    formattedText += words[i] + " ";
  }
  return formattedText.trim();
};
export const ShippingAddress = ({
  pickupLocation,
  dropoutLocation,
  pickupStairs,
  dropoutStairs,
}) => {
  const pickup = formatAddressText(pickupLocation);
  const des = formatAddressText(dropoutLocation);

  return (
    <Wrapper style={styles.destinationWrapper}>
      <MediumText>Shipping Address</MediumText>
      <Spacer isBasic />
      <RowWrapperBasic>
        <Wrapper>
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"radio-button-on"}
            iconType={"ionicon"}
            iconColor={colors.appIcon12}
          // text={'7958 Swift Village'}
          />
          <Wrapper style={[styles.vl, { height: height(5) }]} />
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"map-marker"}
            iconType={"material-community"}
            iconColor={colors.appIcon11}
          // text={'105 William St, Chicago, US'}
          />
        </Wrapper>
        <Wrapper style={styles.locationWrapper}>
          <RegularText style={styles.pickup}>Pickup Location</RegularText>
          <RegularText style={styles.pickupLocation}>
            {pickup}
          </RegularText>
        </Wrapper>
        <RegularText
          style={[styles.stairs, {}]}
        >{`${pickupStairs} Stairs`}</RegularText>
      </RowWrapperBasic>
      <Wrapper style={{ marginHorizontal: width(7), marginTop: -height(4) }}>
        <RegularText style={styles.pickup}>Dropout Location</RegularText>
        <RegularText style={styles.pickupLocation}>
          {des}
        </RegularText>
      </Wrapper>
      <RegularText
        style={styles.dropoutStairs}
      >{`${dropoutStairs} Stairs`}</RegularText>
      <Spacer isSmall />
    </Wrapper>
  );
};
//DELIVERY INFO
export const DeliveryInfo = ({ }) => {
  return (
    <>
      <RowWrapper style={styles.deliveryInfoWrapper}>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>TIME</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>2 min</MediumText>
        </Wrapper>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>DISTANCE</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>0.2 km</MediumText>
        </Wrapper>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>PRICE</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>$25.00</MediumText>
        </Wrapper>
      </RowWrapper>
      <Hrline style={styles.spacerLine} />
    </>
  );
};
//DRIVER REVIEWS LIST
export const DriverReviews = ({ }) => {
  return (
    <Wrapper style={{ marginHorizontal: width(5) }}>
      <MediumText>
        Reviews <RegularText color={colors.appTextColor2}>(100+)</RegularText>
      </MediumText>
      <Spacer isSmall />
      <Hrline style={styles.spacerLine} />
      <FlatList
        data={DriverReview}
        ListFooterComponent={() => <Spacer height={height(7)} />}
        ItemSeparatorComponent={() => (
          <>
            <Spacer isSmall />
            <Hrline style={styles.spacerLine} />
            <Spacer isSmall />
          </>
        )}
        renderItem={({ item }) => {
          return (
            <>
              <RowWrapper style={{ marginHorizontal: 0 }}>
                <RowWrapperBasic>
                  <RoundImage
                    size={totalSize(4)}
                    source={{ uri: item?.user_profile }}
                  />
                  <Wrapper style={{ marginLeft: width(4) }}>
                    <RegularText
                      style={[
                        styles.ratingUserName,
                        { fontFamily: fontFamily.appTextBold },
                      ]}
                    >
                      {item?.user_name}
                    </RegularText>
                    <AirbnbRating
                      defaultRating={item?.ratingStar}
                      selectedColor={colors.appIcon17}
                      size={12}
                      showRating={false}
                      isDisabled={true}
                    />
                  </Wrapper>
                </RowWrapperBasic>
                <RegularText color={colors.appTextColor21}>
                  {item?.date}
                </RegularText>
              </RowWrapper>
              <RegularText color={colors.appTextColor21}>
                {item?.comment}
              </RegularText>
            </>
          );
        }}
      />
    </Wrapper>
  );
};
// SHOW ANIMATION LINES AFTER PAYMENT FOR CONNECTING DRIVER
export const ConnectingDriverAnimation = ({ title, navigate }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateLine(lineIndex);
  }, []);

  const animateLine = (index) => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      if (index === 4) {
        navigate();
        console.log("animation complete");
      } else {
        setLineIndex((prevIndex) => prevIndex + 1);
        animateLine(index + 1);
      }
    });
  };

  const lineStyles = (index) => ({
    width: "14%",
    height: 3,
    backgroundColor:
      index === lineIndex ? colors.appBorder1 : colors.appBorder8,
    marginHorizontal: 10,
    borderRadius: 10,
  });

  return (
    <Wrapper style={styles.container1}>
      <MediumText>{title ? title : "Connecting with Driver"}</MediumText>
      <Spacer isSmall />
      <Hrline color={colors.appBorder7} />
      <Spacer height={height(4)} />
      <View style={styles.row1}>
        <Animated.View style={lineStyles(0)} />
        <Animated.View style={lineStyles(1)} />
        <Animated.View style={lineStyles(2)} />
        <Animated.View style={lineStyles(3)} />
        <Animated.View style={lineStyles(4)} />
      </View>
    </Wrapper>
  );
};
//MANAGE DELIVERY AND CANCEL REQUEST ON DRIVER DETAIL AFTER PAYMENT DONE
export const ManageDelivery = ({ onPressCancel }) => {
  return (
    <>
      <Spacer isBasic />
      <MediumText style={styles.componentText}>Manage Your Delivery</MediumText>
      <Spacer isBasic />
      <IconWithText
        style={styles.componentText}
        iconName={"questioncircleo"}
        iconType={"antdesign"}
        iconSize={18}
        text={"Need our help?"}
        textstyle={styles.helpText}
      />
      <AbsoluteWrapper style={styles.absoluteCancel}>
        <MediumText onPress={onPressCancel} style={styles.cancelText}>
          CANCEL REQUEST
        </MediumText>
      </AbsoluteWrapper>
    </>
  );
};
//COLLAPSABLE WRAPPER FOR SHOW AND HIDE VEHICLE DETAIL
export const VehicleDetail = ({ isCollapsed, onPressCollapse }) => {
  const images = [Images.vehicle1, Images.vehicle2, Images.vehicle1];

  const renderImage = ({ item }) => (
    <PrimaryImage size={totalSize(10)} source={item} />
  );
  return (
    <Wrapper>
      <TouchableOpacity onPress={onPressCollapse}>
        <RowWrapper>
          <MediumText>Vehicle Detail</MediumText>
          <Icon name={isCollapsed ? "down" : "up"} type="antdesign" size={18} />
        </RowWrapper>
      </TouchableOpacity>

      {isCollapsed ? null : (
        <Wrapper>
          <Spacer isSmall />
          <RowWrapper>
            <RegularText style={styles.vehicleDetail}>
              Name: Lorem ipsum
            </RegularText>
            <RegularText style={styles.vehicleDetail}>
              Number: KL 6363
            </RegularText>
          </RowWrapper>
          <Spacer isSmall />
          <RegularText style={styles.vehicleDetailSpacer}>
            Color: Red
          </RegularText>
          <Spacer isSmall />
          <RegularText style={styles.vehicleDetailSpacer}>Images: </RegularText>
          <Spacer isSmall />
          <FlatList
            data={images}
            renderItem={renderImage}
            horizontal
            style={{ marginHorizontal: width(5) }}
          />
        </Wrapper>
      )}
    </Wrapper>
  );
};
//TRACK DELIVERY STATUS WRAPPER
export const TrackDeliveryStatus = ({ showNext, status }) => {
  return (
    <Wrapper
      style={
        showNext
          ? styles.showNextTrackDeliveryWrapper
          : styles.trackDeliveryWrapper
      }
    >
      {showNext ? (
        <RegularText style={styles.showNextStatusText}>
          Driver reached to you pickup location, please contact with him
        </RegularText>
      ) : (
        <RowWrapper>
          <RegularText style={styles.statusText}>
            {status
              ? status
              : "You driver will be there at your pickup point within"}{" "}
          </RegularText>
          <RegularText style={styles.deliveryTime}>4 mint</RegularText>
        </RowWrapper>
      )}
    </Wrapper>
  );
};
//ALL ABOUT TRACKING DELIVERY LIKE TIME, VEHICLE DETAIL, DRIVER
export const TrackingInfo = ({
  isCollapsed,
  onPressCollapse,
  showNext,
  cancelTitle,
  onPressCancel,
}) => {
  return (
    <Wrapper style={styles.trackingInfoWrapper}>
      <TrackDeliveryStatus showNext={showNext} />
      <Hrline color={colors.appBorder8} />
      <Spacer isTiny />
      <DriverContactPreview style={{ backgroundColor: colors.appBgColor1 }} />
      <Spacer isTiny />
      <Hrline color={colors.appBorder8} />
      <Spacer isSmall />
      <VehicleDetail
        isCollapsed={isCollapsed}
        onPressCollapse={onPressCollapse}
      />
      <Spacer isSmall />
      <Hrline color={colors.appBorder8} />
      <Spacer isBasic />
      <RegularText onPress={onPressCancel} style={styles.cancenRequest}>
        {cancelTitle}
      </RegularText>
    </Wrapper>
  );
};
//ADD REVIEW SCREEN
export const RateToRider = ({ user, review, onChangeReview, setRating }) => {
  return (
    <Wrapper style={styles.rateToRiderWrapper}>
      <RoundImage source={{ uri: user.photo }} />
      <Spacer isSmall />
      <MediumText>
        {user.firstName} {user.lastName}
      </MediumText>
      <Spacer isBasic />
      <AirbnbRating
        defaultRating={1}
        selectedColor={colors.appIcon19}
        size={28}
        showRating={false}
        onFinishRating={setRating}
      />
      <Spacer isBasic />
      <TextInputBordered
        multiline={true}
        inputStyle={styles.input}
        placeholder={
          "Jonah Noah gives you a Delivery service, please add review about it"
        }
        value={review}
        onChangeText={onChangeReview}
        containerStyle={styles.reviewInputContainer}
      />
      <Spacer isBasic />
      {/* <RoundImage source={{ uri: Images.user1 }} />
      <Spacer isSmall />
      <MediumText>Jonah Noah </MediumText>
      <Spacer isBasic />
      <AirbnbRating
        defaultRating={1}
        selectedColor={colors.appIcon19}
        size={28}
        showRating={false}
      />
      <Spacer isBasic />
      <TextInputBordered
        multiline={true}
        inputStyle={styles.input}
        placeholder={
          "Jonah Noah gives you a Delivery service, please add review about it"
        }
        value={review}
        onChangeText={onChangeReview}
        containerStyle={styles.reviewInputContainer}
      /> */}
    </Wrapper>
  );
};

////////////////////DRIVER SIDE/////////////////

//DELIVERY INFO LIKE TIME DATE PRICE ETC.
export const DriverDeliveryInfo = ({
  time,
  distance,
  price, date
}) => {
  return (
    <>
      <RowWrapper style={styles.deliveryInfoWrapper}>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>TIME</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>{time}</MediumText>
        </Wrapper>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>DISTANCE</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>{distance}</MediumText>
        </Wrapper>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>PRICE</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>{`$${price}`}</MediumText>
        </Wrapper>
      </RowWrapper>
      <RowWrapper style={{ marginHorizontal: width(10) }}>
        <IconWithText
          style={styles.deliveryInfoDate}
          textstyle={{ color: colors.appTextColor13 }}
          text={date}
          iconName={"calendar-month-outline"}
          iconType={"material-community"}
          iconColor={colors.appIcon8}
        />
        <IconWithText
          style={styles.deliveryInfoTime}
          textstyle={{ color: colors.appTextColor14 }}
          text={time}
          iconName={"clockcircleo"}
          iconType={"antdesign"}
          iconColor={colors.appIcon9}
          iconSize={17}
        />
      </RowWrapper>
      <Spacer isSmall />
      {/* <Hrline style={styles.spacerLine} /> */}
    </>
  );
};
//NOTE TEXT ON REQUEST DETAIL SCREEN
export const RequestNote = () => {
  return (
    <ComponentWrapper>
      <Spacer isSmall />
      <MediumText style={styles.noteText}>NOTE:</MediumText>
      <RegularText style={styles.noteDescription}>
        You must have Gap Insurance to accept delivery requests.
      </RegularText>
    </ComponentWrapper>
  );
};
//RECEIPT IMAGE
export const ReceiptImg = () => {
  return (
    <PrimaryImage
      styles={{ height: height(70), width: width(100) }}
      source={Images.receipt}
    />
  );
};
//PICKUPPOINT INFORMATION LIKE TIME DISTANCE DELIVERY STATUS ETC ON PICKUP POINT SCREEN
export const PickupPointInfo = ({
  time,
  distance = "0.2 km",
  price,
  startDelivery,
  cancelTitle,
  onPressCancel,
  onPressChat,
  name, photo, phoneNumber
}) => {
  const userImages = [Images.user2, Images.user4, Images.user6];
  const account_redux = useSelector((state) => state?.account_type);

  return (
    <Wrapper style={styles.trackingInfoWrapper}>
      <TrackDeliveryStatus
        status={
          startDelivery
            ? "You are 1.6 km away from pickup point"
            : "Please wait we notified Aadam he will contact you soon"
        }
      />
      <Hrline color={colors.appBorder8} />
      <Spacer isTiny />

      <RowWrapper style={styles.deliveryInfoWrapper}>
        <PrimaryImage size={totalSize(6)} source={Images.pickupVehicle} />
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>DISTANCE</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>{distance}</MediumText>
        </Wrapper>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>TIME</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>{time}</MediumText>
        </Wrapper>
        <Wrapper>
          <RegularText style={styles.deliveryInfoTitle}>PRICE</RegularText>
          <MediumText style={styles.deliveryInfoDesc}>{`$${price}`}</MediumText>
        </Wrapper>
      </RowWrapper>
      {/* <Spacer isTiny /> */}
      <Hrline color={colors.appBorder8} />

      <Spacer isTiny />
      <DriverContactPreview
        onPressChat={onPressChat}
        hideRating
        style={{ backgroundColor: colors.appBgColor1 }}
        name={name}
        photo={photo}
        phoneNumber={phoneNumber}
      />
      <Hrline color={colors.appBorder8} />
      <Spacer isSmall />
      <Spacer isSmall />
      {account_redux == "driver" && <HelperGroups />}
      <Spacer isSmall />
      <Spacer isSmall />
      <Hrline color={colors.appBorder8} />
      <Spacer isBasic />
      <RegularText onPress={onPressCancel} style={styles.cancenRequest}>
        {cancelTitle}
      </RegularText>
    </Wrapper>
  );
};
