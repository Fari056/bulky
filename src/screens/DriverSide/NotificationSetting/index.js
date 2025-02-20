import { View, Text } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { NotificationCategories } from '../../../components/appComponents/generalComponents'

const NotificationSetting = () => {
    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={'Notification Setting'} />
                <NotificationCategories />
            </ComponentWrapper>
        </MainWrapper>
    )
}

export default NotificationSetting