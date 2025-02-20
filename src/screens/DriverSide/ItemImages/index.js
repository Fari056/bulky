import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper, PrimaryImage, Spacer } from '../../../components'
import ItemForDelivery from '../RequestDetail/ItemForDelivery'
import { SCREEN } from '../../../constants'
import { Images } from '../../../utilities'
import { height, width, totalSize } from 'react-native-dimension'
import ImagesList from './ImagesList'
import { AbsoluteButton } from '../../../components/appComponents/staticComponents'

const ItemImages = ({ navigation }) => {
    const { navigate, goBack } = navigation

    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={'Request Details'} />
            </ComponentWrapper>
            <Spacer isBasic />
            <ItemForDelivery hideTitle />
            <ImagesList onPressImg={()=>navigate(SCREEN.driverImagePreview)}/>
            <AbsoluteButton title={'Back'} onPress={() => goBack()} />
        </MainWrapper>
    )
}

export default ItemImages