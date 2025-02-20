import { View, Text } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { SettingsList } from '../../../components/appComponents/generalComponents'
import { DeleteAccount } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const Setting = ({ navigation }) => {
    const { navigate } = navigation
    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={'Setting'} />
                <SettingsList />
                <DeleteAccount onPressDelete={() => navigate(SCREEN.deleteAccount)} />
            </ComponentWrapper>
        </MainWrapper>
    )
}

export default Setting