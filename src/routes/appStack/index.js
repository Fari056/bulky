import React, { useRef } from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as App from "../../screens/App";
import { SCREEN, colors } from "../../constants";
import * as Driver from "../../screens/DriverSide";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.appBgColor1}
        barStyle={"dark-content"}
      />
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={SCREEN.clientHome}
      >
        <Screen name={SCREEN.clientHome} component={App.ClientHome} />
        <Screen
          name={SCREEN.enterPickupPoint}
          component={App.EnterPickupPoint}
        />
        <Screen name={SCREEN.selectDriver} component={App.SelectDriver} />
        <Screen name={SCREEN.driverDetail} component={App.DriverDetail} />
        <Screen name={SCREEN.addNewCard} component={App.AddNewCard} />
        <Screen
          name={SCREEN.connectingWithDriver}
          component={App.ConnectingWithDriver}
        />
        <Screen name={SCREEN.setting} component={App.Setting} />
        <Screen
          name={SCREEN.notificationSetting}
          component={App.NotificationSetting}
        />
        <Screen name={SCREEN.feedBack} component={App.FeedBack} />
        <Screen name={SCREEN.privacyPolicy} component={App.PrivacyPolicy} />
        <Screen name={SCREEN.customerSupport} component={App.CustomerSupport} />
        <Screen name={SCREEN.deleteAccount} component={App.DeleteAccount} />
        <Screen
          name={SCREEN.verifyDeleteAccount}
          component={App.VerifyDeleteAccount}
        />
        <Screen name={SCREEN.history} component={App.History} />
        <Screen name={SCREEN.myBookings} component={App.MyBookings} />
        <Screen name={SCREEN.BookingRequest} component={App.BookingRequest} />
        <Screen name={SCREEN.BookingDetails} component={App.BookingDetails} />
        <Screen name={SCREEN.review} component={App.Review} />
        <Screen name={SCREEN.Chat} component={App.Chat} />
        <Screen
          name={SCREEN.trackingDelivery}
          component={App.TrackingDelivery}
        />
        <Screen name={SCREEN.orderDelivered} component={App.OrderDelivered} />
        <Screen name={SCREEN.clientProfile} component={App.ClientProfile} />
        <Screen name={SCREEN.locationDetail} component={App.LocationDetail} />
        <Screen name={SCREEN.ItemDetail} component={App.ItemDetails} />
        <Screen name={SCREEN.SelectedItems} component={App.SelectedItems} />
        <Screen name={SCREEN.Bike} component={App.Bike} />
        <Screen name={SCREEN.Boxes} component={App.Boxes} />
        <Screen name={SCREEN.Products} component={App.Products} />
        <Screen name={SCREEN.Boats} component={App.Boats} />
        <Screen name={SCREEN.location} component={App.Location} />
        <Screen name={SCREEN.Motorcycle} component={App.Motorcycle} />
        <Screen name={SCREEN.TV} component={App.TV} />
        <Screen name={SCREEN.Construction} component={App.Construction} />
        <Screen name={SCREEN.Appliances} component={App.Appliances} />
        <Screen name={SCREEN.Bed} component={App.Bed} />
        <Screen
          name={SCREEN.DeliveryCanceled}
          component={App.DeliveryCanceled}
        />
        <Screen name={SCREEN.SpecificItem} component={App.SpecificItem} />
        <Screen name={SCREEN.AddHelpers} component={App.AddHelpers} />
        <Screen
          name={SCREEN.DeliveryDateTime}
          component={App.DeliveryDateTime}
        />
        <Screen name={SCREEN.Summery} component={App.Summery} />
        <Screen name={SCREEN.Bill} component={App.Bill} />
        <Screen name={SCREEN.Submitted} component={App.Submitted} />
        <Screen name={SCREEN.deliveryPicture} component={App.DeliveryPicture} />
        <Screen name={SCREEN.sendReward} component={App.SendReward} />
        <Screen
          name={SCREEN.sendSpecificAmountReward}
          component={App.SendSpecificAmountReward}
        />
        <Screen name={SCREEN.rewardSended} component={App.RewardSended} />
        <Screen name={SCREEN.driverReviews} component={Driver.Reviews} />
      </Navigator>
    </>
  );
};
export default AppNavigation;
