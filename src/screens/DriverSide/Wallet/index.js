import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { CashWithDrawModal, ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { AbsoluteButton } from '../../../components/appComponents/staticComponents'
import DebitCard from './DreditCard'
import TransactionList from './TransactionList'
import { SCREEN } from '../../../constants'

const Wallet = ({ navigation }) => {
    const { navigate } = navigation
    const [paymentModal, setPaymentModal] = useState(false)
    const [goToNext, setGoToNext] = useState(false)
    const handlePressConfirm = () => {
        goToNext ? setPaymentModal(!paymentModal) : setGoToNext(!goToNext)
    }
    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={'Wallet'} />
            </ComponentWrapper>
            <DebitCard />
            <TransactionList />
            <AbsoluteButton title={'CASH WITHDRAWL'} onPress={() => setPaymentModal(!paymentModal)} />
            <CashWithDrawModal
                isVisible={paymentModal}
                goToNext={true}
                toggleModal={() => setPaymentModal(!paymentModal)}
                onPressCancel={() => navigate(SCREEN.selectPaymentMethods, { wallet: true })}
                // onPressCancel={() => setPaymentModal(!paymentModal)}
                onPressConfirm={handlePressConfirm} />
        </MainWrapper>
    )
}

export default Wallet