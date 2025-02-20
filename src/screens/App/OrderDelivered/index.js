import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { MainWrapper } from '../../../components'
import { CongratulationsScreen } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const OrderDelivered = ({ navigation }) => {
    const { navigate, goBack } = navigation

    useEffect(() => {
        setTimeout(() => {
            navigate(SCREEN.trackingDelivery, { delivered: true })
        }, 1500);
    }, [])
    return (
        <MainWrapper>
            <CongratulationsScreen title={'Delivered'} description={'Morbi porttitor eros blandit, imperdiet lectus et, malesuada odio.'} />
        </MainWrapper>
    )
}

export default OrderDelivered