import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import PoojaTypeListItem from '../PoojaType/components/PoojaTypeListItem';
import Color from '../../../infrastruture/theme/color';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PoojaTypeListItemShimmer from '../PoojaType/components/PoojaTypeListItemShimmer';

const AntimSanskarScreen = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    const [isCartLoading, setIsCartLoading] = useState(true);

    const productCategoryData = route.params?.categoryData || {};
    const screenName = "Antim Sanskar Samagri";

    const [cartCounts, setCartCounts] = useState({});
    const antimSanskarData = productCategoryData['antim_sanskar_samagri'] || [];

    const navigateBack = () => navigation.goBack();
    const handleSearch = () => navigation.navigate("SEARCH");

    useFocusEffect(
        useCallback(() => {
            const fetchCartData = async () => {
                try {
                    const user = auth().currentUser;
                    if (!user) {
                        console.log("User not logged in");
                        setIsCartLoading(false);
                        return;
                    }

                    const cartRef = database().ref(`/users/${user.uid}/cartItems`);

                    cartRef.once("value", (snapshot) => {
                        if (snapshot.exists()) {
                            const cartData = snapshot.val();
                            const formattedCart = {};

                            Object.keys(cartData).forEach((key) => {
                                formattedCart[key] = cartData[key].count;
                            });

                            setCartCounts(formattedCart);
                        } else {
                            console.log("No cart data found in Firebase");
                            setCartCounts({});
                        }
                        setIsCartLoading(false);
                    });
                } catch (error) {
                    console.log("Error fetching cart data:", error);
                    setIsCartLoading(false);
                }
            };

            fetchCartData();
        }, [])
    );

    useEffect(() => {
        saveCartCounts(cartCounts);
    }, [cartCounts]);

    const saveCartCounts = async (newCounts) => {
        try {
            await AsyncStorage.setItem('cartCounts', JSON.stringify(newCounts));
        } catch (error) {
            console.error("Failed to save cart counts:", error);
        }
    };

    useEffect(() => {
        // Set loading to false only when both data and cart are loaded
        if (antimSanskarData.length > 0 && !isCartLoading) {
            setIsLoading(false);
        }
    }, [antimSanskarData, isCartLoading]);

    const renderItem = ({ item, index }) => {
        if (isLoading || isCartLoading) {
            return <PoojaTypeListItemShimmer />;
        }

        const uniqueKey = `antim_sanskar_samagri_${index}`;
        const count = cartCounts[uniqueKey] || 0;
        return (
            <PoojaTypeListItem
                item={item}
                index={index}
                category="antim_sanskar_samagri"
                count={count}
                onAddToCart={handleAddToCart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />
        );
    };

    const handleAddToCart = async (uniqueKey) => {
        try {
            const user = auth().currentUser;
            if (!user) {
                Alert.alert("Error", "Please login to add items to cart");
                return;
            }

            const cartRef = database().ref(`/users/${user.uid}/cartItems/${uniqueKey}`);
            const lastUnderscoreIndex = uniqueKey.lastIndexOf("_");
            const category = uniqueKey.substring(0, lastUnderscoreIndex);
            const indexStr = uniqueKey.substring(lastUnderscoreIndex + 1);
            const index = parseInt(indexStr, 10);

            if (!productCategoryData[category] || isNaN(index) || !productCategoryData[category][index]) {
                console.warn(`Item not found for key: ${uniqueKey}`);
                return;
            }

            const item = productCategoryData[category][index];

            await cartRef.set({
                itemKey: uniqueKey,
                itemName: item.item_name,
                itemPrice: item.price,
                itemQuantity: item.quantity,
                count: 1,
            });

            setCartCounts(prev => ({ ...prev, [uniqueKey]: 1 }));
        } catch (error) {
            console.error("Error adding to cart:", error);
            Alert.alert("Error", "Failed to add item to cart");
        }
    };

    const handleIncrease = async (uniqueKey) => {
        try {
            const user = auth().currentUser;
            if (!user) {
                Alert.alert("Error", "Please login to modify cart");
                return;
            }

            const newCount = (cartCounts[uniqueKey] || 0) + 1;
            const cartRef = database().ref(`/users/${user.uid}/cartItems/${uniqueKey}`);
            const lastUnderscoreIndex = uniqueKey.lastIndexOf("_");
            const category = uniqueKey.substring(0, lastUnderscoreIndex);
            const indexStr = uniqueKey.substring(lastUnderscoreIndex + 1);
            const index = parseInt(indexStr, 10);

            if (!productCategoryData[category] || isNaN(index) || !productCategoryData[category][index]) {
                console.warn(`Item not found for key: ${uniqueKey}`);
                return;
            }

            const item = productCategoryData[category][index];

            await cartRef.update({
                count: newCount,
            });

            setCartCounts(prev => ({ ...prev, [uniqueKey]: newCount }));
        } catch (error) {
            console.error("Error increasing count:", error);
            Alert.alert("Error", "Failed to update cart");
        }
    };

    const handleDecrease = async (uniqueKey) => {
        try {
            const user = auth().currentUser;
            if (!user) {
                Alert.alert("Error", "Please login to modify cart");
                return;
            }

            const currentCount = cartCounts[uniqueKey] || 0;
            if (currentCount <= 1) {
                const cartRef = database().ref(`/users/${user.uid}/cartItems/${uniqueKey}`);
                await cartRef.remove();
                const updatedCounts = { ...cartCounts };
                delete updatedCounts[uniqueKey];
                setCartCounts(updatedCounts);
            } else {
                const newCount = currentCount - 1;
                const cartRef = database().ref(`/users/${user.uid}/cartItems/${uniqueKey}`);
                await cartRef.update({
                    count: newCount,
                });
                setCartCounts(prev => ({ ...prev, [uniqueKey]: newCount }));
            }
        } catch (error) {
            console.error("Error decreasing count:", error);
            Alert.alert("Error", "Failed to update cart");
        }
    };

    const handleCartClick = async () => {
        navigation.navigate("ADDTOCART");
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

                <FlatList
                    data={isLoading ? Array(5).fill({}) : productCategoryData.antim_sanskar_samagri || []}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id || `shimmer-${index}`}
                    contentContainerStyle={{ padding: 10 }}
                />
            </View>

            {Object.keys(cartCounts).length > 0 && (
                <TouchableOpacity onPress={handleCartClick} style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", alignSelf: 'center', padding: 5, width: "40%", backgroundColor: "white", borderRadius: 30, position: 'absolute', bottom: 20 }}>
                    <View style={{ padding: 5, justifyContent: "flex-start", alignItems: "flex-start", marginStart: 10 }}>
                        <Text style={{ fontSize: 15, color: "black", textAlign: 'center', fontFamily: "Roboto-Bold" }}>View cart</Text>
                        <Text style={{ fontSize: 14, color: "black", textAlign: 'center', fontFamily: "Roboto-Medium" }}>
                            {Object.values(cartCounts).reduce((acc, count) => acc + count, 0)} Items
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#A8A8A8', borderRadius: 20, padding: 2, width: 40, height: 40 }}>
                        <Image source={require('../../../assets/icons/Home/arrow.png')} resizeMode='contain' style={{ width: "100%", height: "100%", tintColor: "white", transform: [{ rotate: '270deg' }] }} />
                    </View>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default AntimSanskarScreen; 