import React from 'react';
import { View, Animated, Dimensions } from 'react-native';

const OrderHistoryShimmer = () => {
    const animatedValue = new Animated.Value(0);
    const deviceWidth = Dimensions.get('window').width;

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
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderRadius: 8, margin: 10 }}>
            <View style={{ flex: 1 }}>
                {/* Header Section */}
                <View style={{ flexDirection: 'row', backgroundColor: "#E9E6E6", borderBottomColor: "#E5E5E5", padding: 10, borderBottomWidth: 1 }}>
                    <View style={{ flex: 1 }}>
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
                        <View style={{ height: 16, backgroundColor: 'lightgray', borderRadius: 4 }}>
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
                </View>

                <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                {/* Items Section */}
                <View style={{ width: deviceWidth * 0.6, paddingHorizontal: 10 }}>
                    {[1, 2, 3].map((_, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 5 }}>
                            <View style={{ height: 16, backgroundColor: 'lightgray', borderRadius: 4, flex: 1, marginRight: 10 }}>
                                <Animated.View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        opacity,
                                    }}
                                />
                            </View>
                            <View style={{ height: 16, backgroundColor: 'lightgray', borderRadius: 4, flex: 1, marginHorizontal: 10 }}>
                                <Animated.View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        opacity,
                                    }}
                                />
                            </View>
                            <View style={{ height: 16, backgroundColor: 'lightgray', borderRadius: 4, flex: 2 }}>
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
                    ))}
                </View>

                <View style={{ width: deviceWidth * 0.4, alignItems: 'center' }}>
                    <View style={{ height: 16, backgroundColor: 'lightgray', borderRadius: 4, width: 80 }}>
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

                <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                {/* Footer Section */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <View style={{ flexDirection: 'column', maxWidth: deviceWidth * 0.5, paddingHorizontal: 10 }}>
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
                    </View>
                </View>
            </View>
        </View>
    );
};

export default OrderHistoryShimmer; 