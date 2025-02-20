import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { height, totalSize, width } from 'react-native-dimension';
import { ButtonColored, ButtonWithIcon, Icons, MediumText, MediumTitle, PrimaryImage, RegularText, RowWrapper, RowWrapperBasic, SmallTitle, Spacer, Spacers, Texts, Wrapper, Wrappers } from '..';
import { colors, fontFamily } from '../../constants';
import { CancelDeliveryReasond, CancelDeliveryReasonsFromDriver, PaymentMethods } from '../../../tempData';
import { Icon } from 'react-native-elements';
import moment from 'moment';


export const BottomSheet = ({ navigation, innerRef, heights, onCameraPress, onGalleryPress, onClosePress }) => {
    const RBSheet1 = useRef();

    return (
        <RBSheet
            ref={innerRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={heights}
            customStyles={{

                draggableIcon: {
                    backgroundColor: colors.appButton1
                },
                container: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: totalSize(2.5),
                    borderTopRightRadius: totalSize(2.5),
                }
            }}
        >
            <View style={{ marginHorizontal: width(5), }}>
                <Wrapper style={{ alignItems: 'flex-end', }}>
                    <ButtonWithIcon
                        iconName={'close'}
                        iconType={'antdesign'}
                        iconColor={colors.appBgColor1}
                        buttonColor={colors.appButton1}
                        buttonStyle={{ height: height(4), width: height(4), borderRadius: height(2) }}
                        iconSize={totalSize(2.4)}
                        onPress={onClosePress}
                    />
                </Wrapper>
                <Spacer isBasic />
                <RowWrapperBasic>
                    <Wrapper style={{ marginRight: width(4) }}>
                        <ButtonWithIcon
                            iconName={'camera'}
                            iconType={'feather'}
                            iconColor={colors.appIcon5}
                            buttonColor={colors.appButton1}
                            buttonStyle={{ height: height(5), width: height(5), borderRadius: height(2.5) }}
                            iconSize={totalSize(2.1)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <TouchableOpacity onPress={onCameraPress}>
                            <MediumText style={{ color: colors.darkBlue }}>Open Camera</MediumText>
                        </TouchableOpacity>
                    </Wrapper>
                </RowWrapperBasic>
                <Spacer isBasic />
                <RowWrapperBasic>
                    <Wrapper style={{ marginRight: width(4) }}>
                        <ButtonWithIcon
                            iconName={'photo'}
                            iconType={'font-awesome'}
                            iconColor={colors.appIcon5}
                            buttonColor={colors.appButton1}
                            buttonStyle={{ height: height(5), width: height(5), borderRadius: height(2.5) }}
                            iconSize={totalSize(2.1)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <TouchableOpacity onPress={onGalleryPress}>
                            <MediumText style={{ color: colors.darkBlue }}>Select from gallery</MediumText>
                        </TouchableOpacity>
                    </Wrapper>
                </RowWrapperBasic>
                <Spacer isBasic />
            </View>
        </RBSheet >
    )
}

export const PaymentBottomSheet = ({ innerRef, heights, onPressCard }) => {
    return (
        <RBSheet
            ref={innerRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={heights}
            customStyles={{

                draggableIcon: {
                    display: 'none',
                    backgroundColor: colors.appButton1
                },
                container: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: totalSize(3.5),
                    borderTopRightRadius: totalSize(3.5),
                }
            }}
        >
            <Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
                <SmallTitle style={styles.title}>Select Payment Method</SmallTitle>
                <Spacer isSmall />
                <RegularText style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia.</RegularText>
                <Spacer isBasic />
                <FlatList
                    data={PaymentMethods}
                    ItemSeparatorComponent={() => <Spacer height={height(1.5)} />}
                    ListHeaderComponent={() => <Spacer isSmall />}
                    ListFooterComponent={() => <Spacer height={height(7)} />}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.9} style={styles.paymentWrapper} onPress={() => onPressCard(item)}>
                                <RowWrapper style={{ marginHorizontal: 0 }}>
                                    <RowWrapperBasic>
                                        <PrimaryImage source={item?.source} size={totalSize(3)} />
                                        <RegularText style={styles.paymentTitle}>{item?.title}</RegularText>
                                    </RowWrapperBasic>
                                    <Icon name='chevron-right' type='entypo' size={18} />
                                </RowWrapper>
                            </TouchableOpacity>
                        )
                    }} />
            </Wrapper>
        </RBSheet >
    )
}
//REASONS OF CANCEL DELIVERY LIST
export const CancelRequestBottomSheet = ({
  innerRef,
  heights,
  onPressKeepDelivery,
  onPressReason,
  driverCancellation,
}) => {
  const CancelDeliveryReasons = driverCancellation
    ? CancelDeliveryReasonsFromDriver
    : CancelDeliveryReasond;

  return (
    <RBSheet
      ref={innerRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={heights}
      customStyles={{
        draggableIcon: {
          display: "none",
          backgroundColor: colors.appButton1,
        },
        container: {
          backgroundColor: "#fff",
          borderTopLeftRadius: totalSize(3.5),
          borderTopRightRadius: totalSize(3.5),
        },
      }}
    >
      <Wrapper>
        <Wrapper style={{ backgroundColor: colors.appBgColor11, padding: 15 }}>
          <SmallTitle style={styles.cancelText}>Cancel Delivery</SmallTitle>
        </Wrapper>
        <Spacer isBasic />
        <FlatList
          data={CancelDeliveryReasons}
          ItemSeparatorComponent={() => <Spacer height={height(1.5)} />}
          ListHeaderComponent={() => <Spacer isSmall />}
          ListFooterComponent={() => <Spacer height={height(3)} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressReason(item.title)}
              style={styles.reasonWrapper}
            >
              <RegularText style={styles.reasonText}>{item?.title}</RegularText>
            </TouchableOpacity>
          )}
        />
        <ButtonColored
          style={{ marginHorizontal: width(5) }}
          text="KEEP MY DELIVERY"
          onPress={onPressKeepDelivery}
        />
      </Wrapper>
    </RBSheet>
  );
};
// export const CancelRequestBottomSheet = ({ innerRef, heights, onPressKeepDelivery, onPressReason, driverCancellation }) => {
//     return (
//         <RBSheet
//             ref={innerRef}
//             closeOnDragDown={true}
//             closeOnPressMask={true}
//             height={heights}
//             customStyles={{
//                 draggableIcon: {
//                     display: 'none',
//                     backgroundColor: colors.appButton1
//                 },
//                 container: {
//                     backgroundColor: '#fff',
//                     borderTopLeftRadius: totalSize(3.5),
//                     borderTopRightRadius: totalSize(3.5),
//                 }
//             }}
//         >
//             <Wrapper>
//                 <Wrapper style={{ backgroundColor: colors.appBgColor11, padding: 15 }}>
//                     <SmallTitle style={styles.cancelText}>Cancel Delivery</SmallTitle>
//                 </Wrapper>
//                 <Spacer isBasic />
//                 <FlatList
//                     data={driverCancellation ? CancelDeliveryReasonsFromDriver : CancelDeliveryReasond}
//                     ItemSeparatorComponent={() => <Spacer height={height(1.5)} />}
//                     ListHeaderComponent={() => <Spacer isSmall />}
//                     ListFooterComponent={() => <Spacer height={height(3)} />}
//                     keyExtractor={item => item.id}
//                     renderItem={({ item }) => {
//                         return (
//                             <TouchableOpacity activeOpacity={0.8} onPress={onPressReason} style={styles.reasonWrapper}>
//                                 <RegularText style={styles.reasonText}>{item?.title}</RegularText>
//                             </TouchableOpacity>
//                         )
//                     }} />
//                 <ButtonColored style={{ marginHorizontal: width(5) }} text='KEEP MY DELIVERY' onPress={onPressKeepDelivery} />
//             </Wrapper>
//         </RBSheet >
//     )
// }
//SELECT DATE AND TIME ON ADD LOCATION (SLIENT SIDE)
export const SelectDateTimeBottomSheet1 = ({ innerRef, heights, onPressKeepDelivery, onPressReason, driverCancellation }) => {

    const [selectedDate, setSelectedDate] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const today = new Date();
        const todayDate = today.getDate();
        // const todayMonth = today.toLocaleString('default', { month: 'long' });

        const tomorrow = new Date();
        tomorrow.setDate(todayDate + 1);
        const tomorrowDate = tomorrow.getDate();
        // const tomorrowMonth = tomorrow.toLocaleString('default', { month: 'long' });

        const remainingDates = Array.from({ length: 5 }, (_, index) => {
            const date = new Date();
            date.setDate(tomorrowDate + index + 1);
            return date;
        });

        const formattedDates = [
            'Today',
            'Tomorrow',
            ...remainingDates.map(date => {
                const formattedDate = date.toLocaleDateString('default', { weekday: 'short', day: 'numeric', month: 'long' });
                return formattedDate;
            })
        ];

        setDates(formattedDates);
    }, []);

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollOffset(offsetY);
    };

    const handleScrollEndDrag = () => {
        const selectedIndex = Math.round(scrollOffset / 50);
        setSelectedDate(selectedIndex);
    };

    const renderDateItem = (date, index) => {
        const isSelected = index === selectedDate;
        const backgroundColor = isSelected ? colors.appBgColor18 : 'transparent';
        const textColor = colors.appTextColor2;

        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(index)}
                style={{
                    backgroundColor,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                }}
            >
                <RegularText style={{ color: textColor }}>{date}</RegularText>
            </TouchableOpacity>
        );
    };
    return (
        <RBSheet
            ref={innerRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={heights}
            customStyles={{
                draggableIcon: {
                    display: 'none',
                    backgroundColor: colors.appButton1
                },
                container: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: totalSize(3.5),
                    borderTopRightRadius: totalSize(3.5),
                }
            }}
        >
            <Wrapper style={{ flex: 1 }}>
                <RowWrapperBasic style={styles.dateTitleWrapper}>
                    <Icon style={styles.backIcon} name='chevron-back-outline' type='ionicon' size={18} color={colors.appIcon4} />
                    <RegularText style={styles.titleText}>Select the date</RegularText>
                </RowWrapperBasic>
                <Spacer isBasic />
                <ScrollView
                    onScroll={handleScroll}
                    onScrollEndDrag={handleScrollEndDrag}
                    style={{ flex: 1 }}
                >
                    {dates.map((date, index) => {
                        return renderDateItem(date, index);
                    })}
                </ScrollView>
                <ButtonColored style={{ marginHorizontal: width(5) }} text='NEXT' onPress={onPressKeepDelivery} />
                <Spacer isSmall />
            </Wrapper>
        </RBSheet >
    )
}

export const SelectDateTimeBottomSheet = ({ innerRef, heights, onPressDateTime }) => {
    const [selectedDate, setSelectedDate] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [showTimes, setShowTimes] = useState(false);
    const [selectedTime, setSelectedTime] = useState(0);
    const visibleTimes = 2;

    useEffect(() => {
        const today = new Date();
        const todayDate = today.getDate();
        const tomorrow = new Date();
        tomorrow.setDate(todayDate + 1);

        const remainingDates = Array.from({ length: 5 }, (_, index) => {
            const date = new Date();
            date.setDate(tomorrow.getDate() + index + 1);
            return date;
        });
        const formattedDates = [
            'Today',
            'Tomorrow',
            ...remainingDates.map(date => {
                return date.toLocaleDateString('default', { weekday: 'short', day: 'numeric', month: 'long' });
            })
        ];
        setDates(formattedDates);
    }, []);

    useEffect(() => {
        if (showTimes) {
            const startTime = 4;
            const endTime = 6;
            const generatedTimes = [];
            for (let hour = startTime; hour <= endTime; hour++) {
                generatedTimes.push(`${hour}:00`);
                generatedTimes.push(`${hour}:30`);
            }
            setTimes(generatedTimes);
        } else {
            setTimes([]);
        }
    }, [showTimes]);

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollOffset(offsetY);
    };

    const handleScrollEndDrag = () => {
        const selectedIndex = Math.round(scrollOffset / 50);
        setSelectedDate(selectedIndex);
    };

    const renderDateItem = (date, index) => {
        const isSelected = index === selectedDate;
        const backgroundColor = isSelected ? colors.appBgColor18 : 'transparent';
        const textColor = colors.appTextColor2;

        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    setSelectedDate(index);
                    setShowTimes(false);
                }}
                style={{
                    backgroundColor,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                }}
            >
                <RegularText style={{ color: textColor }}>{date}</RegularText>
            </TouchableOpacity>
        );
    };

    const onPressNext = () => {
        if (!showTimes) {
            setShowTimes(true);
        } else {
            onPressDateTime()
        }
    };

    const renderTimeItem = (time, index) => {
        const isSelected = index === selectedTime;
        const backgroundColor = isSelected ? colors.appBgColor18 : 'transparent';
        const textColor = colors.appTextColor2;

        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    setSelectedTime(index);
                }}
                style={{
                    backgroundColor,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                }}
            >
                <RegularText style={{ color: textColor }}>{time}</RegularText>
            </TouchableOpacity>
        );
    };

    return (
        <RBSheet
            ref={innerRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={heights}
            customStyles={{
                draggableIcon: {
                    display: 'none',
                    backgroundColor: colors.appButton1
                },
                container: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: totalSize(3.5),
                    borderTopRightRadius: totalSize(3.5),
                }
            }}
        >
            <Wrapper style={{ flex: 1 }}>
                <RowWrapperBasic style={styles.dateTitleWrapper}>
                    {showTimes ? (
                        <TouchableOpacity onPress={() => setShowTimes(false)}>
                            <Icon style={styles.backIcon} name='chevron-back-outline' type='ionicon' size={18} color={colors.appIcon4} />
                        </TouchableOpacity>
                    ) : null}
                    <RegularText style={styles.titleText}>
                        {showTimes ? 'Select the time' : 'Select the date'}
                    </RegularText>
                </RowWrapperBasic>
                <Spacer isBasic />

                <ScrollView
                    onScroll={handleScroll}
                    onScrollEndDrag={handleScrollEndDrag}
                    style={{ flex: 1 }}
                >
                    {dates.map((date, index) => renderDateItem(date, index))}
                </ScrollView>
                {showTimes && (
                    <ScrollView>
                        <Wrapper>
                            {times.slice(visibleTimes).map((time, index) => renderTimeItem(time, index + visibleTimes))}
                        </Wrapper>
                    </ScrollView>
                )}
                <ButtonColored
                    style={{ marginHorizontal: width(5) }}
                    text={'NEXT'}
                    onPress={onPressNext}
                />
                <Spacer isSmall />
            </Wrapper>
        </RBSheet>
    );
};


const styles = StyleSheet.create({
    paymentWrapper: {
        backgroundColor: colors.appBgColor1,
        padding: 10,
        borderRadius: totalSize(2),
        elevation: 5,
        marginHorizontal: width(5)
    },
    paymentTitle: {
        marginLeft: width(2),
        color: colors.appTextColor2,
        fontSize: totalSize(1.6)
    },
    title: {
        color: colors.appTextColor2,
        alignSelf: 'center',
        fontFamily: fontFamily.appTextBold,
        fontSize: totalSize(2.3)
    },
    description: {
        color: colors.appTextColor17,
        alignSelf: 'center',
        textAlign: 'center'
    },
    //REASONS OF CANCEL DELIVERY LIST
    reasonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.appBgColor16,
        borderRadius: totalSize(2),
        padding: 10,
        marginHorizontal: width(5)
    },
    reasonText: {
        color: colors.appTextColor2,
        fontSize: totalSize(1.6)
    },
    cancelText: {
        alignSelf: 'center',
        color: colors.appTextColor2,
        fontSize: totalSize(1.9),
    },


    dateTitleWrapper: {
        backgroundColor: colors.appBgColor19,
        padding: totalSize(1.7),
        marginHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backIcon: {
        alignSelf: 'flex-start',
        marginRight: 5
    },
    titleText: {
        flex: 1,
        textAlign: 'center',
        color: colors.appTextColor2,
        fontSize: totalSize(1.7)
    }


})