import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import AuthNavigation from "./authStack";
import { SCREEN } from "../constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigation from "./appStack";
import { Splash } from "../screens";
import DriverAppNavigation from "./driverStack";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../backend/auth";
import { getData, getDataWithUser } from "../backend/utility";
import { set_bookings, signin } from "../redux/actions";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";

const { Navigator, Screen } = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const user_redux = useSelector((state) => state.user);
  const user_type = useSelector((state) => state.account_type);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const Get = async () => {
    try {
      let _uid = await getCurrentUserId();
      if (_uid) {
        let data = await getData("users", _uid);
        setUser(data);
        dispatch(signin(data));
      } else {
        setUser(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);

  useEffect(() => {
    Get();
    GetBookings()
  }, []);

  const GetBookings = async () => {
    let _uid = await getCurrentUserId();
    if (_uid) {
      let data = await getDataWithUser("bookings");
      dispatch(set_bookings(data));
    }
  }

  let isActive = user?.isActive && user;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Splash />
      ) : (
        <NavigationContainer>
          {(user == null || !user?.isActive) && <AuthNavigation />}
          {isActive && user.type == "client" && <AppNavigation />}
          {isActive && user.type != "client" && <DriverAppNavigation />}


          {/* <Navigator screenOptions={{ headerShown: false }}
                        initialRouteName={SCREEN.authStack}>
                        <Screen name={SCREEN.authStack} component={AuthNavigation} />
                        <Screen name={SCREEN.appStack} component={AppNavigation} />
                        <Screen name={SCREEN.driverStack} component={DriverAppNavigation} />
                    </Navigator> */}
        </NavigationContainer>
      )}
      <Toast config={{
        error: (props) => (
          <ErrorToast {...props} text1NumberOfLines={3} text2NumberOfLines={3} />
        ),
        success: (props) => (
          <SuccessToast {...props} text1NumberOfLines={3} text2NumberOfLines={3} />
        ),
      }} />
    </SafeAreaView>
  );
};

export default Routes;
