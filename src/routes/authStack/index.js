import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN } from '../../constants';
import * as Auth from '../../screens/Auth'
const { Navigator, Screen } = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREEN.onboardings}
    >
      <Screen name={SCREEN.onboardings} component={Auth.OnBoardings} />
      <Screen name={SCREEN.accountType} component={Auth.AccountType} />
      <Screen name={SCREEN.questionaire} component={Auth.Questionaire} />
      <Screen name={SCREEN.signUp} component={Auth.SignUp} />
      <Screen name={SCREEN.otp} component={Auth.Otp} />
      <Screen name={SCREEN.signIn} component={Auth.SignIn} />
      <Screen name={SCREEN.forgotPassword} component={Auth.ForgotPassword} />
      <Screen
        name={SCREEN.completeProfile}
        component={Auth.CompleteProfile}
      />
      <Screen name={SCREEN.Profilelocation} component={Auth.ProfileLocation} />
      <Screen
        name={SCREEN.completeDriverProfile}
        component={Auth.CompleteDriverProfile}
      />

      <Screen
        name={SCREEN.driverProfileCompleted}
        component={Auth.DriverProfileCompleted}
      />
      <Screen
        name={SCREEN.scanDriverInsuranceCard}
        component={Auth.ScanDriverInsuranceCard}
      />
      <Screen name={SCREEN.cardScanner} component={Auth.CardScanner} />
      <Screen
        name={SCREEN.selectPaymentMethods}
        component={Auth.SelectPaymentMethods}
      />
    </Navigator>
  );
};
export default AuthNavigation;