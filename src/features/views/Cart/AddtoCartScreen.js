import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import PoojaTypeListItem from '../PoojaType/components/PoojaTypeListItem';
import AddtoCartItem from './components/AddtoCartItem';
import AddAddressSheet from '../Profile/components/AddAddressSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const AddtoCartScreen = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const route = useRoute();

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

    useFocusEffect(
        useCallback(() => {
            const fetchCartData = async () => {
                try {
                    const user = auth().currentUser;
                    if (!user) {
                        console.log("User not logged in");
                        return;
                    }

                    const cartRef = database().ref(`/users/${user.uid}/cartItems`);

                    cartRef.once("value", (snapshot) => {
                        if (snapshot.exists()) {
                            const cartData = snapshot.val();
                            const formattedCart = Object.keys(cartData).map((key) => ({
                                id: key,
                                itemName: cartData[key].itemName,
                                itemPrice: cartData[key].itemPrice,
                                itemQuantity: cartData[key].itemQuantity,
                                count: cartData[key].count
                            }));

                            setCartItems(formattedCart);
                            console.log("formattedCart", formattedCart);
                        } else {
                            console.log("No cart data found in Firebase");
                            setCartItems([]);
                        }
                    });
                } catch (error) {
                    console.log("Error fetching cart data:", error);
                }
            };

            fetchCartData();
        }, [])
    );

    const navigateBack = () => {
        navigation.goBack();
    };


    const openBottomSheet = () => setaddressBtmSheetVisible(true);
    const closeBottomSheet = () => setaddressBtmSheetVisible(false);

    const handleIncrease = async (itemId) => {
        try {
            const user = auth().currentUser;
            if (!user) return;

            const itemRef = database().ref(`/users/${user.uid}/cartItems/${itemId}`);

            itemRef.once("value", (snapshot) => {
                if (snapshot.exists()) {
                    const currentCount = snapshot.val().count || 0;
                    itemRef.update({ count: currentCount + 1 });
                }
            });

            // Update local state immediately for better UI response
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, count: item.count + 1 } : item
                )
            );
        } catch (error) {
            console.error("Error increasing count:", error);
        }
    };

    const handleDecrease = async (itemId) => {
        try {
            const user = auth().currentUser;
            if (!user) return;

            const itemRef = database().ref(`/users/${user.uid}/cartItems/${itemId}`);

            itemRef.once("value", (snapshot) => {
                if (snapshot.exists()) {
                    const currentCount = snapshot.val().count || 0;

                    if (currentCount > 1) {
                        itemRef.update({ count: currentCount - 1 });
                    } else {
                        // Remove the item from Firebase if count is 0
                        itemRef.remove();
                        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
                    }
                }
            });

            // Update local state immediately for UI responsiveness
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, count: Math.max(0, item.count - 1) } : item
                ).filter(item => item.count > 0) // Remove items with count 0
            );
        } catch (error) {
            console.error("Error decreasing count:", error);
        }
    };


    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const count = cartCounts[item.id] || item.count;
            return total + (item.itemPrice * count);
        }, 0);
    };


    const handlePayUsing = () => {
        if (!selectedAddress) {
            Alert.alert("Address Required", "Please select an address before placing the order.");
            return;
        }
        navigation.navigate('ADDPAYMENT', { totalAmount: calculateTotalPrice() });
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

            {cartItems.length > 0 ? (

                <View style={{ flex: 1 }}>

                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={cartItems}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <AddtoCartItem
                                    item={item}
                                    count={item.count}
                                    onIncrease={() => handleIncrease(item.id)}
                                    onDecrease={() => handleDecrease(item.id)}
                                />
                            )}
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

                </View>

            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/icons/Home/emptycart.png')}
                        style={{ width: 150, height: 150, marginBottom: 20 }}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#555' }}>
                        Your cart is empty!
                    </Text>
                    <Text style={{ fontSize: 14, color: '#777', marginTop: 5 }}>
                        Add items to your cart to place an order.
                    </Text>
                </View>
            )}

        </SafeAreaView>
    );
};


export default AddtoCartScreen;

