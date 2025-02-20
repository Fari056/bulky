import { View, Text } from 'react-native'
import React from 'react'
import { MainWrapper } from '../../../components'
import { SelectVehicles } from '../../../components/appComponents/generalComponents'
import { VehicleLocation } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const SelectDriver = ({ navigation }) => {
    const { navigate } = navigation
    return (
        <MainWrapper>
            <VehicleLocation />
            <SelectVehicles onPressVevicle={(item) => navigate(SCREEN.driverDetail, { item: item })} />
        </MainWrapper>
    )
}

export default SelectDriver