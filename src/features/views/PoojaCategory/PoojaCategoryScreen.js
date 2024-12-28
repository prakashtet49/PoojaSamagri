import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const PoojaCategoryScreen = ({ navigation }) => {
    const categories = [
        { id: '1', name: 'Ganesh Pooja' },
        { id: '2', name: 'Lakshmi Pooja' },
        { id: '3', name: 'Saraswati Pooja' },
        // Add more categories as needed
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pooja Categories</Text>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
    },
});

export default PoojaCategoryScreen;