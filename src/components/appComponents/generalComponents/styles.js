import { StyleSheet } from 'react-native'
import { totalSize, width, height } from 'react-native-dimension'
import { colors, fontFamily } from '../../../constants'

export const styles = StyleSheet.create({
  textContainer: {
    // paddingRight: 40,
    width: width(78),
  },
  optionsContainer_: {
    flexDirection: "column",
  },
  checkboxContainer: {

  },
  optionRow_: {
    flexDirection: "row",
    alignItems: "center",
  },

  // onboarding flatlist render
  gradientWrapper: {
    flex: 1,
    width: width(100),
  },
  skipText: {
    position: "absolute",
    top: height(3),
    right: width(5),
    color: colors.appTextColor3,
  },
  title: {
    color: colors.appTextColor3,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: width(5),
    position: "absolute",
    bottom: height(27),
  },
  description: {
    color: colors.appTextColor4,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: width(5),
    lineHeight: 18,
    position: "absolute",
    bottom: height(19),
  },
  // FLATLIST FOR ACCOUNT TYPES
  accountTypeContainer: {
    padding: totalSize(1.5),
    marginHorizontal: width(5),
    borderRadius: totalSize(0.8),
  },
  rowWrapper: {
    justifyContent: "space-between",
    // marginTop: -height(2.5)
  },
  radioButton: {
    marginBottom: 16,
    // position: 'absolute',
    // backgroundColor: 'red'
    // bottom: 0, right: 0
  },

  accountDescription: {
    color: colors.appTextColor5,
    width: width(65),
    lineHeight: 15,
  },
  //DRIVER HOME SCREEN (REQUEST NEAR YOU)

  //SETTINGS LIST FOR CLIENT

  settingTitle: {
    color: colors.appTextColor2,
    fontSize: totalSize(1.8),
    marginLeft: width(2),
  },
  categoryContainer: {
    paddingVertical: 8,
  },
  categoryTitle: {
    fontSize: totalSize(1.8),
    marginVertical: height(1.3),
  },
  notificationItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: colors.appBorder6,
  },
  //VEHICLES LIST ON SELECT DRIVER SCREEN

  selectVehicleText: {
    color: colors.appTextColor18,
    alignSelf: "center",
    fontSize: totalSize(1.6),
    marginVertical: height(1.8),
  },
  vehicleBgWrapper: {
    backgroundColor: colors.appBgColor11,
    marginHorizontal: width(5),
    borderRadius: totalSize(1.2),
  },
  vehiclePrice: {
    color: colors.appTextColor16,
    fontSize: totalSize(1.7),
  },
  vehicleUser: {
    color: colors.appTextColor16,
    fontSize: totalSize(2),
  },
  vehiclePickupTime: {
    color: colors.appTextColor18,
  },
  //ADD CARD DETAIL
  paymentTitle: {
    alignSelf: "center",
    color: colors.appTextColor2,
  },
  paymentInput: {
    backgroundColor: colors.appBgColor1,
  },
  inputTitle: {
    color: colors.appTextColor23,
  },
  comment: {
    color: colors.appTextColor21,
    marginLeft: width(5),
    fontSize: totalSize(1.5),
  },
  reviewTime: {
    color: colors.appTextColor21,
    fontSize: totalSize(1.3),
  },
  reviewSepratorLine: {
    backgroundColor: colors.appBorder10,
    marginVertical: height(1),
    width: width(90),
    alignSelf: "center",
  },
  emptyBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});