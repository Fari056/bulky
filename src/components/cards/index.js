import React, { useState } from 'react'
import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native'
import {
  Avatar,
  ButtonBorderd,
  ButtonColored,
  CardWrapper,
  Hrline,
  SmallTitle, IconWithText,
  LargeText,
  MediumText,
  PrimaryImage,
  RadioButton,
  RegularTextBlack,
  RegularText,
  RoundImage,
  RowWrapper,
  RowWrapperBasic,
  Spacer,
  TinyTitle,
  Wrapper,
} from "..";
import { Icon } from 'react-native-elements';
import { styles } from './styles';
import { Images } from '../../utilities';
import { totalSize, width } from 'react-native-dimension'
import { colors } from '../../constants';
import { Icons } from '../../assets';
import { useSelector } from 'react-redux';
import moment from 'moment';
const formatAddressText = (text, wordLimitPerLine = 3) => {
  const words = text.split(" ");
  let formattedText = "";
  for (let i = 0; i < words.length; i++) {
    if (i > 0 && i % wordLimitPerLine === 0) {
      formattedText += "\n";
    }
    formattedText += words[i] + " ";
  }
  return formattedText.trim();
};
export const RequestCard = ({
  name = '',
  photo = '',
  price,
  onPressCard,
  onPressIgnore,
  onPressAccept,
  onPressPhone,
  onPressChat,
  date,
  time,
  weight = "45kg",
  pickupAddress,
  destinationAddress,
}) => {

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPressCard}>
      <CardWrapper style={styles.cardWrapper}>
        <Spacer isSmall />
        <RowWrapper style={{ marginHorizontal: width(2) }}>
          <RowWrapperBasic>
            <Avatar source={{ uri: photo || '' }} />
            <RegularText style={styles.userName}>{name}</RegularText>
          </RowWrapperBasic>
          <RowWrapperBasic>
            <PrimaryImage size={totalSize(3)} source={Images.cash} />
            <MediumText style={styles.userName}>{`$${price}`}</MediumText>
          </RowWrapperBasic>
        </RowWrapper>
        <Spacer isBasic />
        <Hrline style={styles.line} />
        <Spacer isBasic />
        <RowWrapper style={{ alignItems: "flex-start" }}>
          <Wrapper>
            <IconWithText
              iconSize={20}
              style={{ width: width(60) }}
              textstyle={{ width: width(55) }}
              color={colors.appTextColor2}
              iconName={"dot-fill"}
              iconType={"octicon"}
              iconColor={colors.appIcon12}
              text={pickupAddress}
            />
            <Wrapper style={styles.vl} />
            <IconWithText
              style={{ width: width(60) }}
              textstyle={{ width: width(55) }}
              iconSize={20}
              color={colors.appTextColor2}
              iconName={"map-marker"}
              iconType={"material-community"}
              iconColor={colors.appIcon11}
              text={destinationAddress}
            />
          </Wrapper>
          <PrimaryImage source={Icons.Helper} size={totalSize(5)} />
        </RowWrapper>
        <Spacer isBasic />
        <RowWrapperBasic>
          <IconWithText
            style={{ marginHorizontal: width(2) }}
            textstyle={{ color: colors.appTextColor13 }}
            text={date}
            iconName={"calendar-month-outline"}
            iconType={"material-community"}
            iconColor={colors.appIcon8}
          />
          <IconWithText
            style={{ marginLeft: 15 }}
            textstyle={{ color: colors.appTextColor14 }}
            text={time}
            iconName={"clockcircleo"}
            iconType={"antdesign"}
            iconColor={colors.appIcon9}
            iconSize={17}
          />
          <IconWithText
            style={{ marginLeft: 15 }}
            textstyle={{ color: colors.appTextColor14 }}
            text={weight}
            iconName={"weight-kilogram"}
            iconType={"material-community"}
            iconColor={colors.appIcon9}
            iconSize={17}
          />
        </RowWrapperBasic>
        <Spacer isBasic />
        <RowWrapperBasic>
          <ButtonBorderd
            style={[styles.button]}
            text="IGNORE"
            onPress={onPressIgnore}
          />
          <ButtonColored
            style={[
              styles.button,
              { borderBottomRightRadius: 10, borderBottomLeftRadius: 0 },
            ]}
            text="ACCEPT"
            onPress={onPressAccept}
          />
        </RowWrapperBasic>
      </CardWrapper>
    </TouchableOpacity>
  );
};
const splitText = (text, charLimit) => {
  let result = [];
  let currentLine = "";

  for (let i = 0; i < text?.length; i++) {
    if (text[i] === "{" && text?.slice(i, i + 9) === "{iconName") {
      while (text[i] !== "}" && i < text?.length) {
        i++;
      }
      continue;
    }
    if (currentLine?.length + 1 > charLimit) {
      result?.push(currentLine?.trim());
      currentLine = "";
    }
    currentLine += text[i];
  }

  if (currentLine) {
    result?.push(currentLine?.trim());
  }

  return result;
};


export const BookingCard = ({ name, profileImage, booking, lineStyle, onPressCard, onPressPhone, onPressChat }) => {
  const account_redux = useSelector(state => state?.account_type)
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPressCard}>
      <CardWrapper style={styles.bookingCardWrapper}>
        <Spacer isSmall />
        <RowWrapper style={{ marginHorizontal: width(2) }}>
          <RowWrapperBasic>
            <Avatar source={{ uri: profileImage }} />
            <RegularText style={styles.userName}>{name}</RegularText>
          </RowWrapperBasic>
          <RowWrapperBasic>
            <PrimaryImage size={totalSize(3)} source={Images.cash} />
            <MediumText
              style={styles.userName}
            >{`$${booking?.deliverydetails?.totalcharges ?? booking?.deliverydetails?.totalCharges}`}</MediumText>
          </RowWrapperBasic>
        </RowWrapper>
        <Spacer isBasic />
        <Hrline style={[styles.line, lineStyle]} />
        <Spacer isBasic />
        <RowWrapper style={{ alignItems: "flex-start" }}>
          <Wrapper>
            <IconWithText
              onPress={onPressCard}
              iconSize={20}
              style={{ width: width(60), }}
              textstyle={{ width: width(50) }}
              color={colors.appTextColor2}
              iconName={"dot-fill"}
              iconType={"octicon"}
              iconColor={colors.appIcon12}
              text={booking?.pickupdetails?.pickupaddress}
            />
            <Wrapper style={styles.vl} />
            <IconWithText
              onPress={onPressCard}
              style={{ width: width(60), }}
              textstyle={{ width: width(50) }}
              iconSize={20}
              color={colors.appTextColor2}
              iconName={"map-marker"}
              iconType={"material-community"}
              iconColor={colors.appIcon12}
              text={booking?.destinationdetails?.destination}
            />
          </Wrapper>
          <RowWrapperBasic>
            {account_redux == "driver" ? (
              <TouchableOpacity activeOpacity={0.8} onPress={onPressPhone}>
                <PrimaryImage
                  source={Icons.helperGroup}
                  size={totalSize(2.7)}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity activeOpacity={0.8} onPress={onPressChat}>
              <Icon
                style={{ marginHorizontal: 15 }}
                name="chatbubbles-outline"
                type="ionicon"
                color={colors.appIcon10}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressPhone}>
              <Icon
                name="phone"
                type="simple-line-icon"
                color={colors.appIcon10}
                size={20}
              />
            </TouchableOpacity>
          </RowWrapperBasic>
        </RowWrapper>
        <Spacer isBasic />
        <RowWrapper style={{ marginHorizontal: width(10) }}>
          <Wrapper style={styles.dateWrapper}>
            <IconWithText
              style={{}}
              textstyle={{ color: colors.appTextColor13 }}
              text={moment(booking?.date?.seconds * 1000)?.format('DD MMM YYYY')}
              iconName={"calendar-month-outline"}
              iconType={"material-community"}
              iconColor={colors.appIcon8}
            />
          </Wrapper>
          <Wrapper
            style={[
              styles.dateWrapper,
              { backgroundColor: colors.appBgColor16 },
            ]}
          >
            <IconWithText
              textstyle={{ color: colors.appTextColor14 }}
              text={moment(booking?.time?.seconds * 1000)?.format('hh:mm A')}
              iconName={"clockcircleo"}
              iconType={"antdesign"}
              iconColor={colors.appIcon9}
              iconSize={17}
            />
          </Wrapper>
        </RowWrapper>
        <Spacer isBasic />
      </CardWrapper>
    </TouchableOpacity>
  );
}

// request  
export const BookingRequestCard = ({ item, onPress }) => {
  const itemDetails = item.itemdetails || [];
  const pickupChunks = item?.pickupdetails?.pickupaddress;
  const destinationChunks = item?.destinationdetails?.destination;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <CardWrapper style={styles.bookingCardWrapper}>
        <Spacer isSmall />
        <MediumText style={styles.userName}>Delivery item</MediumText>
        <Spacer isSmall />
        {itemDetails.map((detail, index) => (
          <RowWrapper key={index} style={{ marginHorizontal: 8 }}>
            <RowWrapperBasic>
              {detail.images?.map((image, imgIndex) => (
                <Image
                  key={imgIndex}
                  source={{ uri: image }}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 8,
                    borderRadius: 20,
                  }}
                />
              ))}
              <MediumText style={styles.userName}>{detail?.title}</MediumText>
            </RowWrapperBasic>
            <Spacer isSmall />
          </RowWrapper>
        ))}
        <RegularTextBlack style={styles.userName}>
          {item.description}
        </RegularTextBlack>
        <Spacer isSmall />
        <MediumText style={styles.userName}>Location</MediumText>
        <RowWrapper style={{ alignItems: "flex-start" }}>
          <Wrapper>
            <IconWithText
              onPress={onPress}
              iconSize={20}
              style={{ width: width(75), }}
              textstyle={{ width: width(70) }}
              color={colors.appTextColor2}
              iconName={"dot-fill"}
              iconType={"octicon"}
              iconColor={colors.appIcon12}
              text={pickupChunks}
            />
            <Wrapper style={styles.vl} />
            <IconWithText
              onPress={onPress}
              iconSize={20}
              style={{ width: width(75) }}
              textstyle={{ width: width(70) }}
              color={colors.appTextColor2}
              iconName={"map-marker"}
              iconType={"material-community"}
              iconColor={colors.appIcon12}
              text={destinationChunks}
            />
            {/* ))} */}
          </Wrapper>
        </RowWrapper>
        <Spacer isSmall />
        <MediumText style={styles.userName}>Pickup Date & Time</MediumText>
        <Spacer isBasic />
        <RowWrapper style={{ marginHorizontal: width(10) }}>
          <Wrapper style={styles.dateWrapper}>
            <IconWithText
              onPress={onPress}
              textstyle={{ color: colors.appTextColor13 }}
              text={moment(item.date?.seconds * 1000)?.format('DD MMM YYYY')}
              iconName={"calendar-month-outline"}
              iconType={"material-community"}
              iconColor={colors.appIcon8}
            />
          </Wrapper>
          <Spacer isSmall />
          <Spacer isSmall />
          <Wrapper
            style={[
              styles.dateWrapper,
              { backgroundColor: colors.appBgColor16 },
            ]}
          >
            <IconWithText
              onPress={onPress}
              textstyle={{ color: colors.appTextColor14 }}
              text={moment(item.time?.seconds * 1000)?.format('hh:mm A')}
              iconName={"clockcircleo"}
              iconType={"antdesign"}
              iconColor={colors.appIcon9}
              iconSize={17}
            />
          </Wrapper>
          <Spacer isSmall />
        </RowWrapper>
        <Spacer isSmall />
      </CardWrapper>
      <Spacer isSmall />
    </TouchableOpacity>
  );
};


// Details
export const BookingDetailCard = ({ item, onPressChat, onPresscall, user }) => {
  const itemDetails = item?.items || [];
  const countImages = itemDetails.reduce((total, detail) => {
    return total + (detail.images ? detail.images.length : 0);
  }, 0);
  return (
    <ScrollView style={styles.scrollView}>
      <Spacer isSmall />
      <RowWrapper style={{ marginHorizontal: width(1) }}>
        <RowWrapperBasic>
          <Avatar source={{ uri: user?.photo }} />
          <RegularText style={styles.userName}>
            {`${user?.firstName}`}
          </RegularText>
          <PrimaryImage size={totalSize(3)} source={Images.cash} />
          <MediumText style={styles.userName}>
            ${item.deliverydetails.totalCharges}
          </MediumText>
        </RowWrapperBasic>
        <RowWrapperBasic>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressChat}>
            <Icon
              style={{ marginHorizontal: 15 }}
              name="chatbubbles-outline"
              type="ionicon"
              color={colors.appIcon10}
              size={20}
            />
          </TouchableOpacity>
          <View></View>
          <TouchableOpacity activeOpacity={0.8} onPress={onPresscall}>
            <Icon
              name="phone"
              type="simple-line-icon"
              color={colors.appIcon10}
              size={20}
            />
          </TouchableOpacity>
        </RowWrapperBasic>
      </RowWrapper>
      <Spacer isBasic />
      <RowWrapper style={{ marginHorizontal: width(10) }}>
        <Wrapper style={styles.dateWrapper}>
          <IconWithText
            textstyle={{ color: colors.appTextColor13 }}
            text={moment(item?.date?.seconds * 1000)?.format('DD MMM YYYY')}
            iconName={"calendar-month-outline"}
            iconType={"material-community"}
            iconColor={colors.appIcon8}
          />
        </Wrapper>
        <Spacer isSmall />
        <Wrapper
          style={[styles.dateWrapper, { backgroundColor: colors.appBgColor16 }]}
        >
          <IconWithText
            textstyle={{ color: colors.appTextColor14 }}
            text={moment(item?.time?.seconds * 1000)?.format('hh:mm A')}
            iconName={"clockcircleo"}
            iconType={"antdesign"}
            iconColor={colors.appIcon9}
            iconSize={17}
          />
        </Wrapper>
        <Spacer isSmall />
      </RowWrapper>

      <Spacer isBasic />
      <View style={styles.locationCardd}>
        <LargeText>Shipping Address</LargeText>
        <Spacer isBasic />
        <View style={styles.locationRowd}>
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"radio-btn-active"}
            iconType={"fontisto"}
            iconColor={colors.appIcon12}
            text={`Pickup Location\n${item.pickupdetails.pickupaddress}`}
            textstyle={styles.longText}
          />
          <MediumText style={styles.stairsTextd}>
            {item.pickupdetails.floors} Stairs
          </MediumText>
        </View>
        <Wrapper style={styles.vl} />
        <View style={styles.locationRowd}>
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"map-marker"}
            iconType={"material-community"}
            iconColor={colors.appIcon12}
            textstyle={styles.longText}
            text={`Pickup Location\n${item.destinationdetails.destination}`}
          />
          <MediumText style={styles.stairsTextd}>
            {item.destinationdetails.floors} Stairs
          </MediumText>
        </View>
      </View>
      <LargeText>Items For Delivery</LargeText>
      <Spacer isSmall />
      <View style={styles.itemCardd}>
        <View style={styles.itemRowd}>
          <RowWrapper style={{ marginHorizontal: width(2) }}>
            <RowWrapperBasic>
              {item?.items.map((detail, index) => (
                <RowWrapper key={index} style={{ marginHorizontal: 8 }}>
                  <RowWrapperBasic>
                    {detail?.images && detail?.images?.map((image, imgIndex) => (
                      <Image
                        key={imgIndex}
                        source={{ uri: image }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                        }}
                      />
                    ))}
                    <MediumText style={styles.userName}>
                      {detail?.type},
                    </MediumText>
                  </RowWrapperBasic>
                  <Spacer isSmall />
                </RowWrapper>
              ))}
            </RowWrapperBasic>
            <Spacer isSmall />
          </RowWrapper>
          <RowWrapperBasic>
            <PrimaryImage
              size={totalSize(3)}
              source={Images.img}
              styles={{ height: 20, width: 20 }}
            />
            <MediumText style={styles.userName}>{countImages}</MediumText>
          </RowWrapperBasic>
        </View>
        <RegularText style={styles.itemDescriptiond}>
          Full size, include mattress, include box spring
        </RegularText>
      </View>
      <LargeText>Required Helper</LargeText>
      <Spacer isSmall />
      <View style={styles.helperCardd}>
        <RowWrapperBasic>
          <PrimaryImage size={totalSize(3)} source={Images.userGroup} />
          <MediumText style={styles.userName}>
            {item.deliverydetails.numHelpers} Helper
          </MediumText>
        </RowWrapperBasic>
        <RegularText style={styles.helperDescriptiond}>
          Lorem ipsum dolor sit amet, adipiscing
        </RegularText>
      </View>
      <LargeText>Weight</LargeText>
      <View style={styles.weightCardd}>
        <RowWrapperBasic>
          <PrimaryImage size={totalSize(3)} source={Images.kg} />
          <MediumText style={styles.userName}>{item.items.reduce((total, detail) => total + detail.weight, 0)} lb</MediumText>
        </RowWrapperBasic>
      </View>
    </ScrollView>
  );
};


//HISTORY CARD
export const HistoryCard = ({ name, photo, price, pickupAddress, destination, status }) => {
  return (
    <CardWrapper style={styles.bookingCardWrapper}>
      <Spacer isSmall />
      <RowWrapper style={{ marginHorizontal: width(2) }}>
        <RowWrapperBasic>
          <Avatar source={{ uri: photo }} />
          <RegularText style={styles.userName}>{name}</RegularText>
        </RowWrapperBasic>
        <RowWrapperBasic>
          <PrimaryImage size={totalSize(3)} source={Images.cash} />
          <MediumText style={styles.userName}>{`$${price}`}</MediumText>
        </RowWrapperBasic>
      </RowWrapper>
      <Spacer isSmall />
      <Hrline style={styles.line} />
      <Spacer isBasic />
      <RowWrapper style={{ alignItems: "flex-start" }}>
        <Wrapper>
          <IconWithText
            iconSize={20}
            style={{ width: width(80) }}
            textstyle={{ width: width(70) }}
            color={colors.appTextColor2}
            iconName={"dot-fill"}
            iconType={"octicon"}
            iconColor={colors.appIcon12}
            text={pickupAddress}
          />
          <Wrapper style={styles.vl} />
          <IconWithText
            iconSize={20}
            style={{ width: width(80) }}
            textstyle={{ width: width(70) }}
            color={colors.appTextColor2}
            iconName={"map-marker"}
            iconType={"material-community"}
            iconColor={colors.appIcon11}
            text={destination}
          />
        </Wrapper>
      </RowWrapper>
      <Spacer isBasic />
      <Hrline style={styles.line} />
      <Spacer isSmall />
      <Spacer isTiny />
      <RegularText style={styles.historyStatus} color={colors.appTextColor22}>
        {status}
      </RegularText>
      <Spacer isTiny />
      <Spacer isSmall />
    </CardWrapper>
  );
};

export const DriverOrderHistoryCard = ({ name, photo, price, pickup, des, status }) => {
  const pickup_ = formatAddressText(pickup);
  const des_ = formatAddressText(des);
  return (
    <CardWrapper style={styles.bookingCardWrapper}>
      <Spacer isSmall />
      <RowWrapper style={{ marginHorizontal: width(2) }}>
        <RowWrapperBasic>
          <Avatar source={{ uri: photo }} />
          <RegularText style={styles.userName}>{name}</RegularText>
        </RowWrapperBasic>
        <RowWrapperBasic>
          <PrimaryImage size={totalSize(3)} source={Images.cash} />
          <MediumText style={styles.userName}>{`$${price}`}</MediumText>
        </RowWrapperBasic>
      </RowWrapper>
      <Spacer isSmall />
      <Hrline style={styles.line} />
      <Spacer isSmall />
      <RowWrapper style={{ alignItems: "flex-start" }}>
        <Wrapper>
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"dot-fill"}
            iconType={"octicon"}
            iconColor={colors.appIcon12}
            text={pickup_}
          />
          <Wrapper style={styles.vl} />
          <IconWithText
            iconSize={20}
            color={colors.appTextColor2}
            iconName={"map-marker"}
            iconType={"material-community"}
            iconColor={colors.appIcon11}
            text={des_}
          />
        </Wrapper>
      </RowWrapper>
      <Spacer isSmall />
      <Hrline style={styles.line} />
      <Spacer isSmall />
      <RowWrapper>
        <RowWrapperBasic>
          <RegularText
            style={styles.historyStatus}
            color={colors.appTextColor2}
          >
            Drive Rating:{" "}
            <RegularText color={colors.appTextColor27}>4.3 </RegularText>
          </RegularText>
          <Icon
            name="star"
            color={colors.appTextColor27}
            type="antdesign"
            size={16}
          />
        </RowWrapperBasic>
        <RegularText style={styles.historyStatus} color={colors.appTextColor22}>
          {status}
        </RegularText>
      </RowWrapper>
      <Spacer isSmall />
    </CardWrapper>
  );
};
// CHAT CARD
export const ChatUserCard = ({ name, time, message, source, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ marginHorizontal: width(5) }}>
      <Wrapper style={styles.container}>
        <RowWrapperBasic >
          <RoundImage size={totalSize(6)} source={source} />
          <Wrapper style={{ flex: 1, }}>
            <RowWrapper>
              <MediumText>{name}</MediumText>
              <TinyTitle style={{ fontSize: totalSize(1.2), color: colors.appTextColor21 }}>{time}</TinyTitle>
            </RowWrapper>
            <Spacer isTiny />
            <RowWrapper >
              <RegularText style={styles.message}>{message}</RegularText>
            </RowWrapper>
          </Wrapper>
        </RowWrapperBasic>
      </Wrapper>
    </TouchableOpacity>
  )
}
//REWARD CARD

export const RewardCard = ({ price, onPress, active }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.rewardOuterWrapper} onPress={onPress}>
      <RadioButton active={active} style={styles.radioBtn} titleStyle={styles.radioTitle} title={price} onPress={onPress} />
    </TouchableOpacity>
  )
}

