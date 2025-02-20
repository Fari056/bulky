import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { CancelDeliveryModal, CancelRequestBottomSheet, HomeHeader, MainWrapper, PaymentBottomSheet, ScrollView } from '../../../components'
import { AbsoluteButton, DeliveryInfo, DestinationToPickupLocation, DriverContactPreview, DriverReviews, ManageDelivery, VehicleLocation } from '../../../components/appComponents/staticComponents'
import { width } from 'react-native-dimension'
import { height } from 'react-native-dimension'
import { SCREEN } from '../../../constants'
import Routes from '../../../routes'
const DriverDetail = ({ navigation, route }) => {
    const { navigate, replace } = navigation
    const { payment } = route?.params ?? ''
    const RBSheet1 = useRef();
    const CancelSheet = useRef()
    const [cancelModal, setCancelModal] = useState(false)
    return (
        <MainWrapper>
             <HomeHeader title='Bulky'
                onPressProfile={() => navigate(SCREEN.clientProfile)}
                onPressMenu={() => navigate(SCREEN.setting)} />
            <VehicleLocation  hideBackBtn/> 
            
            <DriverContactPreview onPressChat={() => navigate(SCREEN?.driverStack, { screen: SCREEN.driverChat })} />
            <DestinationToPickupLocation />
            <DeliveryInfo />
            {payment ?
                <>
                    <ManageDelivery onPressCancel={() => CancelSheet?.current?.open()} />
                    {/*SHOW REASONS OF CANCEL DELIVERY. WHEN PRESS ON ANY REASON, SHOW ALERT */}
                    <CancelRequestBottomSheet innerRef={CancelSheet} heights={height(55)} onPressReason={() => setCancelModal(true)} onPressKeepDelivery={() => CancelSheet?.current?.close()} />
                    {/*CANCEL DELIVERY ALERT. WHEN PRESS ON CANCEL GO TO HOME AND WHEN PRESS ON KEEP; HIDE BOTTOMSHEET AND MODAL */}
                    <CancelDeliveryModal isVisible={cancelModal} onPressClose={() => setCancelModal(!cancelModal)} onPressCancelDelivery={() => replace(SCREEN.appStack)} onPressKeepDelivery={() => { setCancelModal(!cancelModal), CancelSheet?.current?.close() }} />
                </>
                :
                <>
                    <ScrollView>
                        <DriverReviews />
                    </ScrollView>
                    <PaymentBottomSheet heights={height(48)} innerRef={RBSheet1} onPressCard={(item) => navigate(SCREEN.addNewCard, { item: item })} />
                </>
            }
            <AbsoluteButton style={!payment && styles.button} absoluteStyle={{ bottom: payment ? height(4) : 0 }} title={payment ? 'BACK TO HOME' : 'CONNECT'} onPress={() => payment ? navigate(SCREEN.trackingDelivery) : RBSheet1.current.open()} />
        </MainWrapper>
    )
}

export default DriverDetail
const styles = StyleSheet.create({
    button: {
        width: width(100),
        alignSelf: 'center',
        borderRadius: 0
    }
})