import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AbsoluteWrapper, ButtonColored, MainHeader, MainWrapper, MediumText, RegularText, Spacer, TextInputBordered, Wrapper } from '../../../components'
import { width, height, totalSize } from 'react-native-dimension'
import { SCREEN, colors, fontFamily } from '../../../constants'

const SendSpecificAmountReward = ({ navigation }) => {
    const { navigate } = navigation
const [tip,setTip] = useState('')
    return (
        <MainWrapper>
            <MainHeader style={{ marginHorizontal: width(5) }} title={'Send Reward'} />
            <Spacer isBasic />
            <RegularText style={styles.description}>Enter amount that you want to send</RegularText>
            <Spacer height={height(7)} />
            <TextInputBordered keyboardType={'number-pad'} placeholder={'60$'} containerStyle={styles.input} inputStyle={styles.placeholder} value={`${tip}$`} onChangeText={(e)=>setTip(e)}/>
            <AbsoluteWrapper style={styles.btn}> 

            <ButtonColored text='SEND TIP' onPress={()=>navigate(SCREEN.rewardSended)} />
            </AbsoluteWrapper>
        </MainWrapper>
    )
}

export default SendSpecificAmountReward

const styles = StyleSheet.create({
    description: {
        marginHorizontal: width(5),
        color: colors.appTextColor2
    },
    input: {
        // backgroundColor:'red',
        height: height(9),
        width: width(92),
        alignSelf: 'center',
        textAlignVertical: 'top'
    },
    placeholder: {
        textAlignVertical: 'center',
        color: colors.appTextColor28,
        fontFamily: fontFamily.appTextMedium,
        height: height(9),
        alignSelf: 'center',
        // width:width(92),
        fontSize: totalSize(2)
    },
    btn:{
        position:'absolute',
        left:width(5),
        right:width(5),
        bottom:height(5)
    }
})