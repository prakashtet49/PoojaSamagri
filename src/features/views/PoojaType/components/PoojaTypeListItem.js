import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Color from '../../../../infrastruture/theme/color';

const PoojaTypeListItem = ({ item, count, onAddToCart, onIncrease, onDecrease }) => {

    return (

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Color.orange, padding: 10, borderRadius: 8, marginBottom: 10, position: 'relative' }}>
            <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'white' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Roboto-Light' }}>{item.description}</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'white' }}>{item.price}</Text>
            </View>
            {count === 0 ? (
                <TouchableOpacity onPress={() => onAddToCart(item.id)} style={{ backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5 }}>
                    <Text style={{ fontSize: 15, color: "black", fontFamily: 'Roboto-Medium' }}>Add to Cart</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", paddingHorizontal: 8, borderRadius: 5 }}>
                    <TouchableOpacity onPress={() => onDecrease(item.id)} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: 'orange' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black", marginStart: 20, marginEnd: 20 }}>{count}</Text>
                    <TouchableOpacity onPress={() => onIncrease(item.id)} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'orange' }}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Image resizeMode="contain" source={require('../../../../assets/icons/Home/check.png')} style={{ position: 'absolute', top: -2, right: 0, width: 15, height: 15 }} />
        </View>
    );
};

export default PoojaTypeListItem;
