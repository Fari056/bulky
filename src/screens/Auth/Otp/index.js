import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ComponentWrapper, MainHeader, MainWrapper, Spacer } from '../../../components'
import { AbsoluteButton, Countdown, OTPInput, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { SCREEN, colors } from '../../../constants'
import { height } from 'react-native-dimension'
import { useClearByFocusCell, } from 'react-native-confirmation-code-field';

const Otp = ({ navigation }) => {
    const { navigate } = navigation
    const [value, setValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
    return (
        <MainWrapper>
            <ComponentWrapper>
                <Spacer isBasic />
                <MainHeader />
                <TitleWithDescription descriptionColor={colors.appTextColor2} title={'OTP FOR CONFIRMATION'} description={'Please enter OTP code to for confirmation'} />
                <Spacer height={height(10)} />
                <OTPInput props={props} value={value} onChangeText={setValue} getCellOnLayoutHandler={getCellOnLayoutHandler} />
                <Spacer height={height(7)} />
                <Countdown />
            </ComponentWrapper>
            <AbsoluteButton title={'CONFIRM'} onPress={() => navigate(SCREEN?.completeProfile)} />
        </MainWrapper>
    )
}

export default Otp