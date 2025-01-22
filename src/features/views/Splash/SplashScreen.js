import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = () => {
    const scaleValue = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // To avoid premature navigation

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((authenticatedUser) => {
            console.log("User is logged in:", authenticatedUser); 

            if (authenticatedUser) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "HOME" }], // Reset stack and navigate to Home
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "LOGIN" }], // Reset stack and navigate to Login
                });
            }
            setIsCheckingAuth(false); // Stop checking authentication
        });

        return () => subscriber(); // Cleanup listener on unmount
    }, [navigation]);

    useEffect(() => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 2,
            tension: 1,
            useNativeDriver: true,
        }).start();
    }, [scaleValue]);

    if (isCheckingAuth) {

        return (
            <View style={styles.container}>
                <Animated.Image
                    source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/34ac1b1f-2e3c-43ff-a8d8-ac0d411c68b0" }}
                    style={[styles.image, { transform: [{ scale: scaleValue }] }]}
                />
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default SplashScreen;