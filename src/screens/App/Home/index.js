import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { HomeHeader, MainWrapper, Wrapper } from '../../../components'
import MapSection from './MapSection'
import SearchbarSection from './SearchbarSection'
import { SCREEN } from '../../../constants'
import { useData } from './hooks'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useMap } from '../../../hooks'
import { Pin, Pin2 } from '../../../assets'
import { getToken, request_Permission, foreground_Listener, background_Listener, Notification } from '../../../services'
import { getCurrentUserId } from '../../../backend/auth'
import { saveData } from '../../../backend/utility'
export const ClientHome = ({ navigation }) => {
    const mapRef = useRef()
    const { OnManu, OnProfile, OnPickUp } = useData(navigation)
    const {
        GetPosition, location,
        onRegionChangeComplete,
        region, iconSize,
        pickup,
        handleMapPress
    } = useMap()
    // console.log(iconSize)
    useEffect(() => {
        const res = async () => {
            await GetPosition();
            await request_Permission();
            await token_();
            const unsub = foreground_Listener();
            background_Listener();
            Notification();
            return () => unsub();
        };
        res();
    }, [])
    const token_ = async () => {
        try {
            let token = await getToken();
            let uid = await getCurrentUserId();
            const res = await saveData("users", uid, { token });
            console.log("saved", res);
        } catch (error) {
            console.error("Error in token_ function:", error);
        }
    };
    return (
        <MainWrapper>
            <HomeHeader
                onPressProfile={OnProfile}
                onPressMenu={OnManu} />
            <Wrapper style={{ flex: 1 }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={mapRef}
                    zoomEnabled
                    onPress={handleMapPress}
                    showsCompass={true}
                    showsMyLocationButton={true}
                    region={location}
                    scrollEnabled={true}
                    style={styles.map}
                >
                    {location && <Marker coordinate={location}>
                        <Pin size={iconSize} />
                    </Marker>}
                </MapView>
            </Wrapper>
            <SearchbarSection onPress={OnPickUp} />
        </MainWrapper>
    )
}

export default ClientHome

const styles = StyleSheet.create({
    map: {
        flex: 1,
        zIndex: 100000,
        // ...StyleSheet.absoluteFillObject,
    }
})