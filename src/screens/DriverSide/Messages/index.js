import { View, Text } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import UserList from './UserList'
import { SCREEN } from '../../../constants'

const Messages = ({ navigation }) => {
    const { navigate } = navigation
    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader />
            </ComponentWrapper>
            <UserList onPressUser={() => navigate(SCREEN.driverChat)} />
        </MainWrapper>
    )
}

export default Messages 