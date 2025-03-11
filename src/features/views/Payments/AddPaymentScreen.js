import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import { v4 as uuidv4 } from 'uuid';

const AddPaymentScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const totalAmount = route.params.totalAmount;

    console.log("totalAount", totalAmount);

    const navigateBack = () => {
        navigation.goBack();
    };

    const handlePayment = () => {
        navigation.navigate('ORDERSUCCESS');
    };

    const UPI_PAYMENT_OPTIONS = {
        phonepe: 'com.phonepe.app',
        googlePay: 'com.google.android.apps.nbu.paisa.user',
        paytm: 'net.one97.paytm',
      };
      
      const initiateUpiPayment = async (appName) => {
        // alert('initiateUpiPayment called for ' + appName);
        console.log('initiateUpiPayment called for', appName);

        const upiId = 'upendar.nani1@axl';  // Replace with your actual UPI ID
        const amount = '100';
        const transactionId = uuidv4();
        const transactionRefId = 'TXN_' + transactionId;
      
        const upiUrl = `upi://pay?pa=${upiId}&pn=Test User&tn=Payment&am=${amount}&cu=INR&tr=${transactionId}&tid=${transactionRefId}`;
        const packageName = UPI_PAYMENT_OPTIONS[appName];
        const appUrl = packageName ? `${upiUrl}&pn=${encodeURIComponent('Test User')}&package=${packageName}` : upiUrl;
      
        console.log('UPI URL:', appUrl);
        console.log('Package Name:', packageName);
      
        try {
          const isSupported = await Linking.canOpenURL(appUrl);
          console.log('Can Open URL:', isSupported);
          if (isSupported) {
            Linking.openURL(appUrl)
              .then(() => console.log('Payment Request Sent'))
              .catch((error) => {
                console.log('Open URL Error:', error);
                Alert.alert('Payment Error', 'Failed to open UPI app.');
              });
          } else {
            Alert.alert(`${appName} is not installed on your device.`);
          }
        } catch (error) {
          console.log('Catch Error:', error);
          Alert.alert('Payment Error', 'Unable to initiate UPI payment.');
        }
      };
      

    // const handlePaymentPhonepe = (paymentMethod) => {
    //     const amount = 100; // Change this to your required amount
    //     const upiId = "upendar.nani1@axl"; // Replace with your UPI ID
    //     const transactionId = `TXN${Date.now()}`; // Unique transaction ID
    //     const merchantName = "upendar reddy"; // Change to your merchant name
    //     const note = "testing"; // Add a note for the transaction
    
    //     // let upiUri = `upi://pay?pa=${upiId}&pn=${merchantName}&mc=&tid=${transactionId}&tr=${transactionId}&tn=${note}&am=${amount}&cu=INR`;
    
    //     // if (paymentMethod === 'phonepe') {
    //     //     upiUri = `phonepe://upi/pay?pa=${upiId}&pn=${merchantName}&mc=&tid=${transactionId}&tr=${transactionId}&tn=${note}&am=${amount}&cu=INR`;
    //     // }

    //     let upiUri = `upi://pay?pa=${upiId}&pn=${merchantName}&tid=${transactionId}&tr=${transactionId}&tn=${note}&am=${amount}&cu=INR`;

    //     // Modify URI for different payment methods
    //     switch (paymentMethod) {
    //         case 'phonepe':
    //             upiUri = `phonepe://upi/pay?pa=${upiId}&pn=${merchantName}&tid=${transactionId}&tr=${transactionId}&tn=${note}&am=${amount}&cu=INR`;
    //             break;
    //         case 'google-pay':
    //             upiUri = `tez://upi/pay?pa=${upiId}&pn=${merchantName}&tid=${transactionId}&tr=${transactionId}&tn=${note}&am=${amount}&cu=INR`;
    //             break;
    //         case 'paytm':
    //             upiUri = `paytm://upi/pay?pa=${upiId}&pn=${merchantName}&tid=${transactionId}&tr=${transactionId}&tn=${note}&am=${amount}&cu=INR`;
    //             break;
    //     }
    
    //     Linking.openURL(upiUri)
    //         .catch(() => {
    //             Alert.alert(
    //                 "Error",
    //                 "PhonePe app is not installed. Please install PhonePe and try again."
    //             );
    //         });
    // };
    


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
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', textAlign: 'center', }}>Bill Total: ₹{totalAmount}</Text>
                <View style={{ flex: 1 }} />
            </View>

            <ScrollView style={{ flex: 1 }}>


                <Text style={{ marginStart: 15, paddingHorizontal: 10, marginTop: 15, fontFamily: "Roboto-Medium", fontSize: 15 }}>Pay Via UPI</Text>
                <View style={{ justifyContent: "center", borderWidth: 1, borderColor: Color.primary_grey, borderRadius: 12, padding: 10, margin: 15 }}>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10 }}
                        onPress={() => initiateUpiPayment('googlePay')}>
                        <Image source={require('../../../assets/icons/payments/google-pay.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Medium', color: '#333', }}>Google Pay</Text>
                        <Image source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10, }} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10 }}
                        onPress={() => {
                            console.log('PhonePe Button Pressed');
                            initiateUpiPayment('phonepe')}}>
                        <Image source={require('../../../assets/icons/payments/phonepe.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Medium', color: '#333', }}>Phonepe</Text>
                        <Image source={require('../../../assets/icons/Profile/Forward.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10, }} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10 }}
                        onPress={() => initiateUpiPayment('paytm')}>
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