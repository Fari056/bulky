import React, { useState } from 'react'
import { ComponentWrapper, MainHeader, MainWrapper, RegularText, Spacer, TextInputBordered } from '../../../components'
import { AbsoluteButton, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { Strings } from '../../../constants/strings.js'
import { SCREEN, colors } from '../../../constants'
import { ToastSuccess } from '../../../utilities'
import { ResetPassword } from '../../../backend/auth'
import Validations from '../../../utilities/validations'

const ForgotPassword = ({ navigation }) => {
    const { navigate } = navigation
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const valid = () => {
        !email ? setEmailError('Please enter your email, it is a required field') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
        if (email && Validations.validateEmail(email)) {
            return true
        } else {
            return false
        }
    }

    const HandleContinue = async () => {
        if (valid()) {
            try {
                setLoading(true)
                let res = await ResetPassword(email?.trim())
                if (res == true) {
                    ToastSuccess('Email sent successfully')
                    navigate(SCREEN?.signIn)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
    }

    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader />
                <TitleWithDescription descriptionColor={colors.appTextColor2} title={'FORGET PASSWORD'} description={'Please enter the email address associated with your account'} />
                <Spacer isDoubleBase />
                <TextInputBordered
                    value={email}
                    onChangeText={(t) => {
                        setEmail(t)
                        setEmailError('')
                    }}
                    error={emailError}
                    title={'Email'}
                    placeholder={'Enter your email'} />
                <Spacer isSmall />
                <RegularText style={{ lineHeight: 16 }} color={colors.appTextColor10}>{Strings.description}</RegularText>
            </ComponentWrapper>
            <AbsoluteButton
                isLoading={loading}
                title={'SEND OTP'} onPress={HandleContinue} />
        </MainWrapper>
    )
}

export default ForgotPassword