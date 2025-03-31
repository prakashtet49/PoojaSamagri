import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import OrderHistoryShimmer from './components/OrderHistoryShimmer';

const OrderHistoryScreen = () => {
    const navigation = useNavigation();
    const deviceWidth = Dimensions.get('window').width;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllOrders = async () => {
            const user = auth().currentUser;

            if (user) {
                const userId = user.uid;
                const ordersRef = database().ref(`/users/${userId}/orders`);

                ordersRef.orderByChild("timestamp").once("value", snapshot => {
                    if (snapshot.exists()) {
                        const ordersArray = Object.values(snapshot.val());
                        setOrders(ordersArray);
                        console.log("All Orders:", ordersArray);
                    } else {
                        console.log("No orders found");
                    }
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        };

        fetchAllOrders();
    }, []);

    const navigateBack = () => {
        navigation.navigate("HOME");
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const renderOrderItem = ({ item }) => {
        if (isLoading) {
            return <OrderHistoryShimmer />;
        }

        const orderItems = Object.values(item.items);
        return (
            <TouchableOpacity onPress={() => navigation.navigate("ORDERDETAILS", { order: item })}
                style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderRadius: 8, margin: 10 }} >

                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "#E9E6E6", borderBottomColor: "#E5E5E5", padding: 10, borderBottomWidth: 1 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>Ref ID: {item.transactionId}</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black", marginTop: 5, }}>Time:   {formatDate(item.timestamp)}</Text>
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: deviceWidth }}>
                        <View style={{ width: deviceWidth * 0.6, paddingHorizontal: 10 }}>
                            {orderItems.slice(0, 3).map((orderItem, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black", textAlign: 'left', flex: 1 }}>
                                        {orderItem.itemQuantity}
                                    </Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black", textAlign: 'center', flex: 1 }}>
                                        →
                                    </Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black", textAlign: 'left', flex: 2 }} numberOfLines={1} ellipsizeMode="tail">
                                        {orderItem.itemName}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ width: deviceWidth * 0.4, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black" }}>View more</Text>
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: Color.primary_orange }} >
                        <View style={{ flexDirection: 'column', maxWidth: deviceWidth * 0.5, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black" }}>Total: ₹{item.totalAmount || "N/A"}</Text>
                            {/* <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black" }}>Additional Info</Text> */}
                        </View>
                        {/* <TouchableOpacity style={{ backgroundColor: "#007BFF", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, flexShrink: 1 }} >
                            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: 'black', textAlign: 'center' }}>Buy Again</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 60, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <TouchableOpacity onPress={navigateBack} style={{ marginRight: 10 }}>
                    <Image
                        source={require('../../../assets/icons/Home/Left.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: "Roboto-Medium", textAlign: 'center', paddingHorizontal: 20 }}>My Orders</Text>
            </View>

            {isLoading ? (
                <FlatList
                    data={[1, 2, 3]}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={() => <OrderHistoryShimmer />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderOrderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/icons/Home/emptycart.png')}
                        style={{ width: 150, height: 150, marginBottom: 20 }}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#555' }}>
                        No Order History
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default OrderHistoryScreen;