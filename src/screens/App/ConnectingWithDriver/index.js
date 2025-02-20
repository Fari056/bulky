import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MainWrapper } from '../../../components'
import { ConnectingDriverAnimation, VehicleLocation } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const ConnectingWithDriver = ({ navigation }) => {
    const { navigate } = navigation
    return (
        <MainWrapper>
            <VehicleLocation hideBackBtn mapStyle={{ height: '85%' }} />
            <ConnectingDriverAnimation navigate={() => navigate(SCREEN.trackingDelivery, { payment: true })} />
            {/* <ConnectingDriverAnimation navigate={() => navigate(SCREEN.driverDetail, { payment: true })} /> */}
        </MainWrapper>
    )
}

export default ConnectingWithDriver

