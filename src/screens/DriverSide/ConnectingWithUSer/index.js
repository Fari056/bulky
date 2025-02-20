import { View, Text } from 'react-native'
import React from 'react'
import { MainWrapper } from '../../../components'
import { ConnectingDriverAnimation, VehicleLocation } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'

const ConnectingWithUser = ({ navigation , route}) => {
    const { navigate } = navigation
     const { bookingDetails } = route.params;
    return (
      <MainWrapper>
        <VehicleLocation hideBackBtn mapStyle={{ height: "85%" }} />
        <ConnectingDriverAnimation
          title={"Connecting with User"}
          navigate={() =>
            navigate(SCREEN.driverPickupPoint, {
              bookingDetails,
              payment: true,
            })
          }
        />
      </MainWrapper>
    );
}

export default ConnectingWithUser