import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList } from 'react-native';
import { ScrollView, Image } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMenu, setSelectedMenu] = useState('Home');
    const { width } = Dimensions.get('window');
    const navigation = useNavigation();

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

    const carouselData = [
        { id: '1', title: 'Slide 1', image: require('../../assets/icons/Home/laxmidevi_pic.png') },
        { id: '2', title: 'Slide 2', image: require('../../assets/icons/Home/laxmidevi_pic.png') },
        { id: '3', title: 'Slide 3', image: require('../../assets/icons/Home/laxmidevi_pic.png') },
    ];

    const data = [
        { image: require('../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 1' },
        { image: require('../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 2' },
        { image: require('../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 3' },
        { image: require('../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 4' },
        { image: require('../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 5' },
        { image: require('../../assets/icons/Home/laxmidevi_pic.png'), text: 'Laxmi Pooja 6' }
    ];

    const menuItems = [
        { id: 'Profile', label: ' Profile  ', icon: require('../../assets/icons/Home/profile.png') },
        { id: 'Home', label: ' Home  ', icon: require('../../assets/icons/Home/Home.png') },
        { id: 'Orders', label: 'My Orders', icon: require('../../assets/icons/Home/transactions.png') },
    ];

    const handleScroll = (event) => {
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.round(offset / width);
        setCurrentIndex(index);
    };

    const PoojaTypeItemCard = ({ imageSource, text, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ width: '30%', backgroundColor: Color.primary_blue, justifyContent: 'center', borderRadius: 10, margin: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Image source={imageSource} style={{ width: '100%', height: 100, marginBottom: 10 }} resizeMode="contain" />
            <Text style={{ justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>{text}</Text>
        </TouchableOpacity>
    );

    const ItemCard = ({ imageSource, text, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ width: '30%', backgroundColor: Color.primary_orange, justifyContent: 'center', borderRadius: 10, margin: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Image source={imageSource} style={{ width: '100%', height: 100, marginBottom: 10 }} resizeMode="contain" />
            <Text style={{ justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>{text}</Text>
        </TouchableOpacity>
    );


    const handleItemPress = (item) => {
        console.log('Item pressed:', item);
        // You can navigate or do something else with the pressed item
    };

    const handleSearch = () => {
        navigation.navigate('SEARCH');
    };

    return (
        <View style={{ flex: 1 }}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60 }}>
                <SafeAreaView style={{ flex: 1, alignItems: 'center', margin: 10, padding: 10 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <Image
                            source={require('../../assets/icons/Home/profile.png')}
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                        />
                        <View style={{ marginLeft: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}>Delivering to</Text>
                                    <Text style={{ fontSize: 12, fontFamily: 'Roboto-Regular', color: 'gray' }}>123 Main St, City, Country</Text>
                                </View>
                                <TouchableOpacity onPress={() => console.log('Image pressed')} style={{ marginLeft: 5 }}>
                                    <Image
                                        source={require('../../assets/icons/Home/arrow.png')}
                                        style={{ width: 30, height: 30 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => console.log('New Image pressed')} style={{ marginLeft: 10 }}>
                            <Image
                                source={require('../../assets/icons/Home/cart.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => handleSearch()} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#d3d3d3', borderRadius: 5, marginVertical: 20, paddingVertical:10 }}>
                        <Image
                            source={require('../../assets/icons/Home/Search.png')}
                            style={{ width: 20, height: 20, marginRight: 10, marginLeft: 10 }}
                        />
                        <Text style={{ flex: 1, fontSize: 16, fontFamily: 'Roboto-Regular', color: 'black' }}>Search Items</Text>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: Color.primary_grey, justifyContent: 'center', alignItems: 'center', height: 200, borderRadius: 10, overflow: 'hidden' }}>
                        <FlatList
                            data={carouselData}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={item.image} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode='stretch' />
                                </View>
                            )}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            {carouselData.map((_, index) => (
                                <View key={index} style={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 4, marginBottom: 10, backgroundColor: currentIndex === index ? '#000' : '#ccc', }} />
                            ))}
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20, marginHorizontal: 5, }}>
                        <Text style={{ color: Color.primary_black, fontFamily: 'Roboto-Bold', fontSize: 16, marginRight: 4, flex: 1, }}> Explore Pooja Types  </Text>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}>
                            <Text style={{ color: Color.primary_black, fontFamily: 'Roboto-Bold', fontSize: 16, }}>See All</Text>
                            <Image source={require('../../assets/icons/Home/arrow.png')} resizeMode='contain' style={{ width: 25, height: 25, transform: [{ rotate: '270deg' }] }} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {data.slice(0, 3).map((item, index) => (
                            <PoojaTypeItemCard
                                key={index}
                                imageSource={item.image}
                                text={item.text}
                                onPress={() => handleItemPress(item.text)}
                            />
                        ))}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {data.slice(3).map((item, index) => (
                            <PoojaTypeItemCard
                                key={index + 3}
                                imageSource={item.image}
                                text={item.text}
                                onPress={() => handleItemPress(item.text)}
                            />
                        ))}
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20, marginHorizontal: 5, }}>
                        <Text style={{ color: Color.primary_black, fontFamily: 'Roboto-Bold', fontSize: 16, marginRight: 4, flex: 1, }}> Explore Pooja Categories  </Text>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}>
                            <Text style={{ color: Color.primary_black, fontFamily: 'Roboto-Bold', fontSize: 16, }}>See All</Text>
                            <Image source={require('../../assets/icons/Home/arrow.png')} resizeMode='contain' style={{ width: 25, height: 25, transform: [{ rotate: '270deg' }] }} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {data.slice(0, 3).map((item, index) => (
                            <ItemCard
                                key={index}
                                imageSource={item.image}
                                text={item.text}
                                onPress={() => handleItemPress(item.text)}
                            />
                        ))}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {data.slice(3).map((item, index) => (
                            <ItemCard
                                key={index + 3}
                                imageSource={item.image}
                                text={item.text}
                                onPress={() => handleItemPress(item.text)}
                            />
                        ))}
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


        </View>
    );
};

export default HomeScreen;