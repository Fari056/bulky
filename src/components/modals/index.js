import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import { ButtonBorderd, ButtonColored, IconWithText, MediumText, PrimaryImage, RegularText, RowWrapper, RowWrapperBasic, Spacer, TextInputBordered, Wrapper } from '..';
import { colors, fontFamily } from '../../constants';
import { Images } from '../../utilities';

export const CancelDeliveryModal = ({ isVisible, toggleModal, swipeDisabled, onPressCancelDelivery, onPressKeepDelivery, onPressClose }) => {
    return (
        <Modal
            animationType="slide"
            isVisible={isVisible}
            swipeDirection={swipeDisabled ? null : 'down'}
            onSwipeComplete={toggleModal}
            style={styles.modal}
            onBackdropPress={toggleModal}
            backdropOpacity={0.3}
        >
            <View style={styles.modalContent}>
                <RowWrapper>
                    <MediumText style={{}}>Cancel Delivery</MediumText>
                    <Icon name='close' color={colors.appIcon18} size={18} onPress={onPressClose} />
                </RowWrapper>
                <Spacer isBasic />

                <RegularText style={styles.description}>
                    Are you sure you want to cancel this Delivery? This action cannot be undone.
                </RegularText>
                <Spacer isBasic />
                <ButtonColored style={styles.coloredBtn} text='CANCEL DELIVERY' onPress={onPressCancelDelivery} />
                <Spacer isBasic />
                <ButtonBorderd style={styles.borderBtn} textColor={colors.appTextColor2} text='KEEP MY DELIVERY' onPress={onPressKeepDelivery} />
            </View>
        </Modal>
    );
};

export const PaymentConfirmationModal = ({ isVisible, toggleModal, swipeDisabled, price = '75.00' }) => {
    return (
        <Modal
            animationType="slide"
            isVisible={isVisible}
            swipeDirection={swipeDisabled ? null : 'down'}
            onSwipeComplete={toggleModal}
            style={styles.modal}
            onBackdropPress={toggleModal}
            backdropOpacity={0.6}
        >
            <Wrapper style={styles.paymentWrapper}>
                <PrimaryImage source={Images.profileCompleted} size={totalSize(8)} />
                <Spacer isBasic />
                <RowWrapperBasic>
                    <PrimaryImage source={Images.cash} size={totalSize(4)} />
                    <MediumText style={styles.paymentPrice}>{`$${price}`}</MediumText>
                </RowWrapperBasic>
                <Spacer isSmall />
                <MediumText>Payment Confirmation</MediumText>
                <Spacer isSmall />
                <RegularText style={styles.paymentDescription}>Payment added to your wallet lorem ipsum dolor sit amet, consectetur adipiscing elit.</RegularText>
            </Wrapper>
        </Modal>
    );
};
//ADD ACCOUNT FOR CASH WITHDRAW ON WALLET SCREEN
export const CashWithDrawModal = ({ isVisible, toggleModal, swipeDisabled, onPressConfirm, onPressCancel, goToNext }) => {
    return (
        <Modal
            animationType="slide"
            isVisible={isVisible}
            swipeDirection={swipeDisabled ? null : 'down'}
            onSwipeComplete={toggleModal}
            style={styles.modal}
            onBackdropPress={toggleModal}
            backdropOpacity={0.6}
        >
            <Wrapper style={styles.cashWithdrawWrapper}>
                <MediumText style={styles.addAccount}>{goToNext ? 'Cash Withdrawl' : 'Add Account'}</MediumText>
                <Spacer isTiny />
                <RegularText style={styles.cardDetail}>{goToNext ? 'Enter amount you want to withdrawal' : 'Update your card details'}</RegularText>
                <Spacer isBasic />
                {goToNext ? <TextInputBordered containerStyle={{ backgroundColor: colors.appBgColor1 }} titleStyle={styles.inputTitle} title={'Amount'} placeholder={'$340'} />
                    : (
                        <>
                            <TextInputBordered containerStyle={{ backgroundColor: colors.appBgColor1 }} titleStyle={styles.inputTitle} title={'Name on card'} placeholder={'Olivia Rhye'} />
                            <Spacer isSmall />
                            <TextInputBordered containerStyle={{ backgroundColor: colors.appBgColor1 }} titleStyle={styles.inputTitle} title={'Card number'} placeholder={'1234 123 1234'} />
                        </>
                    )}
                <Spacer isBasic />
                <ButtonColored text={goToNext ? 'Cash Withdrawal' : 'Confirm'} onPress={onPressConfirm} />
                <Spacer isBasic />
                <ButtonBorderd text={goToNext ? 'Change Bank Account' : 'Cancel'} onPress={onPressCancel} />
            </Wrapper>
        </Modal>
    );
};
const styles = StyleSheet.create({

    modal: {
        marginHorizontal: width(10),
        borderWidth: 0,
        // backgroundColor: colors.appBgColor1,
        // borderWidth: 2
    },
    modalContent: {
        backgroundColor: colors.appBgColor1,
        padding: 10,
        borderRadius: totalSize(2)
    },
    description: {
        marginHorizontal: width(2),
        textAlign: 'center', color: colors.appTextColor25
    },
    coloredBtn: {
        backgroundColor: colors.appBgColor17,
        marginHorizontal: width(5)

    },
    borderBtn: {
        borderWidth: 1,
        borderColor: colors.appBorder9,
        marginHorizontal: width(5)
    },
    //PAYMENT MODAL
    paymentWrapper: {
        backgroundColor: colors.appBgColor1,
        padding: totalSize(3),
        borderRadius: totalSize(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymentPrice: {
        color: colors.appTextColor26,
        marginLeft: width(2),
        fontSize: totalSize(2.2)
    },
    paymentDescription: {
        color: colors.appTextColor21,
        textAlign: 'center',
        lineHeight: 16
    },
    cashWithdrawWrapper: {
        backgroundColor: colors.appBgColor1,
        padding: totalSize(3),
        borderRadius: totalSize(2),
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    addAccount: {
        alignSelf: 'center',
        fontSize: totalSize(2)
    },
    cardDetail: {
        alignSelf: 'center',
        color: colors.appTextColor25
    },
    inputTitle: {
        fontFamily: fontFamily.appTextRegular,
        color: colors.appTextColor23
    },

})