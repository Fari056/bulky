import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ButtonColored, ComponentWrapper, LineWithText, MainWrapper, MediumText, RegularText, ScrollView, Spacer, } from '../../../components'
import { SignInText, SocialWrapper, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { SignInForn } from '../../../components/appComponents/generalComponents'
import { SCREEN, colors } from '../../../constants'
import { height } from 'react-native-dimension'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../hooks'
import { _GoogleSignin } from '../../../backend/auth'
import { getData, saveData } from '../../../backend/utility'
import { useDispatch } from 'react-redux'
import { signin, set_account_type } from '../../../redux/actions'
import { ClientHome } from '../../App'
const SignIn = ({ navigation, }) => {
    const { navigate, replace } = navigation
     const dispatch = useDispatch();
    const {
        email, setEmail,
        emailError, setEmailError,
        password, setPassword,
        passwordError, setPasswordError,
        loading,
        LogInUser,
    } = useAuth()
    const account_redux = useSelector((state) => state?.account_type);  
 const google = async () => {
   try {
     const data = await _GoogleSignin();
     console.log("Google Sign-In Data:", data);
     const userId = data.uid;
     const userData = await getData("users", userId);
     if (!userData) {
       console.log("No user data found.");
       return;
     }
    if (!userData.isActive) {
        replace(SCREEN.completeProfile);
     } else {
      const accountType = userData.type || account_redux;
       dispatch(set_account_type(accountType));
       dispatch(
         signin({ ...data.user, provider: "google", type: accountType })
       );
      replace(accountType === "client" ? SCREEN.appStack : SCREEN.driverStack);
     }
   } catch (error) {
     console.error("Error during Google Sign-In:", error);
   }
 };


    return (
        <MainWrapper>
            <ComponentWrapper>
                <Spacer height={height(4)} />
                <TitleWithDescription title={'SIGN IN'} />
                <Spacer height={height(3)} />
                <SignInForn
                    email={email}
                    emailError={emailError}
                    passwordError={passwordError}
                    onChangeEmail={(e) => {
                        setEmail(e)
                        setEmailError('')
                    }}
                    password={password}
                    onChangePassword={(e) => {
                        setPassword(e)
                        setPasswordError('')
                    }}
                />
                <Spacer isSmall />
                <RegularText color={colors.appTextColor9} style={{ alignSelf: 'flex-end' }} onPress={() => navigate(SCREEN.forgotPassword)}>Forgot Password</RegularText>
                <Spacer isDoubleBase />
                {/* <ButtonColored text='SIGN IN' onPress={() => replace(account_redux == 'client' ? SCREEN.appStack : SCREEN.driverStack)} /> */}
                <ButtonColored text='SIGN IN' isLoading={loading} onPress={LogInUser} />
                <Spacer isBasic />
                <SignInText title={'SIGN UP'} description={`Don't have an acount`} onPressSignin={() => navigate(SCREEN.signUp)} />
                <LineWithText />
                <Spacer isBasic />
                <SocialWrapper onPressGoogle={google} />
            </ComponentWrapper>
        </MainWrapper>
    )
}

export default SignIn