import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import PoojaTypeListItem from './components/PoojaTypeListItem';

const PoojaTypeScreen = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');


    const navigateBack = () => {
        navigation.goBack();
    };

    const numColumns = 2;

    const itemWidth = width / numColumns - 60;
    const itemWidth2 = width / numColumns - 120;

    const horizontalData = [
        { id: '1', title: 'laxmi pooja', image: require('../../../assets/icons/Home/laxmidevi_pic.png') },
        { id: '2', title: 'mahalaxmi pooja', image: require('../../../assets/icons/Home/laxmidevi_pic.png') },
        { id: '3', title: 'mahashiva pooja', image: require('../../../assets/icons/Home/laxmidevi_pic.png') },
        { id: '4', title: 'HItem 4', image: require('../../../assets/icons/Home/laxmidevi_pic.png') },
        { id: '5', title: 'HItem 5', image: require('../../../assets/icons/Home/laxmidevi_pic.png') },
    ];

    const data = [
        { id: '1', title: 'mahalaxmi idol pic', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '2', title: 'Item 2', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '3', title: 'Item 3', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '4', title: 'Item 4', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '5', title: 'Item 5', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '6', title: 'Item 6', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
    ];

    const [selectedId, setSelectedId] = useState(horizontalData[0].id);
    const [cartCounts, setCartCounts] = useState({});

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


    const renderHorizontalItem = ({ item }) => {
        const isSelected = selectedId === item.id;
        return (
            <TouchableOpacity onPress={() => setSelectedId(item.id)} style={{ marginHorizontal: 5, alignItems: 'center', }}>
                <View style={{ width: itemWidth2, height: itemWidth2, backgroundColor: isSelected ? Color.primary_blue : 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: isSelected ? 2 : 0, borderColor: isSelected ? 'white' : 'transparent', }}>
                    <Image source={item.image} style={{ width: '80%', height: '80%', resizeMode: 'contain' }} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Medium", color: 'black', textAlign: 'center', flexWrap: 'wrap', width: itemWidth2 }} numberOfLines={2}>
                    {item.title}
                </Text>
                {isSelected && (
                    <View style={{ marginTop: 5, width: itemWidth / 2, height: 4, backgroundColor: "darkblue", borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 3 }} />
                )}
            </TouchableOpacity>
        );
    };


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

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, height: 60, borderBottomWidth: 1, borderBottomColor: Color.primary_grey, }}>
                <TouchableOpacity onPress={() => navigateBack()} style={{ marginRight: 25 }}>
                    <Image resizeMode='contain' source={require('../../../assets/icons/Home/Left.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', textAlign: 'left', }}>Select Pooja Type</Text>
                <View style={{ flex: 1 }} />

                <TouchableOpacity onPress={() => handleSearch()} style={{ borderRadius: 20, padding: 5 }}>
                    <Image resizeMode="contain" source={require('../../../assets/icons/Home/Search.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={horizontalData}
                    renderItem={renderHorizontalItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
                />
                <View style={{ flex: 1, borderBottomColor: Color.primary_grey, borderBottomWidth: 1 }} />
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
            />

        </SafeAreaView>
    );
};


export default PoojaTypeScreen;

