import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 2,
            tension: 1,
            useNativeDriver: true,
        }).start();
    }, [scaleValue]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/34ac1b1f-2e3c-43ff-a8d8-ac0d411c68b0" }}
                style={[styles.image, { transform: [{ scale: scaleValue }] }]}
            />
        </View>
    );
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