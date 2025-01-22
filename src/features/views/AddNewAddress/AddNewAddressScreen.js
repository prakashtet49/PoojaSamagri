import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Image, Alert } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

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


    const handleAddAddress = async () => {
        let missingFields = [];
    
        if (!flatNumber) missingFields.push('Flat/House/Apartment');
        if (!area) missingFields.push('Area');
        if (!townCity) missingFields.push('Town/City');
        if (!state) missingFields.push('State');
        if (!pincode) missingFields.push('Pincode');
    
        if (missingFields.length > 0) {
            Alert.alert(
                'Missing Fields',
                `Please fill in the following fields: ${missingFields.join(', ')}`,
                [{ text: 'OK' }]
            );
            return;
        }
    
        try {
            // Get the authenticated user
            const user = auth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated.');
                return;
            }
    
            const userId = user.uid; // Get the unique user ID
            const address = { flatNumber, area, landmark, townCity, state, pincode };
    
            // Save address to Firebase Realtime Database
            const newAddressRef = database().ref(`/users/${userId}/addresses`).push();
            await newAddressRef.set(address);
    
            Alert.alert(
                'Address Added',
                'Your address has been added successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('HOME')
                    }
                ]
            );
        } catch (error) {
            console.error('Error saving address:', error);
            Alert.alert('Error', 'There was an issue saving the address.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 60, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ddd', }}>
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
                        placeholder="Enter Flat/House/Apartment"
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
                        placeholder="Enter Area/Colony/Street"
                        value={area}
                        onChangeText={setArea}
                    />

                    <Text style={{ color: "black", fontSize: 16, fontFamily: 'Roboto-Medium', marginBottom: 10, }}>
                        Landmark
                    </Text>

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 25, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: 'Roboto-Regular', backgroundColor: "white", }}
                        placeholderTextColor={Color.primary_grey}
                        placeholder="Enter Landmark (optional)"
                        value={landmark}
                        onChangeText={setLandmark}
                    />

                    <Text style={{ color: "black", fontSize: 16, fontFamily: 'Roboto-Medium', marginBottom: 10, }}>
                        Town/City
                    </Text>

                    <TextInput
                        style={{ borderWidth: 1, marginBottom: 25, borderColor: Color.primary_grey, borderRadius: 8, padding: 15, fontSize: 16, color: "black", fontFamily: 'Roboto-Regular', backgroundColor: "white", }}
                        placeholderTextColor={Color.primary_grey}
                        placeholder="Enter Town/City"
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
                                keyboardType="decimal-pad"
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