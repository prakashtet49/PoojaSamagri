import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import PoojaTypeListItem from '../PoojaType/components/PoojaTypeListItem';
import AddtoCartItem from './components/AddtoCartItem';
import AddAddressSheet from '../Profile/components/AddAddressSheet';

const AddtoCartScreen = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');


    const navigateBack = () => {
        navigation.goBack();
    };

    const [addressBtmSheetVisible, setaddressBtmSheetVisible] = useState(false);

    const openBottomSheet = () => setaddressBtmSheetVisible(true);
    const closeBottomSheet = () => setaddressBtmSheetVisible(false);


    const numColumns = 2;

    const itemWidth = width / numColumns - 60;
    const itemWidth2 = width / numColumns - 120;

    const data = [
        { id: '1', title: 'mahalaxmi idol pic', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        // { id: '2', title: 'Item 2', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        // { id: '3', title: 'Item 3', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        // { id: '4', title: 'Item 4', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        // { id: '5', title: 'Item 5', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
        // { id: '6', title: 'Item 6', image: require('../../../assets/icons/Home/laxmidevi_pic.png'), price: "₹200", description: "Quantity: 1 Piece" },
    ];

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

    const handlePayUsing = () => {
        navigation.navigate('ADDPAYMENT');
    };

    const renderItem = ({ item }) => {
        const count = cartCounts[item.id] || 0;

        return (
            <AddtoCartItem
                item={item}
                count={count}
                onAddToCart={handleAddToCart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, height: 60, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                <TouchableOpacity onPress={navigateBack} style={{ marginRight: 25 }}>
                    <Image resizeMode="contain" source={require('../../../assets/icons/Home/Left.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', textAlign: 'center' }}>Shopping Cart</Text>
                <View style={{ flex: 1 }} />
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 10 }}
                />
            </View>

            <View style={{ backgroundColor: '#EFEEEE', elevation: 5, borderTopLeftRadius: 8, borderTopRightRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
                <TouchableOpacity onPress={() => openBottomSheet()} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8, }}>
                    <Image resizeMode="contain" source={require('../../../assets/icons/Profile/Location.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'black' }}>Delivering to</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: 'black' }}>Hyderabad, Telangana</Text>
                    </View>
                    <View onPress={() => { }} style={{ marginLeft: 'auto' }}>
                        <Image resizeMode="contain" source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 30, height: 30 }} />
                    </View>
                </TouchableOpacity>

                <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10 }}>
                    {/* <TouchableOpacity style={{ width: "40%", justifyContent: "flex-start" }} onPress={() => handlePayUsing()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 14, textAlign: "center", fontFamily: 'Roboto-Light', color: 'black' }}>Pay using</Text>
                            <Image resizeMode="contain" source={require('../../../assets/icons/Home/arrow.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: 'black' }}>Phonepe</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => handlePayUsing()} style={{ flex: 1, backgroundColor: 'orange', justifyContent: "space-between", alignContent: 'center', padding: 5, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ alignSelf: "flex-start", alignItems: 'center', marginRight: 20, marginStart: 15 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: 'white' }}>₹500</Text>
                            <Text style={{ fontSize: 12, fonFamily: 'Roboto-Medium', color: 'white', marginRight: 10 }}>Total</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: 'white', }}>Place Order</Text>
                            <Image resizeMode="contain" source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 25, height: 25, tintColor: 'white' }} />
                        </View>
                    </TouchableOpacity>
                </View>

                <AddAddressSheet visible={addressBtmSheetVisible} close={closeBottomSheet} />

            </View>
        </SafeAreaView>
    );
};


export default AddtoCartScreen;

