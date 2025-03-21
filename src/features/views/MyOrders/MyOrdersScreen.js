import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import MyOrderListItem from './components/MyOrderListItem';
import Color from '../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';
import MyOrderMultipleListItem from './components/MyOrderMultipleListItem';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const MyOrdersScreen = () => {
    const navigation = useNavigation();

    const [latestOrder, setLatestOrder] = useState(null);
    const deviceWidth = Dimensions.get('window').width;


    useEffect(() => {
        const fetchLatestOrder = async () => {
            const user = auth().currentUser;

            const userId = user.uid;
            const ordersRef = database().ref(`/users/${userId}/orders`);

            ordersRef.orderByChild("timestamp").limitToLast(1).once("value", snapshot => {
                if (snapshot.exists()) {
                    const ordersArray = Object.values(snapshot.val());
                    setLatestOrder(ordersArray[0]); // Get the latest order
                    console.log("Latest Order:", ordersArray[0]);
                } else {
                    console.log("No orders found");
                }
            });
        };

        fetchLatestOrder();
    }, []);

    const navigateBack = () => {
        navigation.navigate("HOME");
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Converts to readable format
    };

    const renderMultipleItem = ({ item }) => {
        return (
            <MyOrderMultipleListItem
                item={item}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 60, borderBottomWidth: 1, borderBottomColor: Color.primary_grey }}>
                <TouchableOpacity onPress={() => navigateBack()} style={{ marginRight: 10 }}>
                    <Image
                        source={require('../../../assets/icons/Home/Left.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: "Roboto-Medium", textAlign: 'center', paddingHorizontal: 20 }}>Last Order History</Text>
            </View>

            {latestOrder ? (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderRadius: 8, margin: 10 }} >

                    <View style={{ flex: 1, }}>
                        <View style={{ flexDirection: 'row', borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomColor: "#E5E5E5", padding: 10, borderBottomWidth: 1 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>Transaction ID: {latestOrder.transactionId}</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black", marginBottom: 5, marginTop: 5 }}>Ordered on: {formatDate(latestOrder.timestamp)}</Text>
                            </View>
                        </View>

                        <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray', }} />

                        <View style={{ flex: 1, justifyContent: 'flex-start', }}>

                            <FlatList
                                contentContainerStyle={{ justifyContent: 'flex-start' }}
                                data={Object.values(latestOrder.items)}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ flex: 1, padding: 10, backgroundColor: "#E9E6E6" }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent:'center', borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray', }}>
                                            <Image source={require("../../../assets/icons/Home/laxmidevi_pic.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>{item.itemName}</Text>
                                                <Text style={{ fontSize: 14, color: 'black', fontFamily: 'Roboto-Light' }}>{item.itemQuantity}</Text>
                                                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'black' }}>₹{item.itemPrice}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", borderRadius: 20 }}>
                                                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black", marginStart: 10, marginEnd: 10, padding: 5 }}>+ {item.count}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }} >
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'Roboto-Bold', color: "black",  }}>Total Order Amount</Text>
                                <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: "red" }}>₹{Object.values(latestOrder.items).reduce((acc, item) => acc + parseFloat(item.itemPrice), 0)}</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: "darkgreen" }}>Order Received Successfully</Text>
                            </View>
                            {/* <TouchableOpacity style={{ backgroundColor: Color.primary_blue, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, flexShrink: 1 }} >
                            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: 'black', textAlign: 'center' }}>Buy Again</Text>
                        </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
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

export default MyOrdersScreen;