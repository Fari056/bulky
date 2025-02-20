import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RegularText, RowWrapper, RowWrapperBasic, Spacer } from '../../../../../components'
import { Icons } from '../../../../../assets'
import { Image } from '../../../../../core_ui'
import { colors } from '../../../../../constants'
import { Icon } from 'react-native-elements';
import { appStyles } from '../../../../../utilities'

export const ItemCard = ({ title, onPress }) => {
    const icon = Icons[title]
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={.7}
            style={styles.card}>
            <RowWrapper style={styles.row}>
                <RowWrapperBasic>
                    <Image style={{ height: 24, width: 24 }} src={icon} />
                    <Spacer isBasic horizontal />
                    <RegularText color={colors.appTextColor2}>{title}</RegularText>
                </RowWrapperBasic>
                <Icon name='chevron-right' type='feather' size={24} />
            </RowWrapper>
        </TouchableOpacity>
    )
}
export default ItemCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.appBgColor1,
        borderRadius: 8,
        ...appStyles.shadow,
        paddingVertical: 12,
        marginHorizontal: '5%'
    },
    row: {
        marginStart: 16,
        marginEnd: 10
    },
})