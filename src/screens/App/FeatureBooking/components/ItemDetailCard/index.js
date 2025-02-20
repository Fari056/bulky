import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { LargeText, MediumText, RadioButton, RowWrapper, RowWrapperBasic, Spacer } from '../../../../../components'
import { colors } from '../../../../../constants'

export const ItemDetailCard = ({ title, active, onPress, onAdd, onSub, count }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={.7}
            style={styles.card}>
            <RowWrapper style={styles.row}>
                <RadioButton onPress={onPress} active={active} title={title} />
                {active &&
                    <RowWrapperBasic>
                        <TouchableOpacity
                            onPress={onSub}
                            style={styles.btn}>
                            <LargeText>-</LargeText>
                        </TouchableOpacity>
                        <MediumText>{count}</MediumText>
                        <TouchableOpacity
                            onPress={onAdd}
                            style={styles.btn}>
                            <LargeText>+</LargeText>
                        </TouchableOpacity>
                    </RowWrapperBasic>}
            </RowWrapper>
           
        </TouchableOpacity>
         
    )
}
export default ItemDetailCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.appBgColor1,
        borderRadius: 8,
        borderWidth: 1, borderColor: colors.appBorder13,
        paddingVertical: 10,
        marginHorizontal: '5%'
    },
    row: {
        marginStart: 16,
        marginEnd: 10
    },
    btn: {
        height: 24, width: 24,
        backgroundColor: '#F9FAFA',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    }
})