import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../features/views/Splash/SplashScreen';
import HomeScreen from '../../features/views/Home/HomeScreen';
import ProfileScreen from '../../features/views/Profile/ProfileScreen';
import MyOrdersScreen from '../../features/views/MyOrders/MyOrdersScreen';
import OtpScreen from '../../features/views/Otp/OtpScreen';
import AddNewAddressScreen from '../../features/views/AddNewAddress/AddNewAddressScreen';
import AddPaymentScreen from '../../features/views/Payments/AddPaymentScreen';
import SearchScreen from '../../features/views/Search/SearchScreen';
import LoginScreen from '../../features/views/Login/LoginScreen';
import PoojaTypeScreen from '../../features/views/PoojaType/PoojaTypeScreen';
import PoojaCategoryScreen from '../../features/views/PoojaCategory/PoojaCategoryScreen';
import AddtoCartScreen from '../../features/views/Cart/AddtoCartScreen';

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
                <Stack.Screen name="HOME" component={HomeScreen} />
                <Stack.Screen name="LOGIN" component={LoginScreen} />
                <Stack.Screen name="OTP" component={OtpScreen} />
                <Stack.Screen name="PROFILE" component={ProfileScreen} />
                <Stack.Screen name="ADDTOCART" component={AddtoCartScreen} />
                <Stack.Screen name="SEARCH" component={SearchScreen} />
                <Stack.Screen name="MYORDERS" component={MyOrdersScreen} />
                <Stack.Screen name="ADDADDRESS" component={AddNewAddressScreen} />
                <Stack.Screen name="ADDPAYMENT" component={AddPaymentScreen} />
                <Stack.Screen name="POOJATYPE" component={PoojaTypeScreen} />
                <Stack.Screen name="POOJACATEGORY" component={PoojaCategoryScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;