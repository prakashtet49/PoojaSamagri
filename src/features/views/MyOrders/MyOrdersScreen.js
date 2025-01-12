import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import MyOrderListItem from './components/MyOrderListItem';
import Color from '../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';
import MyOrderMultipleListItem from './components/MyOrderMultipleListItem';

const MyOrdersScreen = () => {
    const navigation = useNavigation();


    const navigateBack = () => {
        navigation.navigate("HOME");
    };

    const data = [
        { id: '1', title: 'Item 1', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹300", description: 'Deliverd on 30 Jan 2024' },
        // { id: '2', title: 'Item 2', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹300", description: 'Description 2' },
        // { id: '3', title: 'Item 3', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹300", description: 'Description 3' },
    ];

    const renderItem = ({ item }) => {
        return (
            <MyOrderListItem
                item={item}
            />
        );
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
                <Text style={{ fontSize: 18, fontFamily: "Roboto-Medium", textAlign: 'center', paddingHorizontal: 20 }}>Your Orders</Text>
            </View>

            <FlatList style={{ flex: 1 }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
            />

            <FlatList style={{ flex: 1 }}
                data={data}
                renderItem={renderMultipleItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
            />

            {/* 
        <ScrollView style={{ flex: 1 }}>


        </ScrollView> */}
        </SafeAreaView>
    );
};

export default MyOrdersScreen;