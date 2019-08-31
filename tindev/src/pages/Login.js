import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import logo from '../assests/logo.png'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export default function Login({ navigation }){
    const [user, setUser] = useState('')

    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user })
            }
        })
    }, [])
    
    async function handleLogin(){
        
        const response = await api.post('/devs', { username: user })

        if(response.data){
            const { _id } = response.data
    
            await AsyncStorage.setItem('user', _id)

            setUser('')
            navigation.navigate('Main', { user: _id })
        }else{
            Alert.alert(
                'ERROR',
                'Este usuario não existe!',
                [{text: 'OK'}]
            )
        }
                  
    }

    return (
        <View style={styles.container}>
            <Image source={logo}/>  
            <TextInput 
                style={ styles.input }
                autoCapitalize="none"
                autoCorrect={false}
                placeholder= "Digite seu usuario do Github"
                placeholderTextColor= '#999'
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}> Enviar </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4727',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,

    }   
})