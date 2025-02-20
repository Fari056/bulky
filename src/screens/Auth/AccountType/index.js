import React, { useState } from 'react'
import { useDispatch, } from 'react-redux'
import { MainWrapper, Spacer } from '../../../components'
import { AccountTypes } from '../../../components/appComponents/generalComponents'
import { AbsoluteButton, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'
import { Strings } from '../../../constants/strings.js'
import { set_account_type } from '../../../redux/actions'

const AccountType = ({ navigation }) => {
    const { navigate } = navigation
    const [activeAccount, setActiveAccount] = useState(-1);
    const dispatch = useDispatch()
    const setUserAccount = (index) => {
        setActiveAccount(index)
        dispatch(set_account_type(index === 0 ? 'client' : index === 1 ? 'driver' : 'helper'))
    }
    return (
        <MainWrapper>
            <Spacer isDoubleBase />
            <TitleWithDescription title={'Select Account Type'} description={Strings.description} />
            <Spacer isBasic />
            <AccountTypes active={activeAccount} onPress={setUserAccount} />
            <AbsoluteButton disabled={activeAccount < 0} title={'NEXT'} onPress={() => navigate(SCREEN.signUp)} />
        </MainWrapper>
    )
}

export default AccountType