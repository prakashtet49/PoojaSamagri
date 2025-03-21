import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import PoojaTypeListItem from '../PoojaType/components/PoojaTypeListItem';
import Color from '../../../infrastruture/theme/color';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PoojaCategoryScreen = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const route = useRoute();

    const productCategoryData = route.params?.categoryData || {};
    const screenName = route.params?.screenName || "Select Items";
    const selectedCategoryId = route.params?.selectedCategory || 0;

    const [cartCounts, setCartCounts] = useState({});
    const categoryKeys = Object.keys(productCategoryData);
    const [selectedIndex, setSelectedIndex] = useState(categoryKeys[selectedCategoryId] || categoryKeys[0]);

    const navigateBack = () => navigation.goBack();
    const handleSearch = () => navigation.navigate("SEARCH");

    const numColumns = 2;
    const itemWidth = width / numColumns - 60;
    const itemWidth2 = width / numColumns - 120;

    const staticImage = require('../../../assets/icons/Home/laxmidevi_pic.png');
    const staticPoojaCategory = [
        require('../../../assets/icons/Home/antim_sansakar_samagri.jpg'),
        require('../../../assets/icons/PoojaCategory/bartan_samagri.jpg'),
        require('../../../assets/icons/PoojaCategory/frame_n_murti.jpg'),
        require('../../../assets/icons/PoojaCategory/gems_n_yantra.jpg'),
        require('../../../assets/icons/PoojaCategory/hawan_samagri.jpg'),
        require('../../../assets/icons/PoojaCategory/aasan_samagri.jpg'),
    ];

    const transformedData = categoryKeys.map((key, index) => ({
        id: key,
        text: key.replace(/_/g, ' '),
        image: staticPoojaCategory[index] || staticPoojaCategory[0],
    }));

    const selectedCategoryData = productCategoryData[selectedIndex] || [];

    const handleCategoryPress = (id) => setSelectedIndex(id);

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
                            const formattedCart = {};

                            Object.keys(cartData).forEach((key) => {
                                formattedCart[key] = cartData[key].count;
                            });

                            setCartCounts(formattedCart);
                        } else {
                            console.log("No cart data found in Firebase");
                            setCartCounts({});
                        }
                    });
                } catch (error) {
                    console.log("Error fetching cart data:", error);
                }
            };

            fetchCartData();
        }, [])
    );

    const saveCartData = async (uniqueKey, updatedCounts) => {
        try {
            const user = auth().currentUser;
            if (!user) {
                console.log("User not logged in");
                return;
            }

            const cartRef = database().ref(`/users/${user.uid}/cartItems/${uniqueKey}`);
            const newCount = updatedCounts[uniqueKey] || 0;

            const lastUnderscoreIndex = uniqueKey.lastIndexOf("_");
            const category = uniqueKey.substring(0, lastUnderscoreIndex);
            const indexStr = uniqueKey.substring(lastUnderscoreIndex + 1);
            const index = parseInt(indexStr, 10);

            if (!productCategoryData[category] || isNaN(index) || !productCategoryData[category][index]) {
                console.warn(`Item not found for key: ${uniqueKey}`);
                return;
            }

            const item = productCategoryData[category][index];

            if (newCount <= 0) {
                await cartRef.remove();
                console.log(`Item ${uniqueKey} removed from cart.`);
            } else {
                await cartRef.set({
                    itemKey: uniqueKey,
                    itemName: item.item_name,
                    itemPrice: item.price,
                    itemQuantity: item.quantity,
                    count: newCount,
                });
                console.log(`Cart updated: ${uniqueKey} = ${newCount}`);
            }
        } catch (error) {
            console.log("Error saving cart data:", error);
        }
    };

    const handleAddToCart = (uniqueKey) => {
        setCartCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts, [uniqueKey]: 1 };
            saveCartData(uniqueKey, updatedCounts);
            return updatedCounts;
        });
    };

    const handleIncrease = (uniqueKey) => {
        setCartCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts, [uniqueKey]: (prevCounts[uniqueKey] || 0) + 1 };
            saveCartData(uniqueKey, updatedCounts);
            return updatedCounts;
        });
    };

    const handleDecrease = (uniqueKey) => {
        setCartCounts((prevCounts) => {
            const newCount = (prevCounts[uniqueKey] || 0) - 1;
            if (newCount <= 0) {
                const updatedCounts = { ...prevCounts };
                delete updatedCounts[uniqueKey];
                saveCartData(uniqueKey, updatedCounts);
                return updatedCounts;
            }
            const updatedCounts = { ...prevCounts, [uniqueKey]: newCount };
            saveCartData(uniqueKey, updatedCounts);
            return updatedCounts;
        });
    };

    const renderHorizontalItem = ({ item }) => {
        const isSelected = selectedIndex === item.id;
        return (
            <TouchableOpacity onPress={() => handleCategoryPress(item.id)} style={{ marginHorizontal: 5, alignItems: 'center' }}>
                <View style={{ width: itemWidth2, height: itemWidth2, backgroundColor: isSelected ? Color.primary_blue : 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: isSelected ? 2 : 0, borderColor: isSelected ? 'white' : 'transparent' }}>
                    <Image source={item.image} style={{ width: '80%', height: '80%', resizeMode: 'contain' }} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 10, fontFamily: "Roboto-Medium", color: 'black', textAlign: 'center', width: itemWidth2 }} numberOfLines={2}>
                    {item.text}
                </Text>
                {isSelected && <View style={{ marginTop: 5, width: itemWidth / 2, height: 4, backgroundColor: "darkblue", borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 3 }} />}
            </TouchableOpacity>
        );
    };

    const handleCartClick = async () => {
        navigation.navigate("ADDTOCART");
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, height: 60, borderBottomWidth: 1, borderBottomColor: "gray" }}>
                    <TouchableOpacity onPress={navigateBack} style={{ marginRight: 25 }}>
                        <Image resizeMode='contain' source={require('../../../assets/icons/Home/Left.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold' }}>{screenName}</Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={handleSearch} style={{ borderRadius: 20, padding: 5 }}>
                        <Image resizeMode="contain" source={require('../../../assets/icons/Home/Search.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={transformedData}
                        renderItem={renderHorizontalItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
                    />
                    <View style={{ flex: 1, borderBottomColor: "gray", borderBottomWidth: 1 }} />
                </View>

                <FlatList
                    data={selectedCategoryData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <PoojaTypeListItem
                            item={item}
                            index={index}
                            category={selectedIndex}
                            count={cartCounts[`${selectedIndex}_${index}`] || 0}
                            onAddToCart={handleAddToCart}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                        />
                    )}
                    contentContainerStyle={{ padding: 10 }}
                />

                {Object.values(cartCounts).reduce((acc, count) => acc + count, 0) > 0 && (
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

            </View>

        </SafeAreaView>
    );
};


export default PoojaCategoryScreen;
