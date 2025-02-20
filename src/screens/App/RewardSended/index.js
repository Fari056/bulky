import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { MainWrapper } from '../../../components'
import { CongratulationsScreen } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const RewardSended = ({ navigation }) => {
    const { navigate } = navigation
    useEffect(() => {
        setTimeout(() => {
            navigate(SCREEN.clientHome)
        }, 2500);
    }, [])
    return (
        <MainWrapper>
            <CongratulationsScreen title={'Reward Sended'} description={'Morbi porttitor eros blandit, imperdiet lectus et, malesuada odio.'} />
        </MainWrapper>
    )
}

export default RewardSended

const styles = StyleSheet.create({})