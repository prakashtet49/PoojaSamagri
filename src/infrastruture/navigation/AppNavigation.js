import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../screens/Splash/SplashScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import LoginScreen from '../../screens/Loginscreen/LoginScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import MyOrdersScreen from '../../screens/MyOrders/MyOrdersScreen';
import OtpScreen from '../../screens/Loginscreen/components/OtpScreen';
import AddNewAddressScreen from '../../screens/AddNewAddress/AddNewAddressScreen';
import AddPaymentScreen from '../../screens/Payments/AddPaymentScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            // Simulate a splash screen delay and check login status
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Here you would check the login status from async storage or an API
            setLoading(false);
            setLoggedIn(false); // Change this based on actual login status
        };

        initializeApp();
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {/* <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={loggedIn ? "HOME" : "HOME"}> */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LOGIN" component={LoginScreen} />
                <Stack.Screen name="HOME" component={HomeScreen} />
                <Stack.Screen name="OTP" component={OtpScreen} />
                <Stack.Screen name="PROFILE" component={ProfileScreen} />
                <Stack.Screen name="MYORDERS" component={MyOrdersScreen} />
                <Stack.Screen name="ADDADDRESS" component={AddNewAddressScreen} />
                <Stack.Screen name="ADDPAYMENT" component={AddPaymentScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;