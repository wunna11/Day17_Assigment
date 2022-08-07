import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import Note from "../components/Note";
import NoteInputModal from "../components/NoteInputModal";
import RoundIconBtn from "../components/RoundIconBtn";
import colors from "../misc/colors";


export default function NoteScreen({user}: any) {

    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    const findGreet = () => {
        const hrs = new Date().getHours();
        
        if (hrs === 0 || hrs < 12) return setGreet('Morning')
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon')
        setGreet('Night')
    }

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes')
        console.log(result)
        if (result !== null) {
            setNotes(JSON.parse(result));
        }
    }

    useEffect(() => {
        findNotes();
        findGreet();
    }, [])

    const handleOnSubmit = async (title: any, desc: any, selectData: any) => {
        const note = { id: Date.now(), title, selectData};
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }
 
    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <View style={styles.container}>

                <Text>Welcome Back</Text>
                <Text style={styles.title}>Here's Update Today</Text>

                <FlatList
                    data={notes}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <Note item={item} />}
                />

                {/*{!notes.length ? (
                    <View style={[ StyleSheet.absoluteFillObject,styles.emptyHeadingContainer]}>
                    <Text style={styles.emptyHeading}>Add Notes</Text>
                    
                </View>
                ): null}*/}
                
                <RoundIconBtn
                    antIconName='plus'
                    title='Add Task'
                    style={styles.addBtn}
                    onPress={() => setModalVisible(true)}
                />
                
                <NoteInputModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleOnSubmit}
                />
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    emptyHeading: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2
    },

    emptyHeadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },

    addBtn: {
        position: 'absolute',
        right: 50,
        bottom: 50,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    }
})