import { View, Text } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper, PrimaryImage } from '../../../components'
import { Images } from '../../../utilities'
import { totalSize } from 'react-native-dimension'
import { ReceiptImg } from '../../../components/appComponents/staticComponents'
import { Icon } from 'react-native-elements'
import { colors } from '../../../constants'
const ViewReceipt = () => {
    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={'Receipt'} rightIcon={<Icon name='download' type='antdesign' size={22} color={colors.appIcon4} />} />
            </ComponentWrapper>
            <ReceiptImg />
        </MainWrapper>
    )
}

export default ViewReceipt