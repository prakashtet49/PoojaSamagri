import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Color from '../../../../infrastruture/theme/color';

const AddtoCartItem = ({ item, count, onAddToCart, onIncrease, onDecrease }) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Color.orange, padding: 10, borderRadius: 8, marginBottom: 10 }}>

            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'white' }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Roboto-Light' }}>{item.description}</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'white' }}>{item.price}</Text>
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

                <View style={{ borderBottomWidth: 1, marginTop: 5, marginBottom: 5, borderStyle: 'dotted', borderColor: 'gray' }} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'white' }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Roboto-Light' }}>{item.description}</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'white' }}>{item.price}</Text>
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


                <View style={{ borderBottomWidth: 1, marginTop: 5, marginBottom: 5, borderStyle: 'dotted', borderColor: 'gray' }} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'white' }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Roboto-Light' }}>{item.description}</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'white' }}>{item.price}</Text>
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
