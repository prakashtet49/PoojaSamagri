import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList, ImageBackground, Animated, StatusBar } from 'react-native';
import { ScrollView, Image } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../../api/ApiManager';

const HomeScreen = () => {
    const { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const flatListRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMenu, setSelectedMenu] = useState('Home');
    const [horizontalData, setHorizontalData] = useState([]);
    const [textIndex, setTextIndex] = useState(0);
    const [scrollAnim] = useState(new Animated.Value(0));
    const textOptions = ['Search for Pooja samagri', 'Find Hawan samagri', 'Look for Items', 'Explore Products'];
    const [selectedId, setSelectedId] = useState(horizontalData[0]);
    const [poojaCategoryData,setPoojaCategoryData] = useState([]);
    const [productCategoryData,setProductCategoryData] = useState([]);

    

    useEffect(() => {
        setSelectedMenu('Home')
    }, [selectedMenu]);


    const handleMenuPress = (id) => {
        setSelectedMenu(id);
        if (id === 'Profile') {
            navigation.navigate('PROFILE');
        }
        if (id === 'Orders') {
            navigation.navigate('MYORDERS');
        }
    };

    const data = [
        { image: require('../../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 1' },
        { image: require('../../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 2' },
        { image: require('../../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 3' },
        { image: require('../../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 4' },
        { image: require('../../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 5' },
        { image: require('../../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 6' }
    ];

    const menuItems = [
        { id: 'Profile', label: ' Profile  ', icon: require('../../../assets/icons/Home/profile.png') },
        { id: 'Home', label: ' Home  ', icon: require('../../../assets/icons/Home/Home.png') },
        { id: 'Orders', label: 'My Orders', icon: require('../../../assets/icons/Home/transactions.png') },
    ];

    const images = [
        require('../../../assets/icons/Home/img2.jpg'),
        require('../../../assets/icons/Home/img3.jpg'),
        require('../../../assets/icons/Home/img1.jpg'),
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1 < images.length ? prevIndex + 1 : 0;
                flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const PoojaTypeItemCard = ({ imageSource, text, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ width: '30%', justifyContent: 'center', alignItems: 'center', margin: 10, flexWrap: 'wrap', }} >
            <View style={{ backgroundColor: Color.primary_blue, borderRadius: 10, padding: 8, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                <Image source={imageSource} style={{ width: "100%", height: 100, resizeMode: 'contain' }} />
            </View>
            <View style={{ width: '100%', marginTop: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: "Roboto-Bold", flexWrap: 'wrap', color: "black", }} numberOfLines={2}>{text}</Text>
            </View>
        </TouchableOpacity>
    );


    const ItemCard = ({ imageSource, text, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ width: '30%', justifyContent: 'center', alignItems: 'center', margin: 10, flexWrap: 'wrap', }} >
            <View style={{ backgroundColor: Color.primary_orange, borderRadius: 10, padding: 8, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                <Image source={imageSource} style={{ width: "100%", height: 100, resizeMode: 'contain' }} />
            </View>
            <View style={{ width: '100%', marginTop: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: "Roboto-Bold", flexWrap: 'wrap', color: "black", }} numberOfLines={2}>{text}</Text>
            </View>
        </TouchableOpacity>
    );


    const handleItemPress = (item) => {
        console.log('Item pressed:', item);
        // You can navigate or do something else with the pressed item
    };

    const handleSearch = () => {
        navigation.navigate("SEARCH");
    };

    const handleAllPoojaTypes = () => {
        navigation.navigate("POOJATYPE");
    };

    const handleAllPoojaCategories = () => {
        navigation.navigate("POOJATYPE");
    };

    const handleAddtoCart = () => {
        navigation.navigate("ADDTOCART");
    };

   
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        Animated.timing(scrollAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        scrollAnim.setValue(0);
    }, [textIndex]);

    const staticImage = require('../../../assets/icons/Home/laxmidevi_pic.png');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('hawan_category.json');
                const transformedData = response.data.map((item, index) => ({
                    id: index.toString(),
                    title: item,
                    image: staticImage,
                }));
                setHorizontalData(transformedData);
            } catch (error) {
                console.log('Error fetching data:', error.message);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('pooja_category.json');
                const transformedData = response.data.map((item, index) => ({
                    id: index.toString(),
                    text: item,
                    image: staticImage,
                }));
                setPoojaCategoryData(transformedData);
            } catch (error) {
                console.log('Error fetching data:', error.message);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('prod_category.json');
             
                const transformedData = Object.keys(response.data).map((key, index) => ({
                    id: index.toString(),
                    text: key,
                    image: staticImage,
                }));
                setProductCategoryData(transformedData);
            } catch (error) {
                console.log('Error fetching data:', error.message);
            }
        };
    
        fetchData();
    }, []);
    

    const numColumns = 2;

    const itemWidth = width / numColumns - 60;
    const itemWidth2 = width / numColumns - 120;

    const renderHorizontalItem = ({ item }) => {
        const isSelected = selectedId === item.id;
        return (
            <TouchableOpacity onPress={() => setSelectedId(item.id)} style={{ marginHorizontal: 10, alignItems: 'center', }}>
                <View style={{ width: itemWidth2, height: itemWidth2, backgroundColor: isSelected ? Color.primary_blue : 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: isSelected ? 1 : 0, borderColor: isSelected ? 'white' : 'transparent', }}>
                    <Image source={item.image} style={{ width: '80%', height: '80%', resizeMode: 'contain' }} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 12, fontFamily: "Roboto-Medium", color: "white", textAlign: 'center', flexWrap: 'wrap', width: itemWidth2 }} numberOfLines={2}>
                    {item.title}
                </Text>
                {isSelected && (
                    <View style={{ marginTop: 5, width: itemWidth / 2, height: 4, backgroundColor: "white", borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 3 }} />
                )}
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="#2C5364" />

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60 }}>
                <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>

                    <ImageBackground source={require('../../../assets/icons/Home/bgcolor.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }} resizeMode="cover">

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

                            {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'orange', opacity: 0.5 }} /> */}

                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>

                                <Image source={require('../../../assets/icons/Home/profile.png')} style={{ width: 35, height: 35, borderRadius: 25, tintColor: "white" }} />

                                <View style={{ marginLeft: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', color: "white" }}>Delivering to</Text>
                                            <Text style={{ fontSize: 12, fontFamily: 'Roboto-Regular', color: "white" }}>123 Main St, City, Country</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => console.log('Image pressed')} style={{ marginLeft: 5 }}>
                                            <Image
                                                source={require('../../../assets/icons/Home/arrow.png')}
                                                style={{ width: 30, height: 30, tintColor: "white" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => handleAddtoCart()} style={{ marginLeft: 10 }}>
                                    <Image
                                        source={require('../../../assets/icons/Home/cart.png')}
                                        style={{ width: 30, height: 30, tintColor: "white" }}
                                    />
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity onPress={() => handleSearch()} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#E7E7E7', borderRadius: 8, marginVertical: 5, marginHorizontal: 10, padding: 12, width: '85%', }}    >

                                <Image source={require('../../../assets/icons/Home/Search.png')} resizeMode="contain" style={{ width: 20, height: 20, marginLeft: 10 }} />
                                <Animated.View style={{ flexDirection: 'row', transform: [{ translateX: scrollAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -200] }) }] }}>
                                    <Text style={{ flex: 1, fontSize: 16, fontFamily: 'Roboto-Regular', color: 'black', marginStart: 15, }}>{textOptions[textIndex]}</Text>
                                </Animated.View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ height: 200, width: '100%', margin: 10, padding: 10, }}>
                            <FlatList
                                ref={flatListRef}
                                data={images}
                                style={{ flex: 1, borderRadius: 10, margin: 10, }}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <Image source={item} style={{ height: '100%', width: Dimensions.get('window').width, resizeMode: 'stretch' }} />
                                )}
                                scrollEnabled={false}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={horizontalData}
                                renderItem={renderHorizontalItem}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                            />
                        </View>

                    </ImageBackground>

                    <View style={{ flex: 1, alignItems: 'center', }}>

                        {/* <ImageBackground source={require('../../../assets/icons/Home/bgcolor.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} resizeMode="cover"> */}

                        <View style={{ flex: 1, backgroundColor: "white", alignItems: 'center', borderBottomRightRadius: 50, borderBottomLeftRadius: 50, shadowColor: "#d9d9d9", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8, }}>

                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5, marginStart: 10, marginEnd: 10, marginTop: 15, padding: 10 }}>
                                <Text style={{ color: Color.primary_black, fontFamily: 'Roboto-Bold', fontSize: 16, marginRight: 4, flex: 1, }}>Explore Pooja Types</Text>
                                <TouchableOpacity onPress={() => handleAllPoojaTypes()} style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Text style={{ color: "darkblue", fontFamily: 'Roboto-Bold', fontSize: 16, }}>view all</Text>
                                    <Image source={require('../../../assets/icons/Home/arrow.png')} resizeMode='contain' style={{ width: 22, height: 22, tintColor: "darkblue", transform: [{ rotate: '270deg' }] }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 15, marginEnd: 15, }}>
                                {poojaCategoryData.slice(0, 3).map((item, index) => (
                                    <PoojaTypeItemCard
                                        key={index}
                                        imageSource={item.image}
                                        text={item.text}
                                        onPress={() => handleItemPress(item.text)}
                                    />
                                ))}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 15, marginEnd: 15, marginBottom: 10, }}>
                                {poojaCategoryData.slice(3).map((item, index) => (
                                    <PoojaTypeItemCard
                                        key={index + 3}
                                        imageSource={item.image}
                                        text={item.text}
                                        onPress={() => handleItemPress(item.text)}
                                    />
                                ))}
                            </View>

                        </View>
                        {/* </ImageBackground> */}

                        <View style={{ flex: 1, alignItems: 'center', borderBottomRightRadius: 50, borderBottomLeftRadius: 50, marginBottom: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5, marginStart: 10, marginEnd: 10, marginTop: 15, padding: 10 }}>
                                <Text style={{ color: Color.primary_black, fontFamily: 'Roboto-Bold', fontSize: 16, marginRight: 4, flex: 1, }}> Explore Pooja Categories  </Text>
                                <TouchableOpacity onPress={() => handleAllPoojaCategories()} style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Text style={{ color: "darkorange", fontFamily: 'Roboto-Bold', fontSize: 16, }}>see all</Text>
                                    <Image source={require('../../../assets/icons/Home/arrow.png')} resizeMode='contain' style={{ width: 22, height: 22, tintColor: "darkorange", transform: [{ rotate: '270deg' }] }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 15, marginEnd: 15, }}>
                                {productCategoryData.slice(0, 3).map((item, index) => (
                                    <ItemCard
                                        key={index}
                                        imageSource={item.image}
                                        text={item.text}
                                        onPress={() => handleItemPress(item.text)}
                                    />
                                ))}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 15, marginEnd: 15, marginBottom: 10, }}>
                                {productCategoryData.slice(3).map((item, index) => (
                                    <ItemCard
                                        key={index + 3}
                                        imageSource={item.image}
                                        text={item.text}
                                        onPress={() => handleItemPress(item.text)}
                                    />
                                ))}
                            </View>
                        </View>

                    </View>

                </SafeAreaView>

            </ScrollView>

            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, borderRadius: 10, margin: 10 }} >
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => handleMenuPress(item.id)}
                        style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: selectedMenu === item.id ? Color.primary_blue : 'transparent', borderRadius: 10, }}  >
                        <Image
                            source={item.icon}
                            style={{ width: 24, height: 24, tintColor: selectedMenu === item.id ? '#007AFF' : '#888', marginBottom: 5, }} />
                        <Text style={{ fontSize: 12, color: selectedMenu === item.id ? '#007AFF' : '#888', fontWeight: selectedMenu === item.id ? 'bold' : 'normal', }}                    >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

        </SafeAreaView>
    );
};

export default HomeScreen;