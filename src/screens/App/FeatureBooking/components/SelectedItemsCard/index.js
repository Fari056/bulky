import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { MediumText, RegularText, RowWrapper, RowWrapperBasic, SmallText, Spacer, Wrapper } from '../../../../../components'
import { Icons } from '../../../../../assets'
import { Image } from '../../../../../core_ui'
import { colors, fontFamily, fontSize } from '../../../../../constants'
import { Icon } from 'react-native-elements';

export const SelectedItemCard = ({ title, onPress, item, onPressDelete, onPressEdit }) => {
    const icon = Icons[title]
    return (
      <Wrapper style={styles.card}>
        <RowWrapper style={styles.row}>
          <RowWrapperBasic>
            <Image style={{ height: 24, width: 24 }} src={icon} />
            <Spacer isSmall horizontal />
            <MediumText color={colors.appTextColor2}>{title}</MediumText>
          </RowWrapperBasic>
          <RowWrapperBasic>
            <TouchableOpacity onPress={onPressEdit}>
              <Icon
                name="edit"
                type="material"
                color={colors.appButton1}
                size={20}
              />
            </TouchableOpacity>
            <Spacer isSmall horizontal />
            <TouchableOpacity onPress={onPressDelete}>
              <Icon
                name="trash-2"
                type="feather"
                size={20}
                color={colors.appButton3}
              />
            </TouchableOpacity>
          </RowWrapperBasic>
        </RowWrapper>
        <Spacer isSmall />
        <RegularText style={styles.text}>
          {item?.selectedItem?.title} size, quantity ({" "}
          {item?.selectedItem?.count} )
          {/* Full size, include a mattress, include a box spring */}
        </RegularText>
      </Wrapper>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.appBgColor1,
        borderRadius: 8,
        borderWidth: 1, borderColor: colors.appBorder13,
        paddingVertical: 15,
        marginHorizontal: '5%'
    },
    row: {
        marginStart: 12,
        marginEnd: 10
    },
    text: {
        color: colors.appTextColor2,
        width: '70%',
        marginStart: 12,
        fontFamily: fontFamily.appTextLight
    }
})