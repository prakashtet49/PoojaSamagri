import { FlatList, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Color from '../../../../infrastruture/theme/color';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const AddAddressSheet = ({ visible, close }) => {

    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);

    const handleAddNewAddress = () => {
        navigation.navigate("ADDADDRESS");
    }

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const user = auth().currentUser;
                if (!user) {
                    Alert.alert('Error', 'User not authenticated.');
                    return;
                }

                const userId = user.uid;
                const addressesRef = database().ref(`/users/${userId}/addresses`);

                addressesRef.once('value', snapshot => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const addressList = Object.keys(data).map(key => data[key]);
                        setAddresses(addressList);
                    } else {
                        setAddresses([]);
                    }
                });
            } catch (error) {
                console.error('Error fetching addresses:', error);
                Alert.alert('Error', 'There was an issue fetching the addresses.');
            }
        };

        fetchAddresses();
    }, []);

    const addressItem = ({ item }) => (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flexWrap: "wrap",}}>
            <Image resizeMode='contain' source={require('../../../../assets/icons/Profile/Location.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: "black", flexWrap: "wrap", flex: 1 }} numberOfLines={2} ellipsizeMode="tail">
                {item.flatNumber}, {item.area},{item.landmark}, {item.townCity}, {item.state}, {item.pincode}
            </Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={close}
        >
            <TouchableWithoutFeedback onPress={close}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            </TouchableWithoutFeedback>

            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20, position: 'absolute', bottom: 0, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', elevation: 5, justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={close}>
                        <Image resizeMode='contain' source={require('../../../../assets/icons/Home/Left.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <Text style={{ position: 'absolute', left: '50%', transform: [{ translateX: '-50 %' }], fontSize: 16, fontFamily: 'Roboto-Medium', textAlign: 'center', color: "black" }}>Select an Address</Text>
                </View>

                <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                <TouchableOpacity onPress={() => { handleAddNewAddress() }} style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', }}>
                    <Image source={require('../../../../assets/icons/Profile/add.png')} style={{ width: 25, height: 25, marginRight: 20 }} />
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>Add new Address</Text>
                </TouchableOpacity>

                <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                <Text style={{ fontSize: 15, fontFamily: 'Roboto-Bold', color: "black", }} >Saved Address</Text>

                <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                <FlatList
                    data={addresses}
                    renderItem={addressItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text style={{ fontSize: 16, color: 'black', textAlign: 'center' }}>No addresses available</Text>}
                    ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />)}
                />

            </View>
        </Modal>
    );

};

export default AddAddressSheet;
