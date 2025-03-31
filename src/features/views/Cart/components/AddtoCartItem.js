import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Color from '../../../../infrastruture/theme/color';

const AddtoCartItem = ({ item, count, onAddToCart, onIncrease, onDecrease }) => {

    console.log("item ", item);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Color.primary_grey, padding: 10, borderRadius: 8, margin: 10 }}>

            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require("../../../../assets/icons/Home/laxmidevi_pic.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>{item.itemName}</Text>
                        <Text style={{ fontSize: 14, color: 'black', fontFamily: 'Roboto-Light' }}>{item.itemQuantity}</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'black' }}>{item.itemPrice}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", paddingHorizontal: 8, borderRadius: 5 }}>
                        <TouchableOpacity onPress={() => onDecrease(item.id)} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: 'orange' }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black", marginStart: 20, marginEnd: 20 }}>{count}</Text>
                        <TouchableOpacity onPress={() => onIncrease(item.id)} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'orange' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default AddtoCartItem;
