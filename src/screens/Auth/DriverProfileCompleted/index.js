import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { MainWrapper } from '../../../components'
import { CongratulationsScreen } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const DriverProfileCompleted = ({ navigation }) => {
    const { replace, navigate } = navigation
    useEffect(() => {
        setTimeout(() => {
            replace(SCREEN.driverStack)
        }, 1500);
    }, [])
    return (
        <MainWrapper>
            <CongratulationsScreen />
        </MainWrapper>
    )
}

export default DriverProfileCompleted