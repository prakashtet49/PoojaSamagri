import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, FlatList } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';
import PoojaTypeListItem from '../PoojaType/components/PoojaTypeListItem';

const SearchScreen = () => {
    const navigation = useNavigation();

    const [cartCounts, setCartCounts] = useState({});

    const navigateBack = () => {
        navigation.goBack();
    };

    const handleAddToCart = (id) => {
        setCartCounts({ ...cartCounts, [id]: 1 });
    };

    const handleIncrease = (id) => {
        setCartCounts({ ...cartCounts, [id]: (cartCounts[id] || 0) + 1 });
    };

    const handleDecrease = (id) => {
        if (cartCounts[id] > 1) {
            setCartCounts({ ...cartCounts, [id]: cartCounts[id] - 1 });
        } else {
            const updatedCounts = { ...cartCounts };
            delete updatedCounts[id];
            setCartCounts(updatedCounts);
        }
    };

    const data = [
        { id: '1', title: 'Item 1', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹300", description: 'Description 1' },
        { id: '2', title: 'Item 2', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹300", description: 'Description 2' },
        { id: '3', title: 'Item 3', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹300", description: 'Description 3' },
    ];

    const renderItem = ({ item }) => {
        const count = cartCounts[item.id] || 0;

        return (
            <PoojaTypeListItem
                item={item}
                count={count}
                onAddToCart={handleAddToCart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />
        );
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 60, borderBottomWidth: 1, borderBottomColor: Color.primary_grey }}>
                <TouchableOpacity onPress={() => navigateBack()} style={{ marginRight: 10 }}>
                    <Image
                        source={require('../../../assets/icons/Home/Left.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
                <TextInput style={{ flex: 1, fontSize: 18, backgroundColor: Color.primary_grey, fontFamily: 'Roboto-Medium', textAlign: 'left', color: "black", borderRadius: 8, paddingHorizontal: 10 }}
                    placeholder="Search here"
                    placeholderTextColor="gray"
                />
            </View>

            <FlatList style={{ flex: 1 }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
            />

            {/* 
            <ScrollView style={{ flex: 1 }}>


            </ScrollView> */}
        </SafeAreaView>
    );
};



export default SearchScreen;