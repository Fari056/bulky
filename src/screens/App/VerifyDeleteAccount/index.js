import { View, Text } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { AbsoluteButton, Verification } from '../../../components/appComponents/staticComponents'
import { SCREEN, colors } from '../../../constants'

const VerifyDeleteAccount = ({ navigation }) => {
    const { replace } = navigation
    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={'Verification'} />
                <Verification />
            </ComponentWrapper>
            <AbsoluteButton style={{ backgroundColor: colors.appButton3 }} title={'DELETE MY ACCOUNT'} onPress={() => replace(SCREEN.authStack, { screen: SCREEN.accountType })} />
        </MainWrapper>
    )
}

export default VerifyDeleteAccount