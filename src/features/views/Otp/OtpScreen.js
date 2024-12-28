import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Color from '../../../infrastruture/theme/color';

const OtpScreen = () => {
    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    };

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const inputRefs = useRef([]);

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

    const handleRetry = () => {
        setOtp(["", "", "", "", ""]);
        setIsButtonEnabled(false);
        inputRefs.current[0]?.focus();
    };

    const handleVerify = () => {
        navigation.navigate('HOME');
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
                            +91 - 9618222222
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30, marginHorizontal: 30, }}                 >
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
                    <TouchableOpacity onPress={() => handleRetry()} style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', alignItems: "center", backgroundColor: "white", borderColor: Color.primary_grey, borderRadius: 10, borderWidth: 1, padding: 15, marginBottom: 30 }}>
                        <Text style={{ color: Color.primary_black, textAlign: 'center', fontSize: 15 }}>
                            {"Retry"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleVerify()} style={{ alignSelf: 'center', alignItems: "center", backgroundColor: "gray", borderRadius: 12, padding: 15, }}>
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
