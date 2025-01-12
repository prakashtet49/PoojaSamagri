import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import auth from '@react-native-firebase/auth';


const OtpScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const navigateBack = () => {
        navigation.goBack();
    };

    const phoneNumber = route.params?.phoneNumber || "your number";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const inputRefs = useRef([]);
    const [retryDisabled, setRetryDisabled] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [retryTimer, setRetryTimer] = useState(30);

    useEffect(() => {
        sendOtp();
    }, []);


    const handleInputChange = (text, index) => {
        const newOtp = [...otp];
        if (/^\d?$/.test(text)) {
            newOtp[index] = text;
            setOtp(newOtp);

            // Move to next input if not the last one
            if (text && index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }

            // Check if all inputs are filled with numbers
            setIsButtonEnabled(newOtp.every((value) => value.match(/^\d$/)));
        }
    };

    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const sendOtp = async () => {
        try {
            const formattedPhoneNumber = `+91${phoneNumber.replace(/^(\+91)?/, '')}`;
            const confirmationResult = await auth().signInWithPhoneNumber(formattedPhoneNumber);
            setConfirmation(confirmationResult);
            console.log("OTP sent to:", formattedPhoneNumber);
            startRetryTimer();
        } catch (error) {
            console.error("Failed to send OTP:", error.message);
            Alert.alert("Error", "Failed to send OTP. Please try again.");
        }
    };

    // Verify OTP using Firebase
    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join(""); // Combine OTP from input fields
      
        if (enteredOtp.length === otp.length) {  // Ensure all OTP fields are filled
          try {
            // Verify the OTP entered by the user
            if (confirmation) {
              await confirmation.confirm(enteredOtp);  // Firebase OTP confirmation
              Alert.alert("Success", "OTP verified successfully!");
              navigation.navigate('HOME');
            }
          } catch (error) {
            console.error("Invalid OTP:", error.message);
            Alert.alert("Failure", "Invalid OTP. Please try again.");
          }
        } else {
          Alert.alert("Error", "Please enter the complete OTP.");
        }
      };

    // Start the retry timer
    const startRetryTimer = () => {
        setRetryDisabled(true);
        setRetryTimer(30);

        const interval = setInterval(() => {
            setRetryTimer((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    setRetryDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleRetry = () => {
        setOtp(["", "", "", "", ""]);
        setIsButtonEnabled(false);
        inputRefs.current[0]?.focus();
        sendOtp();
    };


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigateBack()} style={{ flex: 1, marginTop: 40, paddingHorizontal: 30 }}>
                        <Image
                            source={require('../../../assets/icons/Home/Left.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>

                    <Text style={{ textAlign: 'center', color: "black", fontFamily: 'Roboto-Bold', fontSize: 20, marginTop: 40 }}>
                        OTP Verification
                    </Text>

                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 30, marginBottom: 40 }}>
                        <Text style={{ flex: 1, textAlign: 'center', color: "black", fontSize: 14, fontFamily: 'Roboto-Light' }}>
                            We have sent a verification code to
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'center', color: "black", fontSize: 14, fontFamily: 'Roboto-Bold' }}>
                            {phoneNumber}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, marginHorizontal: 15, }}                 >
                        {otp.map((value, index) => (
                            <TextInput
                                key={index}
                                value={value}
                                onChangeText={(text) => handleInputChange(text, index)}
                                onKeyPress={(event) => handleKeyPress(event, index)}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={{ width: 60, height: 60, backgroundColor: "white", borderColor: Color.primary_grey, borderRadius: 10, borderWidth: 1, textAlign: "center", fontSize: 18, fontFamily: "Roboto-Bold" }}
                                maxLength={1}
                                keyboardType="numeric" />
                        ))}
                    </View>
                    <Text style={{ color: "black", fontSize: 14, fontFamily: "Roboto-Medium", marginBottom: 20, textAlign: 'center' }}>
                        {"Didn’t receive the OTP?"}
                    </Text>
                    <TouchableOpacity onPress={() => handleRetry()} disabled={retryDisabled} style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', alignItems: "center", backgroundColor: "white", borderColor: Color.primary_grey, borderRadius: 10, borderWidth: 1, padding: 15, marginBottom: 30 }}>
                        <Text style={{ color: retryDisabled ? "darkgray" : "black", textAlign: 'center', fontSize: 15 }}>
                            Retry {retryDisabled ? `(${retryTimer}s)` : ""}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleVerifyOtp()} disabled={!isButtonEnabled} style={{ alignSelf: 'center', alignItems: "center", backgroundColor: "gray", borderRadius: 12, padding: 15, }}>
                        <Text style={{ color: "white", fontFamily: 'Roboto-Bold', fontSize: 16, marginStart: 40, marginEnd: 40 }}>
                            {"Verify and Proceed"}
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OtpScreen;
