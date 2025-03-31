import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import MyOrderListItem from './components/MyOrderListItem';
import Color from '../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';
import MyOrderMultipleListItem from './components/MyOrderMultipleListItem';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const OrderDetailScreen = ({ route }) => {
    const navigation = useNavigation();

    // const [latestOrder, setLatestOrder] = useState(null);
    const deviceWidth = Dimensions.get('window').width;
    const { order } = route.params;

    const navigateBack = () => {
        navigation.goBack();
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 60, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <TouchableOpacity onPress={navigateBack} style={{ marginRight: 10 }}>
                    <Image
                        source={require('../../../assets/icons/Home/Left.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: "Roboto-Medium", textAlign: 'center', paddingHorizontal: 20 }}>Order Details</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderRadius: 8, margin: 10 }} >

                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomColor: "#E5E5E5", padding: 10, borderBottomWidth: 1 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>Transaction ID: {order.transactionId}</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black", marginBottom: 5, marginTop: 5 }}>Ordered on:   {formatDate(order.timestamp)}</Text>
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                    <FlatList
                        data={Object.values(order.items)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, padding: 10, backgroundColor: "#E9E6E6" }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray', }}>
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

                    <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                    <View style={{ flexDirection: 'row', backgroundColor: Color.primary_orange, justifyContent: 'center', alignItems: 'center', padding: 10 }} >
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'Roboto-Bold', color: "black", }}>Total Order Amount</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: "red" }}>₹{order.totalAmount || "N/A"}</Text>
                            {/* <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: "darkgreen" }}>Order Received Successfully</Text> */}
                        </View>
                        {/* <TouchableOpacity style={{ backgroundColor: Color.primary_blue, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, flexShrink: 1 }} >
                                                <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: 'black', textAlign: 'center' }}>Buy Again</Text>
                                            </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;



{/* <View style={{ flex: 1, padding: 10, backgroundColor: "#E9E6E6" }}>
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
                                    </View> */}