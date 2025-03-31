import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';

const OrderSuccessScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

            const timer = setTimeout(() => {
                navigation.navigate('MYORDERS');
            }, 2000);

            return () => {
                clearTimeout(timer);
                backHandler.remove();
            };
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
                source={require('../../../assets/animations/shots.json')}
                autoPlay
                loop
                style={{ position: 'absolute', width: '100%', height: '100%', }}
            />

            <View style={{ backgroundColor: '#fff', borderRadius: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, alignItems: 'center', justifyContent: 'center', }}>
                <LottieView
                    source={require('../../../assets/animations/correct.json')}
                    autoPlay
                    loop
                    // loop={false} // Play only once if desired
                    style={{ width: 250, height: 250, }}
                />
                <Text style={{ paddingStart: 20, paddingEnd: 20, paddingBottom: 20, fontSize: 18, fontFamily: 'Roboto-Bold', color: "black", textAlign: 'center', }}  >
                    Order Placed Successfully!
                </Text>
            </View>
        </View>

    );
};


export default OrderSuccessScreen;
