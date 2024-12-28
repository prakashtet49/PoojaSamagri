import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Color from '../../../../infrastruture/theme/color';

const MyOrderListItem = ({ item }) => {
    const deviceWidth = Dimensions.get('window').width;

    return (

        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderRadius: 8, marginBottom: 10 }} >

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: "#E9E6E6", borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomColor: "#E5E5E5", padding: 10, borderBottomWidth: 1 }}>
                    <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Light', color: "black", marginBottom: 5 }}>{item.description}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }} >
                    <View style={{ flexDirection: 'column', maxWidth: deviceWidth * 0.5, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black" }}>{item.price}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black" }}>Additional Info</Text>
                    </View>
                    <TouchableOpacity onPress={() => onAddToCart(item.id)} style={{ backgroundColor: Color.primary_blue, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, flexShrink: 1 }} >
                        <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: 'black', textAlign: 'center' }}>Buy Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

export default MyOrderListItem;
