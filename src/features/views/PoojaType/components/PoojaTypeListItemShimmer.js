import React from 'react';
import { View, Animated } from 'react-native';

const PoojaTypeListItemShimmer = () => {
    const animatedValue = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 0.7, 0.3],
    });

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:'transparent', padding: 10, borderRadius: 8, marginBottom: 10, position: 'relative' }}>
            {/* Image Shimmer */}
            <View style={{ width: 60, height: 60, borderRadius: 5, marginRight: 10, backgroundColor: 'lightgray' }}>
                <Animated.View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        opacity,
                    }}
                />
            </View>

            {/* Content Shimmer */}
            <View style={{ flex: 1 }}>
                {/* Title Shimmer */}
                <View style={{ height: 20, backgroundColor: 'lightgray', borderRadius: 4, marginBottom: 8 }}>
                    <Animated.View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            opacity,
                        }}
                    />
                </View>

                {/* Quantity Shimmer */}
                <View style={{ height: 16, backgroundColor: 'lightgray', borderRadius: 4, marginBottom: 8 }}>
                    <Animated.View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            opacity,
                        }}
                    />
                </View>

                {/* Price Shimmer */}
                <View style={{ height: 20, backgroundColor: 'lightgray', borderRadius: 4 }}>
                    <Animated.View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            opacity,
                        }}
                    />
                </View>
            </View>

            {/* Add to Cart Button Shimmer */}
            <View style={{ width: 120, height: 36, backgroundColor: 'lightgray', borderRadius: 5 }}>
                <Animated.View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        opacity,
                    }}
                />
            </View>
        </View>
    );
};

export default PoojaTypeListItemShimmer; 