import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import PoojaTypeListItem from '../PoojaType/components/PoojaTypeListItem';
import AddtoCartItem from './components/AddtoCartItem';
import AddAddressSheet from '../Profile/components/AddAddressSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddtoCartScreen = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const route = useRoute();

    // const productCategoryData = route.params?.cartData || {};

    // console.log("productCategoryData in cart screen ", productCategoryData);


    const [cartItems, setCartItems] = useState([]);
    const [cartCounts, setCartCounts] = useState({});
    const [addressBtmSheetVisible, setaddressBtmSheetVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const fetchSelectedAddress = async () => {
            try {
                const storedAddress = await AsyncStorage.getItem('SELECTEDADDRESS');
                console.log("storedAddress", storedAddress)
                if (storedAddress) {
                    setSelectedAddress(JSON.parse(storedAddress));
                } else {
                    setSelectedAddress(null);
                }
            } catch (error) {
                console.error('Error fetching selected address:', error);
            }
        };

        fetchSelectedAddress();
    }, [addressBtmSheetVisible]);


    useEffect(() => {
        const checkOrderAndLoadCart = async () => {
            try {
                const orderId = await AsyncStorage.getItem("ORDER_ID");

                if (orderId) {
                    console.log("Previous Order Found:", orderId);

                    // Clear cart
                    setCartItems([]);
                    setCartCounts({});

                    // Remove ORDER_ID from AsyncStorage
                    await AsyncStorage.removeItem("ORDER_ID");
                } else {
                    // Load cart if no previous order ID is found
                    const storedCartData = await AsyncStorage.getItem("cartData");
                    if (storedCartData) {
                        const parsedCartData = JSON.parse(storedCartData);
                        const counts = {};
                        parsedCartData.forEach(item => {
                            counts[item.item_name] = item.count;
                        });
                        setCartItems(parsedCartData);
                        setCartCounts(counts);
                    }
                }
            } catch (error) {
                console.log("Error checking order and loading cart:", error);
            }
        };

        checkOrderAndLoadCart();
    }, []);


    const navigateBack = () => {
        navigation.goBack();
    };


    const openBottomSheet = () => setaddressBtmSheetVisible(true);
    const closeBottomSheet = () => setaddressBtmSheetVisible(false);


    const numColumns = 2;

    const itemWidth = width / numColumns - 60;
    const itemWidth2 = width / numColumns - 120;

    const handleAddToCart = (id) => {
        setCartCounts({ ...cartCounts, [id]: 1 });
    };

    // const handleIncrease = (id) => {
    //     setCartCounts({ ...cartCounts, [id]: (cartCounts[id] || 0) + 1 });
    // };

    // const handleDecrease = (id) => {
    //     if (cartCounts[id] > 1) {
    //         setCartCounts({ ...cartCounts, [id]: cartCounts[id] - 1 });
    //     } else {
    //         const updatedCounts = { ...cartCounts };
    //         delete updatedCounts[id];
    //         setCartCounts(updatedCounts);
    //     }
    // };
    const handleIncrease = (itemName) => {
        setCartCounts(prevCounts => ({
            ...prevCounts,
            [itemName]: (prevCounts[itemName] || 0) + 1
        }));
    };

    const handleDecrease = (itemName) => {
        setCartCounts(prevCounts => {
            const newCounts = { ...prevCounts };
            if (newCounts[itemName] > 1) {
                newCounts[itemName] -= 1;
            } else {
                delete newCounts[itemName]; // Remove from cart if count is 0
                setCartItems(prevItems => prevItems.filter(item => item.item_name !== itemName));
            }
            return newCounts;
        });
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const count = cartCounts[item.item_name] || 0; // Get count from cartCounts
            return total + (item.price * count); // Multiply price by count and add to total
        }, 0);
    };


    const handlePayUsing = () => {
        navigation.navigate('ADDPAYMENT', { totalAmount: calculateTotalPrice() });
    };

    const renderItem = ({ item }) => {
        const count = cartCounts[item.item_name] || 0;

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
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ padding: 10 }}
                />
            </View>

            <View style={{ backgroundColor: '#EFEEEE', elevation: 5, borderTopLeftRadius: 8, borderTopRightRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
                <TouchableOpacity onPress={() => openBottomSheet()} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8, }}>
                    <Image resizeMode="contain" source={require('../../../assets/icons/Profile/Location.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                    <View style={{ width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'black' }}>Delivering to</Text>
                            <Image resizeMode="contain" source={require('../../../assets/icons/Profile/Forward.png')} style={{ marginStart: 10, width: 30, height: 30, transform: [{ rotate: '90deg' }] }} />
                        </View>
                        {selectedAddress ? (
                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black", width: "80%" }} numberOfLines={1} ellipsizeMode="tail">
                                {selectedAddress.flatNumber}, {selectedAddress.area},{selectedAddress.landmark}, {selectedAddress.townCity}, {selectedAddress.state}, {selectedAddress.pincode}
                            </Text>
                        ) : (
                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black" }}>Select Address</Text>
                        )}
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
                            <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', color: 'white' }}>₹{calculateTotalPrice()}</Text>
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

