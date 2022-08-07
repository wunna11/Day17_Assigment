import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import colors from "../misc/colors";


export default function Note({item}: any) {
    const { title, desc, selectData } = item; 

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{selectData}</Text>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
    )
}

const width = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width - 2 / 10,
        padding: 8,
        borderRadius: 10,
        marginBottom: 20
    },
    
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    time: {
        width: 100,
        height: 30,
        backgroundColor: 'blue',
        borderRadius: 40,
        color: 'black',
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 3,
        marginBottom: 10,
    }
})
