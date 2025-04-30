import React from 'react';
import { Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SCREEN, colors, tabs } from '../../constants';
import * as Driver from '../../screens/DriverSide'
import { height, width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements';
import { Avatar, RoundImage } from '../../components';
import { Images } from '../../utilities';
import * as Auth from '../../screens/Auth'
import { useSelector } from 'react-redux';
import * as App from "../../screens/App";

const { Navigator, Screen } = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const user_redux = useSelector(state => state.user)
  const TabData = [
    { screen: SCREEN.driverHome, component: Driver.Home, iconName: 'home', iconType: 'simple-line-icon' },
    { screen: SCREEN.driverBookings, component: Driver.Bookings, iconName: 'calendar', iconType: 'antdesign' },
    // { screen: SCREEN.driverMessages, component: Driver.Messages, iconName: 'chatbubbles-outline', iconType: 'ionicon' },
    { screen: SCREEN.driverProfile, component: Driver.Profile, iconName: 'profile', profilePhoto: true },
  ]
  return (
    <Tab.Navigator
      initialRouteName={SCREEN.driverHome} screenOptions={tabs.screenOptions}>
      {TabData.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item?.screen} component={item.component}
            options={() => ({
              tabBarIcon: ({ color }) => (
                item?.profilePhoto ? <Avatar resizeMode={'cover'} source={{ uri: user_redux?.photo?.length > 0 ? user_redux?.photo : Images.user2 }} size={totalSize(3)} /> :
                  <Icon name={item?.iconName} type={item?.iconType} color={color} />
                // item?.iconName == 'home' ? <HomeTab color={color} /> : item?.iconName == 'history' ? <JobHistoryTab color={color} /> : item?.iconName == 'notification' ? <NotificationTab color={color} /> : <ProfileTab color={color} />
              ),
            })}
          />
        )
      })
      }
    </Tab.Navigator>
  );
}



const DriverAppNavigation = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREEN.driverTab}
    >
      <Screen name={SCREEN.driverTab} component={MyTabs} />
      <Screen name={SCREEN.driverSetting} component={Driver.Settings} />
      <Screen
        name={SCREEN.driverNotificationSetting}
        component={Driver.NotificationSetting}
      />
      <Screen name={SCREEN.driverHistory} component={Driver.History} />
      <Screen name={SCREEN.driverReviews} component={Driver.Reviews} />
      <Screen name={SCREEN.deleteAccount} component={App.DeleteAccount} />
      <Screen name={SCREEN.driverWallet} component={Driver.Wallet} />
      <Screen
        name={SCREEN.driverRequestDetail}
        component={Driver.RequestDetail}
      />
      <Screen name={SCREEN.driverViewReceipt} component={Driver.ViewReceipt} />
      <Screen
        name={SCREEN.driverConnectingWithUser}
        component={Driver.ConnectingWithUser}
      />
      <Screen name={SCREEN.driverPickupPoint} component={Driver.PickupPoint} />
      <Screen name={SCREEN.Chat} component={App.Chat} />
      <Screen name={SCREEN.location} component={App.Location} />
      <Screen name={SCREEN.driverItemImages} component={Driver.ItemImages} />
      <Screen
        name={SCREEN.driverImagePreview}
        component={Driver.ImagePreview}
      />
      <Screen
        name={SCREEN.driverDeliveryCanceled}
        component={Driver.DeliveryCanceled}
      />
      <Screen
        name={SCREEN.selectPaymentMethods}
        component={Auth.SelectPaymentMethods}
      />
      <Screen name={SCREEN.privacyPolicy} component={App.PrivacyPolicy} />
      <Screen name={SCREEN.feedBack} component={App.FeedBack} />
      <Screen name={SCREEN.customerSupport} component={App.CustomerSupport} />
    </Navigator>
  );
};
export default DriverAppNavigation;