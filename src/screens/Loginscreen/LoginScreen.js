import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput } from "react-native";

const LoginScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF", marginTop: 44 }}>
                <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/34ac1b1f-2e3c-43ff-a8d8-ac0d411c68b0" }} resizeMode={"stretch"} style={{ height: 236, marginBottom: 99, marginHorizontal: 74 }} />
                <View style={{ backgroundColor: "#FFFFFF", borderColor: "#CDCCCC", borderRadius: 8, borderWidth: 1, paddingTop: 29, paddingBottom: 66, marginHorizontal: 24 }}>
                    <Text style={{ color: "#000000", fontSize: 15, marginBottom: 26, marginLeft: 25 }}>{"Let’s Get Started"}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#C6C6C6", borderRadius: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 16, marginHorizontal: 16 }}>
                        <Text style={{ color: "#7E7E7E", fontSize: 15, marginRight: 15 }}>{"+91"}</Text>
                        <View style={{ width: 1, height: 36, backgroundColor: "#B0B0B0", marginRight: 19 }}></View>
                        <TextInput
                            style={{ color: "#000000", fontSize: 15, flex: 1, fontWeight: "bold" }}
                            placeholder="Enter mobile number"
                            placeholderTextColor="#7A7A7A"
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </View>
                    <Text style={{ color: "#000000", fontSize: 15, marginBottom: 15, marginLeft: 161 }}>{"OR"}</Text>
                    <View style={{ alignItems: "center", borderColor: "#B4B3B3", borderRadius: 12, borderWidth: 1, padding: 8, marginBottom: 25, alignSelf: "center" }}>
                        <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/203ac17c-98e4-472b-8e68-3c7eccc69cb6" }} resizeMode={"contain"} style={{ height: 25, width: 25 }} />
                    </View>
                    <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#FFB617", borderColor: "#F1F0F0", borderRadius: 12, borderWidth: 1, paddingVertical: 15, marginBottom: 15, marginHorizontal: 49 }} onPress={() => alert('Pressed!')}>
                        <Text style={{ color: "#FFFFFF", fontSize: 20 }}>{"CONTINUE"}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "#000000", fontSize: 10, marginHorizontal: 67 }}>{"by signing up you agree to Terms and privacy policy"}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen;
