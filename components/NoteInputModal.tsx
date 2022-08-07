import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import RNPickerSelect from "react-native-picker-select";

export default function NoteInputModal({ visible, onClose, onSubmit }: any) {

    const [title, setTitle] = useState('');
    const [selectData, setSelectData] = useState('');
    const [date, setDate] = useState(new Date());


    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    const handleOnChangeText = (text: any, valueFor: any) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'selectData') setSelectData(text);
    }

    const handleSubmit = () => {
        if (!title.trim() && !selectData.trim) return onClose()
        onSubmit(title, selectData);
        setTitle('');
        setSelectData('');
        onClose()
    }

    const closeModal = () => {
        setTitle('');
        setSelectData('');
        onClose();
    }

    return (
        <>
            <StatusBar hidden />
            <Modal visible={visible} animationType='fade'>
                <View>

                    <Text style={{ marginBottom: 20 }}>Task Title</Text>
                    <TextInput
                        style={[styles.input, styles.title]}
                        placeholder="Title"
                        value={title}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                    />

                    
                    <Text style={{ marginBottom: 20 }}>Text Selector</Text>
                    <RNPickerSelect
                        onValueChange={(selectData) => setSelectData(selectData)}
                        items={[
                            { label: "Basic", value: "Basic" },
                            { label: "Urgent", value: "Urgent" },
                            { label: "Important", value: "Important" },
                        ]}
                    
                    />

                    {/*<View style={styles.btnContainer}>
                        <RoundIconBtn antIconName='check' size={15} onPress={handleSubmit} />
                        <RoundIconBtn antIconName='close' size={15} style={{marginLeft: 15}} onPress={closeModal} />
                    </View>*/}
                </View>

                <View style={styles.btn}>
                        <Button
                            onPress={handleSubmit}
                            title='Save Task'
                            color='black'
                        />
                    
                       
                        <Button
                            onPress={closeModal}
                            title='Back'
                            color='black'
                        />
                </View>

                <TouchableWithoutFeedback
                    onPress={handleModalClose}
                >
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15
    },

    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK
    },

    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },

    desc: {
        height: 100,

    },

    modalBG: {
        flex: 1,
        zIndex: -1
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15
    },

    btn: {
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
        width: 420,
    }
})