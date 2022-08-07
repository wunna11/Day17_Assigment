import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../misc/colors";


const RoundIconBtn = ({antIconName, size, color, style, onPress, title}: any) => {
    return <AntDesign
        name={antIconName}
        size={size || 24}
        color={color || colors.LIGHT}
        style={[styles.icon, { ...style }]}
        onPress={onPress}
        title={title}
    />
}

const styles = StyleSheet.create({
    container: {

    },

    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    }


})


export default RoundIconBtn;