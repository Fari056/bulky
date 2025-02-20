import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { ComponentWrapper, Hrline, LargeText, LargeTitle, MediumText, RadioButton, RegularTextBlack, RowWrapperBasic, SelectableButtons, SmallTitle, Spacer, TextInputBordered, TinyTitle, Wrapper, XLTitle } from '../../../../../components'
import { colors } from '../../../../../constants'
import { Icons } from '../../../../../assets'
import { Icon } from 'react-native-elements';
import { width } from 'react-native-dimension'

export const LocationDetailCard = ({
  title,
  value,
  setActive,
  active,
  count,
  setCount,
  onEditPress,
}) => {
  return (
    <Wrapper>
      <Spacer isBasic />
      <Spacer isSmall />
      <TinyTitle color={colors.appTextColor2}>{title}</TinyTitle>
      <Wrapper style={styles.wrapper}>
        <TextInputBordered
          value={value}
          editable={false}
          right={
            <TouchableOpacity onPress={onEditPress}>
              <Icon name="edit-2" type="feather" color={colors.appIcon10} />
            </TouchableOpacity>
          }
          containerStyle={styles.textInputContainer}
        />
        <Hrline Width={width(90)} color={colors.appBorder5} />
        <Wrapper style={styles.elevatorWrapper}>
          <RegularTextBlack>Elevator</RegularTextBlack>
          <Spacer isBasic />
          <RowWrapperBasic>
            <RadioButton
              onPress={() => setActive(true)}
              title={"Yes"}
              active={active && active !== null}
            />
            <Spacer horizontal isDoubleBase />
            <RadioButton
              onPress={() => setActive(false)}
              title={"No"}
              active={!active && active !== null}
            />
          </RowWrapperBasic>
          {!active && active !== null && (
            <>
              <Spacer isSmall />
              <Spacer isBasic />
              <RowWrapperBasic style={styles.row}>
                <RegularTextBlack>How Many Floors</RegularTextBlack>
                <RowWrapperBasic>
                  <TouchableOpacity
                    onPress={() => count > 1 && setCount(count - 1)}
                    style={styles.btn}
                  >
                    <Icon
                      name="minus"
                      type="entypo"
                      color={colors.appIcon7}
                      size={18}
                    />
                  </TouchableOpacity>
                  <LargeText>{count}</LargeText>
                  <TouchableOpacity
                    onPress={() => count < 50 && setCount(count + 1)}
                    style={[styles.btn]}
                  >
                    <Icon
                      name="plus"
                      type="entypo"
                      color={colors.appIcon7}
                      size={18}
                    />
                  </TouchableOpacity>
                </RowWrapperBasic>
              </RowWrapperBasic>
            </>
          )}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default LocationDetailCard

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        // paddingStart: '5%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.appBorder5,
        paddingBottom: 10

    },
    textInputContainer: {
        borderWidth: 0,
        backgroundColor: '#fff',
    },
    elevatorWrapper: {
        paddingVertical: '5%',
        paddingHorizontal: '2%'
    },
    row: {
        justifyContent: 'space-between'
    },
    btn: {
        height: 24,
        width: 24,
        backgroundColor: '#F9FAFA',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    }
})