import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { MainWrapper } from '../../../components'
import { CongratulationsScreen } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const DeliveryCanceled = ({ navigation }) => {
    const { replace } = navigation

    useEffect(() => {
        setTimeout(() => {
            replace(SCREEN.driverStack)
        }, 2500);
    }, [])
    return (
        <MainWrapper>
            <CongratulationsScreen title={'Delivery Canceled '} description={'Morbi porttitor eros blandit, imperdiet lectus et, malesuada odio.'} />
        </MainWrapper>
    )
}

export default DeliveryCanceled

const styles = StyleSheet.create({})