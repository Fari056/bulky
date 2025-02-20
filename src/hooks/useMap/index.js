import React, { useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
export const useMap = () => {

    const [location, setLocation] = useState({
        latitude: 31.5204,
        longitude: 74.3587,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.00121,
    })
    const [pickup, setPickup] = useState(null)
    const [region, setRegion] = useState(
        {
            latitude: 31.5204,
            longitude: 74.3587,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    )
    const [iconSize, setIconSize] = useState(50);
    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setPickup({ latitude, longitude });
    };

    const GetPosition = async () => {
        Geolocation.getCurrentPosition(info => {
            let { latitude, longitude } = info?.coords
            let loc = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.00121,
            }
            setLocation(loc)
        });
    }
    const onRegionChangeComplete = (region) => {
        setRegion(region);
        const zoomLevel = Math.round(Math.log(360 / region.latitudeDelta) / Math.LN2);
        const newSize = Math.max(80, 150 - (zoomLevel - 5)); // Adjust formula as needed
        setIconSize(newSize);
    };

    return {
        GetPosition,
        location, setLocation,
        onRegionChangeComplete,
        region,
        iconSize,
        pickup,
        handleMapPress
    }
}
