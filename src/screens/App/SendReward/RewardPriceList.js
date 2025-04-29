import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ComponentWrapper, RewardCard, Spacer } from '../../../components'
import { RewardPrices } from '../../../../tempData'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../../constants'

const RewardPriceList = () => {
    const [active, setActive] = useState(null)
    const navigation = useNavigation()
    return (
        <ComponentWrapper>
            <Spacer isBasic />
            <FlatList
                data={RewardPrices}
                renderItem={({ item }) => {
                    const isActive = item?.id == active
                    return (
                        <RewardCard price={item?.tip == 'Other' ? item?.tip : `$${item?.tip}`} active={isActive} onPress={() => item?.tip == 'Other' ? navigation?.navigate(SCREEN.sendSpecificAmountReward) : setActive(item?.id)} />
                    )
                }}
                ItemSeparatorComponent={() => <Spacer isBasic />}
                ListHeaderComponent={() => <Spacer isBasic />}
                removeClippedSubviews={false}
            />
        </ComponentWrapper>
    )
}

export default RewardPriceList

const styles = StyleSheet.create({})