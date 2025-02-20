import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ComponentWrapper, MainHeader, MainWrapper, } from '../../../components'
import { AbsoluteButton, } from '../../../components/appComponents/staticComponents'
import { PaymentForm } from '../../../components/appComponents/generalComponents'
import { SCREEN } from '../../../constants'
import { useSelector } from 'react-redux'

const AddNewCard = ({ navigation, route }) => {
    const { navigate, goBack } = navigation
    const { item, type, wallet } = route?.params ?? false
    const [name, setName] = useState('')
    const [cardNo, setCardNo] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')
    const account_redux = useSelector(state => state?.account_type)
    const fromBillScreen = type == 'billpay'

    const handleConfirm = () => {
        account_redux == 'driver' ? navigate(SCREEN.completeDriverProfile) :
            wallet ? navigate(SCREEN.driverWallet) :
                account_redux == 'helper' ? navigate(SCREEN.driverProfileCompleted) :
                    navigate(SCREEN.connectingWithDriver)
    }

    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader />
                <PaymentForm
                    name={name}
                    onChangeName={(e) => setName(e)}
                    cardNo={cardNo}
                    onChangeCardNo={(e) => setCardNo(e)}
                    expiry={expiry}
                    onChangeExpiry={(e) => setExpiry(e)}
                    cvv={cvv}
                    onChangeCvv={(e) => setCvv(e)}
                    source={item?.source}
                />
            </ComponentWrapper>
            {!fromBillScreen && <AbsoluteButton title={'CONFIRM'}
                onPress={handleConfirm} />}
            {fromBillScreen && <AbsoluteButton title={'CONFIRM'}
                onPress={() => { navigate(SCREEN.Submitted) }} />}
        </MainWrapper>
    )
}

export default AddNewCard
