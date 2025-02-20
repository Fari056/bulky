import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { DriverSettingsList, SettingsList } from '../../../components/appComponents/generalComponents'
import { DeleteAccount } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'
import { useSelector } from 'react-redux'

const Settings = ({ navigation }) => {
    const { navigate } = navigation
    const user_redux = useSelector(state => state.user)
    const [user, setUser] = useState(user_redux)

    useEffect(() => {
        setUser(user_redux)
    }, [user_redux])

    return (
      <MainWrapper>
        <ComponentWrapper>
          <MainHeader title={"Setting"} />
          <DriverSettingsList user={user} />
          <DeleteAccount onPressDelete={() => navigate(SCREEN.deleteAccount)} />
          </ComponentWrapper>
      </MainWrapper>
    );
}

export default Settings