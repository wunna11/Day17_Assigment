import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import RoundIconBtn from "../components/RoundIconBtn";
import colors from "../misc/colors";

export default function Intro({onFinish}: any) {

    const [name, setName] = useState('');

    const handlePress = (text: any) => {
        setName(text);
    }

    const handleSubmit = async () => {
        const user = {name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if (onFinish) onFinish();
    }
 
    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={handlePress}
                />

                {
                    name.trim().length >= 3 ? (
                        <RoundIconBtn antIconName='arrowright' onPress={ handleSubmit } />
                    ) : null
                }
                
                
            </View>
        </>
    )
}

const width  = Dimensions.get('window').width - 50;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        height: 50,
        width,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        marginBottom: 15
    },

    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5
    }
})