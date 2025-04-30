import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, totalSize, width } from 'react-native-dimension';
import { MainWrapper, PrimaryImage, RegularText, RowWrapper, RowWrapperBasic, SmallTitle, Spacer, Wrapper, } from '../../../components';
import { PaymentMethods } from '../../../../tempData';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { SCREEN, colors, fontFamily } from '../../../constants';
import { AbsoluteButton } from '../../../components/appComponents/staticComponents';
import { useNavigation } from '@react-navigation/native';

const SelectPaymentMethods = ({ navigation, route }) => {
    const { navigate, goBack } = navigation
    const { wallet } = route?.params ?? false
    const { firstName,
        lastName,
        location,
        phone: phoneNumber,
        isActive, photo } = route?.params;


    return (
        <MainWrapper>
            <Spacer isBasic />
            <RowWrapper>
                <Icon onPress={() => goBack()} name='chevron-left' type='entypo' size={18} />
                <RegularText onPress={() => navigate(SCREEN.completeDriverProfile, {
                    firstName,
                    lastName,
                    location,
                    phone: phoneNumber,
                    isActive: true,
                    photo
                })} color={colors.appTextColor2}>Skip</RegularText>
            </RowWrapper>
            <Spacer isBasic />
            <SmallTitle style={styles.title}>Connect Account</SmallTitle>
            <Spacer isSmall />
            <RegularText style={styles.description}>Aliquam ultricies fermentum elit, blandit pellent esque lectus vestibulum ac.</RegularText>
            <Spacer isBasic />
            <FlatList
                data={PaymentMethods}
                ItemSeparatorComponent={() => <Spacer height={height(1.5)} />}
                ListHeaderComponent={() => <Spacer isSmall />}
                ListFooterComponent={() => <Spacer height={height(7)} />}
                keyExtractor={item => item.id}
                removeClippedSubviews={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.9} style={styles.paymentWrapper} >
                            <RowWrapper style={{ marginHorizontal: 0 }}>
                                <RowWrapperBasic>
                                    <PrimaryImage source={item?.source} size={totalSize(2.5)} />
                                    <RegularText style={styles.paymentTitle}>{item?.title}</RegularText>
                                </RowWrapperBasic>
                            </RowWrapper>
                        </TouchableOpacity>
                    )
                }} />
            <AbsoluteButton title={'NEXT'}
                onPress={() => {
                    navigate(SCREEN.completeDriverProfile, {
                        firstName,
                        lastName,
                        location,
                        phone: phoneNumber,
                        isActive: true,
                        photo
                    });
                }}
            //  onPress={() => navigate(SCREEN?.appStack, { screen: SCREEN.addNewCard, params: { wallet: wallet } })}
            />
        </MainWrapper>
    )
}

export default SelectPaymentMethods

const styles = StyleSheet.create({
    paymentWrapper: {
        backgroundColor: colors.appBgColor1,
        padding: 10,
        borderRadius: totalSize(2),
        // elevation: 5,
        marginHorizontal: width(5),
        borderWidth: 1,
        borderColor: colors.appBorder12
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
})