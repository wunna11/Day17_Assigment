import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './screens/Intro';
import NoteScreen from './screens/NoteScreen';

export default function App() {

    const [user, setUser] = useState({});

    const findUser = async () => {
        const result = await AsyncStorage.getItem('user')
        if (result !== null) {
            setUser(JSON.parse(result))
        }
    }   

    useEffect(() => {
        findUser();
    }, [])

    if (!user.name) return <Intro onFinish={findUser} />
    return (
        <NoteScreen user={user} />
        //<Intro />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
