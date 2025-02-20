import { Platform, StyleSheet } from "react-native";
import { totalSize, width, height } from "react-native-dimension";
import { colors, fontFamily } from "../../constants";

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  cardWrapper: {
    borderRadius: 10,
    marginHorizontal: width(5),
  },
  userName: {
    marginLeft: 10,
    fontSize: totalSize(1.8),
    color: "#333333",
  },
  h1: {
    marginLeft: 10,
    fontSize: totalSize(1.8),
    color: colors.appTextColor2,
    fontWeight: "bold",
  },
  line: {
    width: width(90),
    backgroundColor: colors.appBorder3,
    height: 0.8,
  },
  button: {
    height: height(6),
    width: width(45),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: totalSize(0),
  },
  vl: {
    height: 25,
    borderLeftWidth: 2,
    borderStartColor: "#C8C7CC",
    borderStyle: Platform.OS === "android" ? "dashed" : "solid",
    marginStart: 9.5,
  },

  bookingCardWrapper: {
    borderRadius: 10,
    margin: 4,
  },

  dateWrapper: {
    backgroundColor: colors.appBgColor15,
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: width(2.5),
    // height: height(4),
    justifyContent: "center",
    alignItems: "center",
  },
  //HISTORY CARD
  historyStatus: {
    alignSelf: "center",
    fontSize: totalSize(1.7),
  },
  // CHAT USER CARD
  container: {
    borderWidth: 1,
    borderColor: colors.appBgColor3,
    borderRadius: 10,
    padding: 10,
  },

  profileImg: {
    height: height(5),
    width: width(10),
  },
  message: {
    fontSize: totalSize(1.4),
    color: colors.appTextColor21,
  },
  //REWARD CARD
  rewardOuterWrapper: {
    borderWidth: 1,
    padding: totalSize(1.2),
    borderRadius: totalSize(1),
    borderColor: colors.appBorder5,
  },
  radioTitle: {
    fontSize: totalSize(1.6),
    fontFamily: fontFamily.appTextRegular,
  },
  radioBtn: {
    height: totalSize(2.4),
    width: totalSize(2.4),
    borderRadius: totalSize(1.2),
  },
  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
  },
  description: {
    marginLeft: 28,
    color: "#4B4B4B",
  },
  address: {
    marginLeft: 28,
    color: "#4B4B4B",
  },
  dateTimeBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  dateText: {
    marginLeft: 4,
    color: "green",
  },
  timeText: {
    marginLeft: 4,
    color: "blue",
  },
  bookingCardWrapperd: {
    padding: width(4),
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRowd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userRowd: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatard: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userNamed: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  infoRowd: {
    flexDirection: "row",
    alignItems: "center",
  },
  priced: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: colors.primary,
  },
  icond: {
    marginHorizontal: 5,
  },
  dateTimeRowd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dateWrapperd: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
    padding: 5,
    borderRadius: 5,
  },
  dateTextd: {
    color: colors.primary,
    marginLeft: 5,
  },
  timeWrapperd: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 5,
    borderRadius: 5,
  },
  timeTextd: {
    color: colors.primary,
    marginLeft: 5,
  },
  sectionTitled: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  locationCardd: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  locationRowd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stairsTextd: {
    fontSize: 11,
    color: colors.primary,
  },
  itemCardd: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemRowd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetailsd: {
    flex: 1,
    marginLeft: 10,
  },
  itemNamed: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  itemDescriptiond: {
    fontSize: 14,
    color: "#757575",
  },
  itemQuantityd: {
    fontSize: totalSize(1.9),
    fontWeight: "bold",
    color: colors.primary,
  },
  helperCardd: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  helperRowd: {
    flexDirection: "row",
    alignItems: "center",
  },
  helperDescriptiond: {
    fontSize: totalSize(1.9),
    color: "#757575",
    marginLeft: 10,
  },
  weightCardd: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cencel: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: totalSize(1.6),
    color: "red",
    top: "8%",
  },
  longText: {
    flexWrap: "wrap",
    width: "75%",
  },
});