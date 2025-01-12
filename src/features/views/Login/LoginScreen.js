import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Color from "../../../infrastruture/theme/color";
import auth from '@react-native-firebase/auth';


const LoginScreen = () => {

    const navigation = useNavigation();

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    
    // const handleContinue = async () => {
    //     const mobileNumber = '+91' + phoneNumber; 
    //     try {
    //         const confirmation = await auth().signInWithPhoneNumber(mobileNumber);
    //         navigation.navigate('OTP', { confirmation });
    //     } catch (error) {
    //         console.log('Error sending OTP: ', error.message);
    //         Alert.alert('Error', 'Failed to send OTP. Please try again.');
    //     }
    // };

    const handleContinue = async () => {
        
        if (!/^\d{10}$/.test(phoneNumber)) {
            Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
            return;
        }

        try {
            // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            // Alert.alert("OTP Sent", `An OTP has been sent to ${phoneNumber}`);
            navigation.navigate("OTP", { phoneNumber });
        } catch (error) {
            console.error("Failed to send OTP:", error.message);
            Alert.alert("Error", "Failed to send OTP. Please try again.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    {!isKeyboardVisible && (
                        <Image
                            source={require("../../../assets/icons/Home/laxmidevi_pic.png")}
                            resizeMode="contain"
                            style={{ alignSelf: 'center', height: 250, marginTop: 40 }}
                        />
                    )}
                    <View style={{ backgroundColor: "white", borderColor: Color.primary_grey, borderRadius: 8, borderWidth: 1, paddingTop: 25, paddingBottom: 25, margin: 20, marginTop: isKeyboardVisible ? 40 : 40, }}>
                        <Text style={{ color: "black", fontSize: 15, fontFamily: 'Roboto-Medium', marginBottom: 25, marginLeft: 25, }}   >
                            {"Let’s Get Started"}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", borderColor: Color.primary_grey, borderRadius: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 16, marginHorizontal: 16, }}>
                            <Text style={{ color: "black", fontFamily: 'Roboto-Bold', fontSize: 15, marginRight: 15 }}>{"+91"}</Text>
                            <View style={{ width: 1, height: 36, backgroundColor: Color.primary_grey, marginRight: 20 }}></View>
                            <TextInput
                                style={{ color: "black", fontSize: 16, flex: 1, fontFamily: 'Roboto-Bold' }}
                                placeholder="Enter mobile number"
                                placeholderTextColor={Color.primary_grey}
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>
                        <Text style={{ flex: 1, textAlign: "center", color: "black", fontFamily: "Roboto-Medium", fontSize: 15, marginBottom: 15, }}>{"OR"}</Text>
                        <View style={{ alignItems: "center", borderColor: Color.primary_grey, borderRadius: 12, borderWidth: 1, padding: 8, marginBottom: 25, alignSelf: "center", }}>
                            <Image
                                source={require("../../../assets/icons/Home/google.png")}
                                resizeMode="contain"
                                style={{ height: 25, width: 25 }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => handleContinue()}
                            style={{ alignSelf: 'center', alignItems: "center", backgroundColor: Color.orange, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 60, marginBottom: 15, }} >
                            <Text style={{ color: "white", fontFamily: "Roboto-Medium", fontSize: 18 }}>{"CONTINUE"}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: "black", fontFamily: "Roboto-Light", fontSize: 10, textAlign: 'center' }}>
                            {"by signing up you agree to Terms and privacy policy"}
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen;
