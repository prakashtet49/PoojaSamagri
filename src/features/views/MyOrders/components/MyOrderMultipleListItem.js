import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Color from '../../../../infrastruture/theme/color';

const MyOrderMultipleListItem = ({ item }) => {
    const deviceWidth = Dimensions.get('window').width;

    return (

        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderRadius: 8, marginBottom: 10 }} >

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: "#E9E6E6", borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomColor: "#E5E5E5", padding: 10, borderBottomWidth: 1 }}>
                    <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black", marginBottom: 5 }}>{item.description}</Text>
                    </View>
                </View>

                <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray', }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }} >
                    <View style={{ flexDirection: 'column', maxWidth: deviceWidth * 0.5, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black" }}>1 * Agarbatti Packet</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black" }}>1 * Kumkum Packet</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black" }}>1 * Agarbatti Packet</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black" }}>.....</Text>
                    </View>
                    <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', color: "black" }}>View more</Text>
                </View>

                <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }} >
                    <View style={{ flexDirection: 'column', maxWidth: deviceWidth * 0.5, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black" }}>{item.price}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black" }}>Additional Info</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: Color.primary_blue, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, flexShrink: 1 }} >
                        <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: 'black', textAlign: 'center' }}>Buy Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        // <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "white", elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderRadius: 8, marginBottom: 10 }} >

        //     <View style={{ flex: 1 }}>
        //         <View style={{ flexDirection: 'row', borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomColor: "#E5E5E5", padding: 10, borderBottomWidth: 1 }}>
        //             <View>
        //                 <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>Transaction ID:</Text>
        //                 <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black", marginBottom: 5, marginTop: 5 }}>Ordered on: </Text>
        //             </View>
        //         </View>

        //         <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray', }} />

        //         <View style={{ flex: 1, justifyContent: 'flex-start', padding: 10, backgroundColor: "#E9E6E6" }} >

        //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                     <Image source={require("../../../../assets/icons/Home/laxmidevi_pic.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
        //                     <View style={{ flex: 1 }}>
        //                         <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black' }}>item.itemName</Text>
        //                         <Text style={{ fontSize: 14, color: 'black', fontFamily: 'Roboto-Light' }}>item.itemQuantity</Text>
        //                         <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'black' }}>item.itemPrice</Text>
        //                     </View>

        //                     <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", borderRadius: 20 }}>
        //                         <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black", marginStart: 10, marginEnd: 10, padding: 5 }}>+ 3</Text>
        //                     </View>
        //                 </View>

        //             </View>
        //         </View>

        //         <View style={{ borderBottomWidth: 1, borderStyle: 'dotted', borderColor: 'gray' }} />

        //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }} >
        //             <View style={{ flexDirection: 'column', maxWidth: deviceWidth * 0.5, paddingHorizontal: 10 }}>
        //                 <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black" }}>{item.price}</Text>
        //                 <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular', color: "black" }}>Additional Info</Text>
        //             </View>
        //             <TouchableOpacity style={{ backgroundColor: Color.primary_blue, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, flexShrink: 1 }} >
        //                 <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', color: 'black', textAlign: 'center' }}>Buy Again</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </View>

    );
};

export default MyOrderMultipleListItem;
