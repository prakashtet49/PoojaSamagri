import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Color from '../../../infrastruture/theme/color';

const AddPaymentScreen = () => {

    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    };

    const handlePayment = () => { 
        navigation.navigate('ORDERSUCCESS');
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
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', textAlign: 'center', }}>Bill Total: ₹300.34</Text>
                <View style={{ flex: 1 }} />
            </View>

            <ScrollView style={{ flex: 1 }}>


                <Text style={{ marginStart: 15, paddingHorizontal: 10, marginTop: 15, fontFamily: "Roboto-Medium", fontSize: 15 }}>Pay Via UPI</Text>
                <View style={{ justifyContent: "center", borderWidth: 1, borderColor: Color.primary_grey, borderRadius: 12, padding: 10, margin: 15 }}>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10 }}
                        onPress={() => handlePayment()}>
                        <Image source={require('../../../assets/icons/payments/google-pay.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Medium', color: '#333', }}>Google Pay</Text>
                        <Image source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10, }} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10 }}
                        onPress={() => handlePayment()}>
                        <Image source={require('../../../assets/icons/payments/phonepe.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Medium', color: '#333', }}>Phonepe</Text>
                        <Image source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10, }} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10 }}
                        onPress={() => handlePayment()}>
                        <Image source={require('../../../assets/icons/payments/paytm.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Medium', color: '#333', }}>Paytm</Text>
                        <Image source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                </View>

                <Text style={{ marginStart: 15, paddingHorizontal: 10, marginTop: 15, fontFamily: "Roboto-Medium", fontSize: 15 }}>Pay Via COD</Text>
                <View style={{ justifyContent: "center", borderWidth: 1, borderColor: Color.primary_grey, borderRadius: 12, padding: 10, margin: 15 }}>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10 }}
                        onPress={() => handlePayment()}>
                        <Image source={require('../../../assets/icons/payments/money.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Medium', color: '#333', }}>Cash on Delivery</Text>
                        <Image source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>


    );
};


export default AddPaymentScreen;