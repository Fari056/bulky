import React from 'react'
import { Image, StatusBar, StyleSheet, Linking, TouchableOpacity, View } from 'react-native';
import { Images, SideBar } from '../../assets'
import { appStyles } from '../../utilities'
import { useNavigation } from '@react-navigation/native';
import { MediumText, MediumTitle, RegularText, SmallTitle, TinyTitle } from '../text';
import { ComponentWrapper, RowWrapper, RowWrapperBasic, Wrapper } from '../wrappers';
import { height, width, totalSize } from 'react-native-dimension'
import { SCREEN, colors } from '../../constants';
import { Icon } from 'react-native-elements';
import { Avatar, ButtonWithIcon, RoundImage } from '..';
import { useSelector } from 'react-redux';

export const HomeHeader = ({ title = 'Bulky', uri = Images.user2, onPressProfile, onPressMenu }) => {
  const user_redux = useSelector(state => state?.user)
  return (
    <Wrapper style={styles.home_header}>
      <RowWrapper>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressMenu}>
          <SideBar />
        </TouchableOpacity>
        <TinyTitle>{title}</TinyTitle>
        <TouchableOpacity
          onPress={onPressProfile}
          activeOpacity={.8}>
          <Avatar source={{ uri: user_redux?.photo ?? uri }} />
        </TouchableOpacity>
      </RowWrapper>
    </Wrapper>
  )
}
export const MainHeader = ({
  title,
  style,
  right,
  onPressRight,
  rightIcon,
}) => {
  const navigation = useNavigation();
  return (
    <Wrapper style={[styles.main_view, style]}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="chevron-back-outline"
          type="ionicon"
          size={22}
          color={colors.appIcon4}
        />
      </TouchableOpacity>
      <View style={styles.nameContainer}>
        <TinyTitle style={styles.pageName}>{title}</TinyTitle>
      </View>
      <Wrapper style={{ flex: 1 }} />
      {right || rightIcon ? (
        <TouchableOpacity style={styles.right} onPress={onPressRight}>
          {rightIcon ?? (
            <RegularText
              style={styles.rightText}
              numberOfLines={1}
            >
              {right}
            </RegularText>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.right} />
      )}
    </Wrapper>
  );
};
export const MainHeaderRight = ({
  title,
  style,
  right,
  onPressRight,
  rightIcon,
  rightTextStyle,
}) => {
  const navigation = useNavigation();
  return (
    <Wrapper style={[styles.main_view, style]}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="chevron-back-outline"
          type="ionicon"
          size={22}
          color={colors.appIcon4}
        />
      </TouchableOpacity>
      <View style={styles.nameContainer}>
        <TinyTitle style={styles.pageName}>{title}</TinyTitle>
      </View>
      {right || rightIcon ? (
        <TouchableOpacity style={styles.right} onPress={onPressRight}>
          {rightIcon ?? (
            <RegularText
              style={[styles.rightText, rightTextStyle]}
              numberOfLines={1}
            >
              {right}
            </RegularText>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.right} />
      )}
    </Wrapper>
  );
};
export const DriverChatHeader = ({ phoneNumber, userName , photo }) => {
  const navigation = useNavigation();
  return (
    <Wrapper style={styles.driverChatHeaderWrapper}>
      <RowWrapper>
        <RowWrapperBasic>
          <Icon onPress={() => navigation.goBack()} name='chevron-back-outline' type='ionicon' size={22} color={colors.appIcon4} />
          <RoundImage styles={{ marginLeft: 10 }} source={{ uri: photo }} size={totalSize(4)} />
          <MediumText style={{ marginLeft: 10 }}>{userName}</MediumText>
        </RowWrapperBasic>
        <ButtonWithIcon onPress={() => Linking.openURL(`tel:${phoneNumber}`)} buttonStyle={[styles.iconButtons, { backgroundColor: colors.appIcon12 }]} iconName={'phone'} iconType={'material-community'} iconColor={colors.appIcon5} iconSize={totalSize(3)} />
      </RowWrapper>
    </Wrapper>
  );
};
export const CameraHeader = () => {
  return (
    <ComponentWrapper>
      <StatusBar backgroundColor={colors.appBgColor1} barStyle={'dark-content'} />
      <MainHeader title={'Delivery Picture'} />
    </ComponentWrapper>
  )
}

export const styles = StyleSheet.create({
  main_view: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    // height: height(7),
  },
  backIcon: {
    marginRight: 10,
    flex: 1,
    alignItems: "flex-start",
  },
  nameContainer: {
    flex: 8,
    justifyContent: "center",
    alignSelf: "center",
  },

  pageName: {
    color: colors.appTextColor5,
    fontSize: totalSize(2.2),
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  home_header: {
    paddingVertical: 8,
    elevation: 15,
    // borderWidth: 1
  },
  right: {
    paddingLeft: 10,
  },
  rightText: {
    color: "#0109C8",
    fontSize: 16,
  },
  iconButtons: {
    height: height(4.8),
    width: height(4.8),
    borderRadius: height(2.4),
    backgroundColor: colors.appButton4,
  },
  driverChatHeaderWrapper: {
    marginVertical: height(2),
  },
});