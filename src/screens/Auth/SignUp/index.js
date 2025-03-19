import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonColored, ComponentWrapper, LineWithText, MainWrapper, MediumText, RegularText, ScrollView, SmallText, Spacer, TextInputBordered } from '../../../components'
import { SignInText, SocialWrapper, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { SignUpForm } from '../../../components/appComponents/generalComponents'
import { SCREEN, colors } from '../../../constants'
import { height } from 'react-native-dimension'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../hooks'
import { _GoogleSignin } from '../../../backend/auth'
import { saveData } from '../../../backend/utility'
import { signup } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
const SignUp = ({ navigation }) => {
    const { navigate } = navigation
    const dispatch = useDispatch();
    const {
        userName, setUserName,
        email, setEmail,
        emailError, setEmailError,
        password, setPassword,
        passwordError, setPasswordError,
        confirmPassword, setConfirmPassword,
        confirmPasswordError, setConfirmPasswordError,
        phoneNumber, setPhone,
        SignUpClient, loading
    } = useAuth()
     const accountType = useSelector((state) => state.account_type);
      const google = async () => {
        try {
          const data = await _GoogleSignin();
          if (!data || !data.user) {
            console.log("Google Sign-up failed.");
            return;
          }
           const res = {
             ...data.user,
             provider: "google",
             type: accountType,
           };
           console.log("Google Sign-up success:", res);
           await saveData("users", data.uid, res);
           navigate(SCREEN.completeProfile)
           dispatch(signup(res));
        } catch (error) {
          console.error("Error during Google Sign-up:", error);
        }
      };
    return (
      <MainWrapper>
        <ComponentWrapper>
          <ScrollView>
            <Spacer height={height(4)} />
            <TitleWithDescription title={"SIGN UP"} />
            <Spacer height={height(3)} />
            <SignUpForm
              email={email}
              onChangeEmail={(e) => {
                setEmail(e);
                setEmailError("");
              }}
              password={password}
              onChangePassword={(e) => {
                setPassword(e);
                setPasswordError("");
              }}
              confirmPassword={confirmPassword}
              onChangeConfirmPAssword={(e) => {
                setConfirmPassword(e);
                setConfirmPasswordError("");
              }}
              emailError={emailError}
              passwordError={passwordError}
              confirmPasswordError={confirmPasswordError}
              // phoneNumber={phoneNumber}
              // onChangePhone={(e) => setPhone(e)}
              userName={userName}
              onChangeUserName={(e) => setUserName(e)}
              accountType={accountType}
            />
            <Spacer isDoubleBase />
            <ButtonColored
              text="SIGN UP"
              isLoading={loading}
              onPress={SignUpClient}
            />
            <Spacer isBasic />
            <SignInText onPressSignin={() => navigate(SCREEN.signIn)} />
            <LineWithText />
            <SocialWrapper onPressGoogle={google} />
          </ScrollView>
        </ComponentWrapper>
      </MainWrapper>
    );
}

export default SignUp