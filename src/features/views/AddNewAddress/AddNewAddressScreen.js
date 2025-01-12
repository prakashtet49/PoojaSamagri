import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Image, Alert } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';

const AddNewAddressScreen = () => {
    const navigation = useNavigation();


    const [flatNumber, setFlatNumber] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [townCity, setTownCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');


    const navigateBack = () => {
        navigation.goBack();
    };

    const handleAddAddress = () => {
        Alert.alert(
            'Address Added', 
            'Your address has been added successfully!',
            [
                {
                    text: 'OK', 
                    onPress: () => navigation.navigate("HOME")
                }
            ]
        );
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 60, backgroundColor: '#f5f5f5', borderBottomWidth: 1, borderBottomColor: '#ddd', }}>
                <TouchableOpacity onPress={() => navigateBack()} style={{ flex: 1 }}>
                    <Text>
                        <Image
                            source={require('../../../assets/icons/Home/Left.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', textAlign: 'center', }}>Add New Address</Text>
                <View style={{ flex: 1 }} />
            </View>

            <ScrollView style={{ flex: 1 }}>

                <View style={{ padding: 15, margin: 15 }}>
                    <Text style={{ color: "black", fontSize: 16, fontFamily: 'Roboto-Medium', marginBottom: 10, }}>
                        Flat/House/Apartment Number
                    </Text>

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 25, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: 'Roboto-Regular', backgroundColor: "white", }}
                        // placeholder="Enter Flat/House/Apartment"
                        value={flatNumber}
                        onChangeText={setFlatNumber}
                        placeholderTextColor={Color.primary_grey}
                    />

                    <Text style={{ color: "black", fontSize: 16, fontFamily: 'Roboto-Medium', marginBottom: 10, }}>
                        Area/Colony/Street
                    </Text>

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 25, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: 'Roboto-Regular', backgroundColor: "white", }}
                        placeholderTextColor={Color.primary_grey}
                        value={area}
                        onChangeText={setArea}
                    />

                    <Text style={{ color: "black", fontSize: 16, fontFamily: 'Roboto-Medium', marginBottom: 10, }}>
                        Landmark
                    </Text>

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 25, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: 'Roboto-Regular', backgroundColor: "white", }}
                        placeholderTextColor={Color.primary_grey}
                        value={landmark}
                        onChangeText={setLandmark}
                    />

                    <Text style={{ color: "black", fontSize: 16, fontFamily: 'Roboto-Medium', marginBottom: 10, }}>
                        Town/City
                    </Text>

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 25, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: 'Roboto-Regular', backgroundColor: "white", }}
                        placeholderTextColor={Color.primary_grey}
                        value={townCity}
                        onChangeText={setTownCity}
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Text style={{ color: "black", fontSize: 16, fontFamily: "Roboto-Medium", marginBottom: 10 }}>
                                State
                            </Text>
                            <TextInput style={{ borderWidth: 1, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: "Roboto-Regular", backgroundColor: "white", }}
                                placeholder="Enter State"
                                placeholderTextColor={Color.primary_grey}
                                value={state}
                                onChangeText={setState}
                            />
                        </View>

                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ color: "black", fontSize: 16, fontFamily: "Roboto-Medium", marginBottom: 10 }}>
                                Pincode
                            </Text>
                            <TextInput style={{ borderWidth: 1, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: "Roboto-Regular", backgroundColor: "white", }}
                                placeholder="Enter Pincode"
                                placeholderTextColor={Color.primary_grey}
                                value={pincode}
                                onChangeText={setPincode}
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => handleAddAddress()} style={{ alignSelf: 'center', alignItems: "center", backgroundColor: Color.orange, borderRadius: 12, padding: 15, }}>
                        <Text style={{ color: "white", fontFamily: 'Roboto-Bold', fontSize: 16, marginStart: 40, marginEnd: 40 }}>
                            {"Add Address"}
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};



export default AddNewAddressScreen;