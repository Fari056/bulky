import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ComponentWrapper, MainWrapper, RegularText } from '../../components';
import firestore from '@react-native-firebase/firestore';

// Move addSampleBookings to a separate service file
const addSampleBookings = async () => {
    try {
        // Sample booking 1 - Start with pending status
        await firestore().collection('activeDeliveries').doc('booking123').set({
            driverId: "driver456",
            status: "pending", // Start with pending status
            startTime: null, // No start time yet
            currentLocation: {
                latitude: 37.78825,
                longitude: -122.4324,
                timestamp: Date.now()
            },
            routeCoordinates: [
                {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    timestamp: Date.now()
                }
            ],
            pickupDetails: {
                address: "123 Pickup Street",
                cords: {
                    latitude: 37.78825,
                    longitude: -122.4324
                }
            },
            destinationDetails: {
                address: "456 Destination Ave",
                cords: {
                    latitude: 37.7749,
                    longitude: -122.4194
                }
            }
        });

        console.log("Sample booking added successfully!");
    } catch (error) {
        console.error("Error adding sample booking:", error);
        throw error;
    }
};

const clearSampleData = async () => {
    try {
        const snapshot = await firestore()
            .collection('activeDeliveries')
            .get();

        const batch = firestore().batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log("Sample data cleared successfully!");
    } catch (error) {
        console.error("Error clearing sample data:", error);
    }
};

// Delivery List Component
const DeliveryList = ({ navigation }) => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeData = async () => {
            try {
                // First, clear any existing data
                await clearSampleData();
                // Add new sample data
                await addSampleBookings();

                // Fetch only pending deliveries
                const deliveriesRef = firestore()
                    .collection('activeDeliveries')
                    .where('status', '==', 'pending');

                const snapshot = await deliveriesRef.get();
                const deliveryList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setDeliveries(deliveryList);
            } catch (error) {
                console.error("Error initializing data:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeData();
    }, []);

    const renderDeliveryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.deliveryCard}
            onPress={() => navigation.navigate('DriverTracking', { bookingId: item.id })}
        >
            <View style={styles.cardHeader}>
                <RegularText style={styles.bookingId}>Booking ID: {item.id}</RegularText>
                <RegularText style={[styles.status, { color: '#FFA500' }]}>
                    Pending
                </RegularText>
            </View>

            <View style={styles.locationInfo}>
                <RegularText>From: {item.pickupDetails.address}</RegularText>
                <RegularText>To: {item.destinationDetails.address}</RegularText>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <MainWrapper>
                <ComponentWrapper>
                    <RegularText>Loading deliveries...</RegularText>
                </ComponentWrapper>
            </MainWrapper>
        );
    }

    return (
        <MainWrapper>
            <ComponentWrapper>
                <RegularText style={styles.title}>Available Deliveries</RegularText>
                <FlatList
                    data={deliveries}
                    renderItem={renderDeliveryItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    removeClippedSubviews={false}
                />
            </ComponentWrapper>
        </MainWrapper>
    );
};

// Delivery Tracking Component
const DeliveryTracking = ({ navigation, route }) => {
    const { bookingId } = route.params;
    const [deliveryData, setDeliveryData] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('activeDeliveries')
            .doc(bookingId)
            .onSnapshot(snapshot => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    setDeliveryData(data);
                    setRouteCoordinates(data.routeCoordinates || []);
                }
            });

        return () => unsubscribe();
    }, [bookingId]);

    if (!deliveryData) {
        return (
            <MainWrapper>
                <ComponentWrapper>
                    <RegularText>Loading delivery status...</RegularText>
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
                        latitude: deliveryData.currentLocation.latitude,
                        longitude: deliveryData.currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* Driver Marker */}
                    <Marker
                        coordinate={deliveryData.currentLocation}
                        title="Driver Location"
                        pinColor="blue"
                    />

                    {/* Route Line */}
                    {routeCoordinates.length > 1 && (
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeColor="#000"
                            strokeWidth={3}
                        />
                    )}
                </MapView>

                <View style={styles.infoContainer}>
                    <RegularText style={styles.statusText}>
                        Status: {deliveryData.status === 'in_progress' ? 'On the way' : 'Completed'}
                    </RegularText>
                    <RegularText>
                        Started: {new Date(deliveryData.startTime.toDate()).toLocaleString()}
                    </RegularText>
                    {deliveryData.status === 'completed' && (
                        <RegularText>
                            Completed: {new Date(deliveryData.endTime.toDate()).toLocaleString()}
                        </RegularText>
                    )}
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
    infoContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        paddingVertical: 16,
    },
    deliveryCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    bookingId: {
        fontWeight: 'bold',
    },
    status: {
        fontWeight: 'bold',
    },
    locationInfo: {
        marginVertical: 8,
    },
    time: {
        color: '#666',
        fontSize: 12,
    },
});

export { DeliveryList, DeliveryTracking };