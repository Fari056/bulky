import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { ComponentWrapper, MainWrapper, RegularText } from '../../components';
import { saveData } from '../../backend/utility';
import firestore from '@react-native-firebase/firestore';

// Location tracking functions
const startLocationTracking = async (bookingId, onLocationUpdate) => {
    try {
        const watchId = Geolocation.watchPosition(
            async (position) => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: position.timestamp,
                };

                // Update Firebase
                await saveData("activeDeliveries", bookingId, {
                    currentLocation: newLocation,
                    lastUpdated: new Date()
                });

                onLocationUpdate?.(newLocation);
            },
            (error) => console.log(error),
            {
                enableHighAccuracy: true,
                distanceFilter: 10,
            }
        );

        return watchId;
    } catch (error) {
        console.error("Error in startLocationTracking:", error);
        throw error;
    }
};

const stopLocationTracking = (watchId) => {
    if (watchId) {
        Geolocation.clearWatch(watchId);
    }
};

// Main Component
const DriverTracking = ({ navigation, route }) => {
    const { bookingId } = route.params;
    const [deliveryData, setDeliveryData] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [watchId, setWatchId] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    useEffect(() => {
        const fetchDeliveryData = async () => {
            try {
                const doc = await firestore()
                    .collection('activeDeliveries')
                    .doc(bookingId)
                    .get();

                if (doc.exists) {
                    const data = doc.data();
                    setDeliveryData(data);
                    setRouteCoordinates(data.routeCoordinates || []);
                }
            } catch (error) {
                console.error("Error fetching delivery data:", error);
            }
        };

        fetchDeliveryData();
    }, [bookingId]);

    const startDelivery = async () => {
        try {
            // Request location permission first
            const granted = await Geolocation.requestAuthorization('whenInUse');
            if (granted !== 'granted') {
                Alert.alert("Permission Required", "Location permission is required to start delivery");
                return;
            }

            // Update booking status in Firebase
            await saveData("activeDeliveries", bookingId, {
                status: "in_progress",
                startTime: new Date()
            });

            // Start location tracking
            const id = await startLocationTracking(bookingId, (newLocation) => {
                setRouteCoordinates(prev => [...prev, newLocation]);
            });

            setWatchId(id);
            setIsTracking(true);
        } catch (error) {
            console.error("Error starting delivery:", error);
            Alert.alert("Error", "Failed to start delivery");
        }
    };

    const completeDelivery = async () => {
        try {
            if (watchId) {
                stopLocationTracking(watchId);
            }

            await saveData("activeDeliveries", bookingId, {
                status: "completed",
                endTime: new Date()
            });

            Alert.alert("Success", "Delivery completed successfully");
            navigation.goBack();
        } catch (error) {
            console.error("Error completing delivery:", error);
            Alert.alert("Error", "Failed to complete delivery");
        }
    };

    useEffect(() => {
        return () => {
            if (watchId) {
                stopLocationTracking(watchId);
            }
        };
    }, [watchId]);

    if (!deliveryData) {
        return (
            <MainWrapper>
                <ComponentWrapper>
                    <RegularText>Loading delivery data...</RegularText>
                </ComponentWrapper>
            </MainWrapper>
        );
    }

    return (
        <MainWrapper>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: deliveryData.pickupDetails.cords.latitude,
                        longitude: deliveryData.pickupDetails.cords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation
                    followsUserLocation
                >
                    {/* Pickup Marker */}
                    <Marker
                        coordinate={deliveryData.pickupDetails.cords}
                        title="Pickup"
                        pinColor="green"
                    />

                    {/* Destination Marker */}
                    <Marker
                        coordinate={deliveryData.destinationDetails.cords}
                        title="Destination"
                        pinColor="red"
                    />

                    {/* Driver Marker */}
                    {deliveryData.currentLocation && (
                        <Marker
                            coordinate={deliveryData.currentLocation}
                            title="Your Location"
                            pinColor="blue"
                        />
                    )}

                    {/* Route Line */}
                    {routeCoordinates.length > 1 && (
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeColor="#000"
                            strokeWidth={3}
                        />
                    )}
                </MapView>

                <View style={styles.controls}>
                    {deliveryData.status === 'pending' ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={startDelivery}
                        >
                            <RegularText style={styles.buttonText}>Start Delivery</RegularText>
                        </TouchableOpacity>
                    ) : deliveryData.status === 'in_progress' ? (
                        <TouchableOpacity
                            style={[styles.button, styles.completeButton]}
                            onPress={completeDelivery}
                        >
                            <RegularText style={styles.buttonText}>Complete Delivery</RegularText>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </MainWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    controls: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    completeButton: {
        backgroundColor: '#34C759',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DriverTracking;