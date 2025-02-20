import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { MainWrapper } from '../../../../../components'
import { CongratulationsScreen } from '../../../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../../../constants'

const Submitted = ({ navigation }) => {
    const { navigate } = navigation

    useEffect(() => {
        setTimeout(() => {
            // navigate(SCREEN.clientHome)
            navigate(SCREEN.connectingWithDriver)
        }, 1500);
    }, [])

    return (
        <MainWrapper>
            <CongratulationsScreen
                title={'Request Submitted'}
                description={'Morbi porttitor eros blandit, imperdiet lectus et, malesuada odio.'}
            />
        </MainWrapper>
    )
}

export default Submitted

const styles = StyleSheet.create({})