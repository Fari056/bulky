import { useRef, useState, useEffect } from "react"
import { Avatar, BookingCard, ButtonColored, ButtonWithIcon, CardWrapper, ComponentWrapper, DriverOrderHistoryCard, HistoryCard, Hrline, IconWithText, ImageBackgroundWrapper, InputTitle, LargeTitle, MediumText, MediumTitle, PrimaryImage, RegularText, RequestCard, RoundImage, RowWrapper, RowWrapperBasic, SmallText, SmallTitle, Spacer, TextInputBordered, TinyTitle, Wrapper } from "../.."
import { SCREEN, colors, sizes } from "../../../constants"
import { styles } from "./styles"
import { width, height } from 'react-native-dimension'
import LinearGradient from "react-native-linear-gradient"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { DriverSettings, OnBoarding, Settings, VehiclesList, categories, userTypes } from "../../../../tempData"
import { Icon, CheckBox } from "react-native-elements"
import { totalSize } from 'react-native-dimension'
import { useNavigation } from "@react-navigation/native"
import { NotificationSettingWrapper, SmallTitleWithDesc } from "../staticComponents"
import { Images } from "../../../utilities"
import { AirbnbRating } from "react-native-ratings"
import { useSelector } from "react-redux"
import { Icons } from "../../../assets"
import { useAuth } from "../../../hooks"
import { getData, saveData, UserDetails } from "../../../backend/utility"
import { getCurrentUserId } from "../../../backend/auth"
import { useDispatch } from "react-redux"
import { signin } from "../../../redux/actions"
// onboarding flatlist render
export const OnBoardingWrapper = ({ uri, skip, onPressSkip, title, description }) => {
  return (
    <ImageBackgroundWrapper resizeMode='cover' source={uri} >
      <LinearGradient colors={colors.gradiant1} style={styles.gradientWrapper}>
        <RegularText onPress={onPressSkip} style={styles.skipText}>{skip}</RegularText>
        <SmallTitle style={styles.title}>{title}</SmallTitle>
        <RegularText style={styles.description}>{description}</RegularText>
      </LinearGradient>
    </ImageBackgroundWrapper>
  )
}
// FLATLIST FOR ACCOUNT TYPES
export const AccountTypes = ({ active, onPress }) => {
  return (
    <FlatList data={userTypes}
      ItemSeparatorComponent={() => <Spacer isBasic />}
      renderItem={({ item, index }) => {
        const isActive = active === index;

        return (
          <TouchableOpacity onPress={() => onPress(index)}
            style={[styles.accountTypeContainer, { borderWidth: 1, borderColor: isActive ? item?.activeColor : item?.bgColor, backgroundColor: item?.bgColor }]}
            activeOpacity={0.8} >
            <RowWrapperBasic>
              <PrimaryImage size={totalSize(7.5)} source={item?.uri} />
              <Wrapper style={{ marginHorizontal: 8 }}>
                <RowWrapperBasic style={styles.rowWrapper}>
                  <SmallTitle style={{ color: isActive ? item?.activeColor : colors.appTextColor5 }}>{item?.role}</SmallTitle>
                  <Icon color={item?.activeColor} style={styles.radioButton}
                    name={isActive ? 'check-circle' : 'radio-button-unchecked'}
                    type='material-icon' />
                </RowWrapperBasic>
                <RegularText style={styles.accountDescription}>{item?.description}</RegularText>
              </Wrapper>
            </RowWrapperBasic>
          </TouchableOpacity>
        )
      }}
    />
  )
}
//SIGNUP SCREEN
export const SignUpForm = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPAssword,
  userName,
  onChangeUserName,
  emailError,
  passwordError,
  confirmPasswordError,
  accountType,
}) => {
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const account_redux = useSelector((state) => state?.account_type);

  return (
    <>
      {/* {accountType === "helper" || accountType === "driver" ? (
        <>
          <TextInputBordered
            title={"User Name"}
            placeholder={"Enter your name"}
            value={userName}
            onChangeText={onChangeUserName}
          />
          <Spacer isSmall />
        </>
      ) : null} */}
      <TextInputBordered
        title={"Email"}
        error={emailError}
        placeholder={"Enter your email"}
        value={email}
        onChangeText={onChangeEmail}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={"Password"}
        error={passwordError}
        placeholder={"Enter Password"}
        value={password}
        onChangeText={onChangePassword}
        iconName={visible ? "eye-outline" : "eye-off-outline"}
        iconType={"ionicon"}
        iconSize={20}
        onPressIcon={() => setVisible(!visible)}
        secureTextEntry={visible}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={"Confirm Password"}
        placeholder={"Confirm Password"}
        iconName={visible2 ? "eye-outline" : "eye-off-outline"}
        iconType={"ionicon"}
        iconSize={20}
        error={confirmPasswordError}
        onPressIcon={() => setVisible2(!visible2)}
        secureTextEntry={visible2}
        value={confirmPassword}
        onChangeText={onChangeConfirmPAssword}
      />
      <Spacer isSmall />
      {/* <TextInputBordered
                title={'Phone Number'}
                placeholder={'Enter Phone number'}
                value={phoneNumber}
                onChangeText={onChangePhone}
            /> */}
    </>
  );
};

//SIGNUP SCREEN
export const SignInForn = ({
  email, onChangeEmail, emailError,
  password, onChangePassword, passwordError }) => {
  const [visible, setVisible] = useState(true)
  return (
    <>
      <TextInputBordered
        title={'Email'}
        error={emailError}
        placeholder={'Enter your email'}
        value={email}
        onChangeText={onChangeEmail}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={'Password'}
        error={passwordError}
        placeholder={'Enter Password'}
        value={password}
        onChangeText={onChangePassword}
        iconName={visible ? 'eye-outline' : 'eye-off-outline'}
        iconType={'ionicon'}
        iconSize={20}
        onPressIcon={() => setVisible(!visible)}
        secureTextEntry={visible}
      />

    </>
  )
}
export const FormText = ({ Boxes, onChange, boxesError }) => {
  const [visible, setVisible] = useState(true);
  return (
    <View style={{ marginHorizontal: "5%" }}>
      <Spacer isSmall />
      <Spacer isSmall />
      <TextInputBordered
        title={"Number of boxes"}
        error={boxesError}
        placeholder={"number of boxes (up to 60 lbs per box)"}
        value={Boxes}
        onChangeText={onChange}
      />
      <Spacer isSmall />
    </View>
  );
};
export const CheckBoxItem = ({ title, description, value, onpress }) => {
  return (
    <>
      <RowWrapperBasic>
        <CheckBox
          checked={value}
          onPress={onpress}
          containerStyle={styles.checkboxContainer}
        />
        <View style={styles.textContainer}>
          <InputTitle>{title}</InputTitle>
          <RegularText style={{ color: colors.appTextColor11 }}>
            {description}
          </RegularText>
        </View>
      </RowWrapperBasic>
    </>
  );
};
export const Check_Box = ({ title, description }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <RowWrapper>
          <CheckBox
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.checkboxContainer}
          />
        </RowWrapper>
        <RegularText style={{ color: colors.appTextColor11, top: "5%", right: "20%" }}>
          {description}
        </RegularText>
      </View>
    </>
  );
};
export const SizeOptions = ({ onSelectionChange }) => {
  const [selectedSizes, setSelectedSizes] = useState({
    small: false,
    medium: false,
    large: false,
    extraLarge: false,
  });
  const handleCheck = (size) => {
    const newSizes = {
      // small: false,
      // medium: false,
      // large: false,
      // extraLarge: false,
      [size]: true
    };
    setSelectedSizes(size);
    if (typeof onSelectionChange === "function") {
      onSelectionChange(size);
    } else {
      console.warn("onSelectionChange is not a function");
    }
  };

  return (
    <Wrapper style={styles.optionsContainer_}>
      <Wrapper style={styles.optionRow_}>
        <CheckBox
          checked={selectedSizes == "small"}
          onPress={() => handleCheck("small")}
          title={
            <RegularText style={{ color: colors.black }}>Small</RegularText>
          }
        />
        <CheckBox
          checked={selectedSizes == "medium"}
          onPress={() => handleCheck("medium")}
          title={
            <RegularText style={{ color: colors.black }}>Medium</RegularText>
          }
        />
      </Wrapper>
      <Wrapper style={styles.optionRow_}>
        <CheckBox
          checked={selectedSizes == "large"}
          onPress={() => handleCheck("large")}
          title={
            <RegularText style={{ color: colors.black }}>Large</RegularText>
          }
        />
        <CheckBox
          checked={selectedSizes == "extraLarge"}
          onPress={() => handleCheck("extraLarge")}
          title={
            <RegularText style={{ color: colors.black }}>
              Extra Large
            </RegularText>
          }
        />
      </Wrapper>
    </Wrapper>
  );
};

//SIGNUP SCREEN
export const ProfileForm = ({ firstName, onChangeFirstName, secondName, onChangeSecondName, phone, onChangePhone, location, onChangeLocation, onPress }) => {

  return (
    <>
      <TextInputBordered
        title={'First Name'}
        placeholder={'Enter First Name...'}
        value={firstName}
        onChangeText={onChangeFirstName}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={'Last Name'}
        placeholder={'Enter Last Name...'}
        value={secondName}
        onChangeText={onChangeSecondName}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={'Phone number'}
        placeholder={'Enter your Phone number...'}
        value={phone}
        onChangeText={onChangePhone}
      />
      <Spacer isSmall />
      <TextInputBordered
        title={'Location'}
        placeholder={'Enter your location...'}
        value={location}
        onChangeText={onChangeLocation}
        editable={false}
        right={<PrimaryImage size={totalSize(2.8)} source={Icons.marker} />}
        onPress={onPress}
        isButton
        onPressIcon={onPress}
        containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      />
      <Spacer isSmall />
    </>
  )
}
//DRIVER HOME SCREEN (REQUEST NEAR YOU)
export const NearByRequests = () => {
  return (
    <></>
  )
}
//SETTINGS LIST FOR CLIENT
export const SettingsList = ({ }) => {
  const navigation = useNavigation()
  const { LOGOUTAPP } = useAuth()
  const HandlePress = (item) => {
    if (item?.title == 'Logout') {
      LOGOUTAPP()
    } else {
      navigation?.navigate(item?.screen)
    }
  }
  return (
    <FlatList
      data={Settings}
      ItemSeparatorComponent={() => <Spacer isBasic />}
      ListHeaderComponent={() => <Spacer height={height(3)} />}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity activeOpacity={0.8} onPress={() => HandlePress(item)} >
            <RowWrapperBasic>
              <Icon name={item?.iconName} type={item?.iconType} size={20} />
              <RegularText style={styles.settingTitle}>{item?.title}</RegularText>
            </RowWrapperBasic>
          </TouchableOpacity>
        )
      }}
    />
  )
}
//NOTIFICATION SETTINGS
export const NotificationCategories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    generalNotification: false,
    sound: false,
    vibrate: false,
  });
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const userId = await getCurrentUserId();
        const userData = await getData("users", userId);
        if (userData.notifications) {
          setSettings(userData.notifications);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notification settings:", error);
      }
    };

    fetchNotificationSettings();
  }, []);
  const handleValueChange = async (key) => {
    const userId = await getCurrentUserId();
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    saveData("users", userId, {
      notifications: { [key]: newSettings[key] },
    })
      .then(() => {
        console.log(`${key} updated to ${newSettings[key]} in DB`);
        //  dispatch(signin({ notifications: { [key]: newSettings[key] } }));
      })
      .catch((error) => console.error("Error saving setting to DB:", error));
  };

  const renderItem = ({ item }) => {
    return (
      <Wrapper style={styles.categoryContainer}>
        <NotificationSettingWrapper
          title={item.label}
          enable={settings[item.key]}
          onValueChange={() => handleValueChange(item.key)}
        />
      </Wrapper>
    );
  };
  const notificationOptions = [
    { key: "generalNotification", label: "General Notification" },
    { key: "sound", label: "Sound" },
    { key: "vibrate", label: "Vibrate" },
  ];

  return (
    <FlatList
      data={notificationOptions}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      ListHeaderComponent={
        <MediumText style={styles.categoryTitle}>{"Common"}</MediumText>
      }
    />
  );
};
//VEHICLES LIST ON SELECT DRIVER SCREEN
export const SelectVehicles = ({ onPressVevicle }) => {
  return (
    <Wrapper>
      <RegularText style={styles.selectVehicleText}>Select Vehicle</RegularText>
      <FlatList
        data={VehiclesList}
        ItemSeparatorComponent={() => <Spacer isSmall />}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPressVevicle(item)} style={styles.vehicleBgWrapper}>
              <RowWrapper style={{ marginHorizontal: width(3) }}>
                <RowWrapperBasic>
                  <>
                    <PrimaryImage source={item?.vehiclePhoto} size={totalSize(8)} />
                    <SmallTitleWithDesc title={item?.userName} titleStyle={styles.vehicleUser} location={item?.pickupTime} locationStyle={styles.vehiclePickupTime} />
                  </>
                </RowWrapperBasic>
                <RegularText style={styles.vehiclePrice}>{`$${item?.price}`}</RegularText>
              </RowWrapper>
            </TouchableOpacity>
          )
        }} />
    </Wrapper>
  )
}
//BOOKING LIST ON MY BOOKINGS
export const BookingsList = ({ onPressPhone, onPressChat }) => {
  return (
    <FlatList
      data={[1, 2, 3]}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Spacer isSmall />}
      ListHeaderComponent={() => <Spacer isBasic />}
      ListFooterComponent={() => <Spacer height={height(4)} />}
      renderItem={() => {
        return (
          <BookingCard onPressPhone={onPressPhone} onPressChat={onPressChat} />
        )
      }}
    />
  )
}

export const HistoryList = ({ history, user }) => {
  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Spacer isSmall />}
      ListHeaderComponent={() => <Spacer isBasic />}
      ListFooterComponent={() => <Spacer height={4} />}
      renderItem={({ item }) => (
        <HistoryCard
          name={user.firstName}
          photo={user.photo}
          price={item.deliverydetails.totalcharges}
          pickupAddress={item.pickupdetails.pickupaddress}
          destination={item.destinationdetails.destination}
          status={item.status}
        />
      )}
    />
  );
}
//ADD CARD DETAIL
export const PaymentForm = ({ name, onChangeName, cardNo, onChangeCardNo, expiry, onChangeExpiry, cvv, onChangeCvv, source }) => {
  return (
    <Wrapper>
      <SmallTitle style={styles.paymentTitle}>Add Card Details</SmallTitle>
      <Spacer isBasic />
      <TextInputBordered value={name} onChangeText={onChangeName} titleStyle={styles.inputTitle} containerStyle={styles.paymentInput} title={'Name on card'} placeholder={'Olivia'} />
      <Spacer isBasic />
      <TextInputBordered value={cardNo} onChangeText={onChangeCardNo} left={<PrimaryImage styles={{ marginLeft: width(3) }} size={totalSize(3)} source={source} />} titleStyle={styles.inputTitle} containerStyle={styles.paymentInput} title={'Card number'} placeholder={'1234 1234 1234 1234'} />
      <Spacer isBasic />
      <RowWrapper style={{ marginHorizontal: 0 }}>
        <TextInputBordered value={expiry} onChangeText={onChangeExpiry} titleStyle={styles.inputTitle} containerStyle={[styles.paymentInput, { width: width(42) }]} title={'Expiry'} placeholder={'06 / 2024'} />
        <TextInputBordered value={cvv} onChangeText={onChangeCvv} titleStyle={styles.inputTitle} containerStyle={[styles.paymentInput, { width: width(42) }]} title={'CVV'} placeholder={'•••'} secureTextEntry={true} />
      </RowWrapper>
    </Wrapper>
  )
}

////////////////////DRIVER SIDE/////////////////

export const DriverSettingsList = ({ }) => {
  const navigation = useNavigation()
  const { replace, navigate } = navigation
  const { LOGOUTAPP } = useAuth()
  const handlePressSetting = (item) => {
    if (item?.title == 'Logout') {
      LOGOUTAPP()
    }
    else {
      navigate(item?.screen)
      console.log('first')
      return
      navigate(item?.stack, { screen: item?.screen })
    }
    // item?.title == 'Logout' ? replace(SCREEN.authStack, { screen: SCREEN.onboarding }) : navigate(item?.stack, { screen: item?.screen })
  }
  return (
    <FlatList
      data={DriverSettings}
      ItemSeparatorComponent={() => <Spacer isBasic />}
      ListHeaderComponent={() => <Spacer height={height(3)} />}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity activeOpacity={0.8} onPress={() => handlePressSetting(item)} >
            <RowWrapperBasic>
              <Icon name={item?.iconName} type={item?.iconType} size={20} />
              <RegularText style={styles.settingTitle}>{item?.title}</RegularText>
            </RowWrapperBasic>
          </TouchableOpacity>
        )
      }}
    />
  )
}


//ORDER HISTORY LIST
export const YourOrderHistory = ({ onPressCard, history }) => {

  return (
    <Wrapper flex={1}>
      <FlatList
        style={{ flex: 1 }}
        data={history}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Spacer isBasic />}
        ItemSeparatorComponent={<Spacer isSmall />}
        ListFooterComponent={<Spacer isBasic />}
        renderItem={({ item }) => {
          return (
            <ComponentWrapper>
              <DriverOrderHistoryCard
                lineStyle={{ width: width(88) }}
                onPressCard={onPressCard}
                name={item?.user?.firstName}
                photo={item?.user?.photo}
                price={item?.deliverydetails?.totalcharges}
                pickup={item?.pickupdetails?.pickupaddress}
                des={item?.destinationdetails?.destination}
                status={item.status}
              />
            </ComponentWrapper>
          );
        }}
      />
    </Wrapper>
  );
}
//REVIEW LIST
const getTimeAgo = (timestamp) => {
  if (!timestamp || !timestamp.seconds) {
    return "No date available";
  }
  const now = new Date();
  const reviewDate = new Date(timestamp.seconds * 1000);
  const diffInMs = now - reviewDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else {
    return `${diffInDays} days ago`;
  }
};
export const ReviewList = ({
  reviews,
  userProfile,
  userName,
}) => {
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <Hrline style={styles.reviewSepratorLine} />
      )}
      ListHeaderComponent={() => <Spacer height={height(3)} />}
      renderItem={({ item }) => (
        <Wrapper>
          <RowWrapper>
            <RowWrapperBasic>
              <RoundImage
                size={totalSize(5)}
                source={{ uri: userProfile || Images.user1 }}
              />
              <Wrapper style={{ marginLeft: width(3) }}>
                <MediumText>{userName}</MediumText>
                <AirbnbRating
                  defaultRating={item.rating}
                  selectedColor={colors.appIcon17}
                  size={10}
                  showRating={false}
                />
              </Wrapper>
            </RowWrapperBasic>
            <RegularText style={styles.reviewTime}>
              {getTimeAgo(item.timestamp)}
            </RegularText>
          </RowWrapper>
          <Spacer isSmall />
          <RegularText style={styles.comment}>{item.review}</RegularText>
        </Wrapper>
      )}
    />
  );
};
