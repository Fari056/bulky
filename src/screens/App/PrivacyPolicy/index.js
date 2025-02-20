import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper, RegularText, Spacer } from '../../../components'
import { Strings } from '../../../constants/strings.js'
import { colors } from '../../../constants'

const PrivacyPolicy = () => {
    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={'Privacy Policy'} />
                <Spacer isBasic />
                <RegularText style={styles.policy}>{Strings.privacyPolicy}</RegularText>
            </ComponentWrapper>
        </MainWrapper>
    )
}

export default PrivacyPolicy
const styles = StyleSheet.create({
    policy: {
        textAlign: 'justify',
        lineHeight: 16,
        color: colors.appTextColor16
    }
})