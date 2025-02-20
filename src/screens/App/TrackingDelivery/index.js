import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CancelDeliveryModal, CancelRequestBottomSheet, HomeHeader, MainWrapper } from '../../../components'
import { SCREEN, colors } from '../../../constants'
import { DriverContactPreview, TrackDeliveryStatus, TrackingInfo, VehicleDetail, VehicleLocation } from '../../../components/appComponents/staticComponents'
import { height } from 'react-native-dimension'
const TrackingDelivery = ({ navigation, route }) => {
    const { navigate, replace } = navigation
    const { delivered } = route?.params ?? ''
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showNext, setShowNext] = useState(false);
    const [cancelModal, setCancelModal] = useState(false)
    const CancelSheet = useRef()

    //AFTER 1.5 SEC, CHANGE TRACKING STATUS AND MOVE TO DELIVERED SCREEN
    useEffect(() => {
        setTimeout(() => {
            setShowNext(true)
            navigate(SCREEN?.orderDelivered)
        }, 1500);
    }, [])
    //NAVIGATE TO ADD REVIEW SCREEN WHEN ORDER DELIVERED OTHRTWISE SHOW LIST OF REASON OF CANCELLATION
    const handlePressCancel = () => {
        delivered ? navigate(SCREEN.deliveryPicture) :
            CancelSheet?.current?.open()
    }

    return (
        <MainWrapper>
            <HomeHeader onPressMenu={() => navigate(SCREEN.setting)} />
            <VehicleLocation hideBackBtn mapStyle={{ height: isCollapsed ? height(63) : height(37) }} />
            <TrackingInfo
                isCollapsed={isCollapsed}
                onPressCollapse={() => setIsCollapsed(!isCollapsed)}
                showNext={showNext}
                cancelTitle={delivered ? 'ADD REVIEW' : 'CANCEL REQUEST'}
                onPressCancel={handlePressCancel}
            />
            <CancelRequestBottomSheet innerRef={CancelSheet} heights={height(55)} onPressReason={() => setCancelModal(true)} onPressKeepDelivery={() => CancelSheet?.current?.close()} />
            <CancelDeliveryModal isVisible={cancelModal} onPressClose={() => setCancelModal(!cancelModal)} onPressCancelDelivery={() => replace(SCREEN.appStack)} onPressKeepDelivery={() => { setCancelModal(!cancelModal), CancelSheet?.current?.close() }} />
        </MainWrapper>
    )
}

export default TrackingDelivery