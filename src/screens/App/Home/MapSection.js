import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Wrapper } from '../../../components';
const MapSection = () => {
    return (
        <Wrapper style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 31.5204,
                    longitude: 74.3587,
                    latitudeDelta: 0.0015,
                    longitudeDelta: 0.00121,
                }}
            >
            </MapView>
        </Wrapper>
    )
}

export default MapSection

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})