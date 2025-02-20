import { StyleSheet } from "react-native";
import { totalSize, width, height } from "react-native-dimension";
import { colors, fontFamily } from "../../../constants";

export const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    zIndex: 1,
    width: width(80),
    marginLeft: width(5),
  },
  textInput: {
    color: "#1A1A1A",
    fontSize: totalSize(1.5),
    backgroundColor: "#C9C9C933",
    height: height(5),
    fontFamily: fontFamily.appTextLight,
  },
  // splash screen
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slogan: {
    width: width(60),
    height: height(6),
    marginTop: -height(2),
  },

  // ONBOARDING INDICATORS
  skipText: {
    position: "absolute",
    top: height(3),
    right: width(5),
    color: colors.appTextColor3,
  },
  // ABSOLUTE BUTTON
  absoluteButton: {
    bottom: height(4),
    left: width(5),
    right: width(5),
  },
  absoluteButtonBordered: {
    bottom: height(12),
    left: width(5),
    right: width(5),
  },
  // TITLE WITH DISCRIPTION
  title: {
    color: colors.appTextColor2,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: width(5),
  },
  description: {
    color: colors.appTextColor5,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: width(5),
    lineHeight: 18,
  },
  //ROW SIGNIN TEXT
  signInText: {
    color: colors.appTextColor6,
    alignSelf: "center",
  },
  // SOCIAL ICONS WRAPPER
  continueText: {
    alignSelf: "center",
    color: colors.appTextColor8,
    fontSize: totalSize(1.65),
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: colors.appBorder4,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: height(5.5),
    width: width(20),
    borderRadius: totalSize(3),
  },
  // PROFILE WITH CAMERA ICON
  container: {
    borderRadius: 5,
    height: totalSize(12),
    width: totalSize(12),
    borderRadius: totalSize(6),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  profile: {
    alignSelf: "center",
    marginTop: height(2),
  },
  editIcon: {
    marginTop: -height(3),
    left: width(7),
    height: height(3.5),
    width: height(3.5),
    borderRadius: totalSize(1.75),
    backgroundColor: colors.appBgColor8,
  },
  // OTP CODE INPUT
  cell: {
    width: width(12),
    height: height(6),
    lineHeight: height(6.5),
    borderWidth: 1,
    borderRadius: totalSize(1.2),
    borderColor: colors.appBorder5,
    textAlign: "center",
  },
  focusCell: {
    borderColor: colors.appBorder1,
  },
  time: {
    alignSelf: "center",
  },
  sendAgain: {
    alignSelf: "center",
    color: colors.appTextColor11,
  },
  // DRIVER PROFILE WITH DESCRIPTION
  driverDesc: {
    alignSelf: "center",
    fontFamily: fontFamily.appTextBold,
  },
  //CUSTOM DROP DOWN
  dropDown: {
    borderWidth: 1,
    height: height(5),
    borderRadius: 10,
    borderColor: colors.appBorder2,
    backgroundColor: colors.appBgColor2,
  },
  rowDropDown: {
    borderWidth: 1,
    height: height(6),
    width: width(43),
    borderRadius: 10,
    borderColor: colors.appBorder2,
    backgroundColor: colors.appBgColor2,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.appBorder2,
    backgroundColor: colors.appBgColor2,
  },
  mainDropDown: {
    marginVertical: height(1.3),
    // position: "relative",s
    zIndex: -1,
  },
  // IMAGE PICKER
  imagePickerBtn: {
    width: width(17),
    height: height(9),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.appBgColor9,
    borderRadius: 10,
    marginRight: 10,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedImg: {
    width: width(17),
    height: height(9),
    marginRight: 10,
    borderRadius: 10,
  },
  // DRIVER PROFILE COMPLETED
  congratulationWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  congratDescription: {
    color: colors.appTextColor2,
    width: width(70),
    // textAlign: 'center'
  },
  congratTitle: {
    fontSize: totalSize(2.6),
  },
  //SETTING LIST DESCRIPTION AND DELETE ACCOUNT
  DeleteAccount: {
    color: colors.appTextColor10,
    textAlign: "justify",
    marginTop: height(3.5),
    lineHeight: 15,
  },
  DeleteAccountTitle: {
    color: colors.appTextColor15,
    fontSize: totalSize(1.8),
    marginLeft: width(2),
  },
  //NOTIFICATION SETTING WRAPPER
  notificationTitle: {
    color: colors.appTextColor2,
    fontSize: totalSize(1.6),
  },
  //FEEDBACK SCREEN
  feedBack: {
    color: colors.appTextColor2,
    textAlign: "justify",
    lineHeight: 18,
    fontSize: totalSize(1.5),
  },
  //FEEDBACK SCREEN
  input: {
    height: height(18),
    textAlignVertical: "top",
  },
  inputContainer: {
    height: height(18),
  },
  DeleteAccountDesc: {
    marginVertical: height(1.8),
    textAlign: "justify",
    lineHeight: 18,
    color: colors.appTextColor2,
    fontSize: totalSize(1.5),
  },
  deleteAccountInfo: {
    textAlign: "justify",
    lineHeight: 18,
    color: colors.appTextColor11,
  },
  // ENTER PICKUP LOCATION

  vl: {
    height: height(2),
    borderLeftWidth: 1,
    borderStartColor: "#C8C7CC",
    borderStyle: "dashed",
    marginStart: 9.5,
  },
  inputBorder: {
    width: width(80),
    marginLeft: width(5),
  },
  receipentBtnTxt: {
    fontSize: totalSize(1.5),
    fontFamily: fontFamily.appTextRegular,
  },
  receipentBtn: {
    height: height(5),
    width: width(25),
    marginLeft: width(4),
  },
  fileName: {
    color: colors.appTextColor5,
    marginLeft: width(2),
  },
  //CURRENT LOCATION AND SAVE DLOCATION ON ENTER PICKUP LOCATION
  iconButton: {
    height: height(5),
    width: height(5),
    borderRadius: height(2.5),
    backgroundColor: colors.appBgColor10,
  },
  locationTitle: {
    fontSize: totalSize(1.5),
  },
  locationDesc: {
    color: colors.appTextColor17,
    fontSize: totalSize(1.4),
  },
  locationLine: {
    backgroundColor: colors.appBorder7,
    width: width(100),
    alignSelf: "center",
    marginVertical: height(1.5),
  },
  mapLocationText: {
    color: colors.appTextColor1,
    fontSize: totalSize(1.6),
  },
  //DRIVER WRAPPER ONSELECT DRIVER SCREEN
  contactPreviewWrapper: {
    backgroundColor: colors.appBgColor14,
    padding: 5,
  },
  ratingUserName: {
    color: colors.appTextColor2,
    fontSize: totalSize(1.7),
  },
  ratingText: {
    color: colors.appTextColor20,
    fontSize: totalSize(1.7),
  },
  iconButtons: {
    height: height(4.8),
    width: height(4.8),
    borderRadius: height(2.4),
    backgroundColor: colors.appButton4,
  },
  spacerLine: {
    backgroundColor: colors.appBorder7,
    width: width(90),
    alignSelf: "center",
  },
  //HelperGroups

  userGroup: {
    flexDirection: "row",
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: -6,
  },
  ratingUserName: {
    marginLeft: 10,
  },
  //DELIVERY INFO

  deliveryInfoTitle: {
    color: colors.appTextColor20,
  },
  deliveryInfoDesc: {
    fontFamily: fontFamily.appTextBold,
  },
  deliveryInfoWrapper: {
    marginHorizontal: width(10),
    marginVertical: height(1),
  },
  // SHOW ANIMATION LINES AFTER PAYMENT FOR CONNECTING DRIVER
  container1: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginVertical: height(2),
  },
  row1: {
    flexDirection: "row",
    height: 3,
  },
  //MANAGE DELIVERY AND CANCEL REQUEST ON DRIVER DETAIL AFTER PAYMENT DONE
  helpText: {
    color: colors.appTextColor2,
    fontSize: totalSize(1.6),
  },
  cancelText: {
    color: colors.appTextColor24,
    fontSize: totalSize(1.5),
  },
  absoluteCancel: {
    bottom: height(13),
    alignSelf: "center",
  },
  componentText: {
    marginHorizontal: width(5),
  },
  //COLLAPSABLE WRAPPER FOR SHOW AND HIDE VEHICLE DETAIL
  vehicleDetail: {
    color: colors.appTextColor2,
    fontSize: totalSize(1.6),
  },
  vehicleDetailSpacer: {
    color: colors.appTextColor2,
    fontSize: totalSize(1.6),
    marginHorizontal: width(5),
  },
  statusText: {
    color: colors.appTextColor2,
    fontSize: totalSize(1.7),
    width: width(70),
    lineHeight: 18,
  },
  showNextStatusText: {
    color: colors.appTextColor3,
    fontSize: totalSize(1.7),
    lineHeight: 18,
    alignSelf: "center",
  },
  trackDeliveryWrapper: {
    paddingVertical: height(1),
    borderTopLeftRadius: totalSize(3),
    borderTopRightRadius: totalSize(3),
  },
  showNextTrackDeliveryWrapper: {
    padding: height(1),
    backgroundColor: colors.appBgColor4,
    borderTopLeftRadius: totalSize(3),
    borderTopRightRadius: totalSize(3),
  },
  deliveryTime: {
    fontSize: totalSize(1.7),
  },
  cancenRequest: {
    color: colors.appTextColor24,
    alignSelf: "center",
  },
  trackingInfoWrapper: {
    borderTopLeftRadius: totalSize(2),
    borderTopRightRadius: totalSize(2),
  },
  //ADD REVIEW SCREEN
  rateToRiderWrapper: {
    alignItems: "center",
  },
  reviewInputContainer: {
    height: height(14),
    width: width(90),
  },
  ////////////////////DRIVER SIDE/////////////////

  deliveryInfoDate: {
    marginHorizontal: width(2),
    backgroundColor: colors.appBgColor15,
    padding: 5,
    borderRadius: totalSize(1),
    width: width(35),
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryInfoTime: {
    marginLeft: 15,
    backgroundColor: colors.appBgColor16,
    padding: 8,
    borderRadius: totalSize(1),
    width: width(35),
    justifyContent: "center",
    alignItems: "center",
  },
  noteText: {
    fontSize: totalSize(1.4),
  },
  noteDescription: {
    textTransform: "uppercase",
    color: colors.appTextColor2,
    fontSize: totalSize(1.4),
    lineHeight: 17,
  },
  //WALLET

  //ShippingAddress
  destinationWrapper: {
    marginVertical: height(1),
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: colors.appBorder11,
    borderRadius: totalSize(1),
    padding: totalSize(1.3),
    marginHorizontal: width(5),
  },
  pickup: {
    color: colors.appTextColor2,
  },
  pickupLocation: {
    color: colors.appTextColor30,
    fontFamily: fontFamily.appTextLight,
  },
  stairs: {
    // flex: 1,
    // textAlign: 'right',
    alignSelf: "flex-end",
    marginBottom: height(7.5),
    flex: 1,
    textAlign: "right",
  },
  dropoutStairs: {
    marginTop: -height(3),
    alignSelf: "flex-end",
  },
  rowWrapper: {
    marginHorizontal: 0,
    width: width(85),
    borderWidth: 1,
  },
  locationWrapper: {
    marginTop: -height(7),
  },
});
