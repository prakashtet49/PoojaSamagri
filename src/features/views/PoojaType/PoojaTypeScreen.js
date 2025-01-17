import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import PoojaTypeListItem from './components/PoojaTypeListItem';

const PoojaTypeScreen = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const route = useRoute();

    const poojaCategoryData = route.params?.poojaCategoryData || [];
    const screenName = route.params?.screenName || "Select Items";


    const navigateBack = () => {
        navigation.goBack();
    };

    const handleSearch = () => {
        navigation.navigate("SEARCH");
    };

    const numColumns = 2;

    const itemWidth = width / numColumns - 60;
    const itemWidth2 = width / numColumns - 120;

    const data = [
        { id: '1', title: 'mahalaxmi idol pic', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '2', title: 'Item 2', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '3', title: 'Item 3', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '4', title: 'Item 4', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '5', title: 'Item 5', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '6', title: 'Item 6', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '7', title: 'Item 6', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        { id: '8', title: 'Item 6', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },

    ];

    const [selectedId, setSelectedId] = useState(poojaCategoryData[0].id);
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
                <View style={{ width: itemWidth2, height: itemWidth2, backgroundColor: isSelected ? Color.primary_blue : 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: isSelected ? 2 : 1, borderColor: isSelected ? 'white' : 'lightgray', }}>
                    <Image source={item.image} style={{ width: '80%', height: '80%', resizeMode: 'contain', }} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 10, fontFamily: "Roboto-Medium", color: 'black', textAlign: 'center', flexWrap: 'wrap', width: itemWidth2 }} numberOfLines={2}>
                    {item.text}
                </Text>
                {isSelected && (
                    <View style={{ marginTop: 5, width: itemWidth / 2, height: 4, backgroundColor: "darkblue", borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 3 }} />
                )}
            </TouchableOpacity>
        );
    };

    const handleCartClick = () => {
        navigation.navigate("ADDTOCART");
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, height: 60, borderBottomWidth: 1, borderBottomColor: Color.primary_grey, }}>
                    <TouchableOpacity onPress={() => navigateBack()} style={{ marginRight: 25 }}>
                        <Image resizeMode='contain' source={require('../../../assets/icons/Home/Left.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', textAlign: 'left', }}>{screenName}</Text>
                    <View style={{ flex: 1 }} />

                    <TouchableOpacity onPress={() => handleSearch()} style={{ borderRadius: 20, padding: 5 }}>
                        <Image resizeMode="contain" source={require('../../../assets/icons/Home/Search.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>

                <View style={{}}>
                    <FlatList
                        data={poojaCategoryData}
                        renderItem={renderHorizontalItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
                    />
                    <View style={{ flex: 1, borderBottomColor: Color.primary_grey, borderBottomWidth: 1, }} />
                </View>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 10 }}
                />
            </View>

            <TouchableOpacity onPress={() => { handleCartClick() }} style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", alignSelf: 'center', padding: 5, width: "40%", backgroundColor: "#525252", borderRadius: 30, position: 'absolute', bottom: 20, }}>
                <View style={{ padding: 5, justifyContent: "flex-start", alignItems: "flex-start", marginStart: 10 }}>
                    <Text style={{ fontSize: 15, color: "white", textAlign: 'center', fontFamily: "Roboto-Medium", }}>View cart</Text>
                    <Text style={{ fontSize: 14, color: "white", textAlign: 'center', fontFamily: "Roboto-Light" }}>3 Items</Text>
                </View>
                <View style={{ backgroundColor: '#A8A8A8', borderRadius: 20, padding: 2, width: 40, height: 40 }}>
                    <Image source={require('../../../assets/icons/Home/arrow.png')} resizeMode='contain' style={{ width: "100%", height: "100%", tintColor: "white", transform: [{ rotate: '270deg' }] }} />
                </View>

            </TouchableOpacity>

        </SafeAreaView>
    );
};


export default PoojaTypeScreen;

