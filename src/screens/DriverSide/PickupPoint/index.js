import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonColored, CancelDeliveryModal, CancelRequestBottomSheet, HomeHeader, MainWrapper, PaymentConfirmationModal, ScrollView, Spacer } from '../../../components'
import { AbsoluteButton, HelperGroups, PickupPointInfo, VehicleLocation } from '../../../components/appComponents/staticComponents'
import { height,width } from 'react-native-dimension'
import { SCREEN } from '../../../constants'
import { takePhotoFromCamera } from '../../../utilities'
import { useSelector } from 'react-redux'
const PickupPoint = ({ navigation, route }) => {
  const { bookingDetails = {}, payment } = route.params;
  const { navigate, replace } = navigation;
  const [startDelivery, setStartDelivery] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [endDelivery, setEndDelivery] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const CancelSheet = useRef();
  const user_redux = useSelector((state) => state?.user);
   const userName = `${bookingDetails.user?.firstName || ""} ${
     bookingDetails.user?.lastName || ""
   }`;
   const userPhoto = bookingDetails.user?.photo || "";
   const phoneNumber = bookingDetails.user?.phone || "";
   const totalCharges = bookingDetails.deliverydetails?.totalcharges || 0;
   const deliveryTime = bookingDetails.time
     ? new Date(bookingDetails.time.seconds * 1000).toLocaleTimeString([], {
         hour: "2-digit",
         minute: "2-digit",
         hour12: true,
       })
     : "N/A";
  //IF START DELIVERY IS TRUE, SHOW CANCEL DELIVERY BUTTON. AND AFTER 2 SEC, SHOW END DELIVERY BUTTON
  useEffect(() => {
    let timeout;
    if (startDelivery) {
      timeout = setTimeout(() => {
        setEndDelivery(true);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [startDelivery]);

  // GO TO WALLET SCREEN AFTER 2 SEC WHEN PAYMENT IS DONE.
  useEffect(() => {
    if (paymentModal) {
      setTimeout(() => {
        setPaymentModal(!paymentModal);
        navigate(SCREEN.driverWallet);
      }, 2000);
    }
  }, [paymentModal]);

  const onPressStartDelivery = () => {
    setStartDelivery(true);
    setEndDelivery(false);
  };
  //WHEN PRESS ON END DELIVERY BUTTON, OPEN CAMERA AND SHOW PAYMENT MODAL
  const onPressEndDelivery = async () => {
    let img = await takePhotoFromCamera();
    setPaymentModal(!paymentModal);
  };

  return (
    <MainWrapper>
      <HomeHeader
        title="Bulky"
        onPressMenu={() => navigate(SCREEN.driverSetting)}
        onPressProfile={() => navigate(SCREEN.driverProfile)}
      />
      <ScrollView>
        <VehicleLocation hideBackBtn mapStyle={{ height: height(52) }} />
        <PickupPointInfo
          onPressChat={() =>
            navigate(SCREEN.Chat, { receiver_id: user_redux.id })
          }
          startDelivery={startDelivery}
          cancelTitle={startDelivery && !endDelivery && "CANCEL DELIVERY"}
          onPressCancel={() => CancelSheet?.current?.open()}
          name={userName}
          photo={userPhoto}
          price={totalCharges}
          time={deliveryTime}
          phoneNumber={phoneNumber}
        />
        {!startDelivery && !endDelivery && (
          <ButtonColored
            style={{ marginHorizontal: width(5) }}
            text="START DELIVERY"
            onPress={onPressStartDelivery}
          />
        )}
        {endDelivery && (
          <AbsoluteButton title="END DELIVERY" onPress={onPressEndDelivery} />
        )}

        <CancelRequestBottomSheet
          driverCancellation={true}
          innerRef={CancelSheet}
          heights={height(55)}
          onPressReason={() => setCancelModal(true)}
          onPressKeepDelivery={() => CancelSheet?.current?.close()}
        />

        <CancelDeliveryModal
          isVisible={cancelModal}
          onPressClose={() => setCancelModal(!cancelModal)}
          onPressCancelDelivery={() => navigate(SCREEN.driverDeliveryCanceled)}
          // onPressCancelDelivery={() => replace(SCREEN.driverStack)}
          onPressKeepDelivery={() => {
            setCancelModal(!cancelModal), CancelSheet?.current?.close();
          }}
        />
        <PaymentConfirmationModal isVisible={paymentModal} />
        <Spacer isDoubleBase />
      </ScrollView>
    </MainWrapper>
  );
}

export default PickupPoint