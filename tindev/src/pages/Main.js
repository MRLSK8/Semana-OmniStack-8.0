import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import logo from '../assests/logo.png'
import like from '../assests/like.png'
import dislike from '../assests/dislike.png'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export default function Main({ navigation }){
    const id = navigation.getParam('user')

    const [users, setUsers ] = useState([])

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: id
                }
            })

            setUsers(response.data)
        }

        loadUsers()
    }, [ id ])

    async function handleLike(){
        const [ user, ...rest ] = users

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id }
        })

        setUsers(rest)
    }

    async function handleDislike(){
        const [ user, ...rest ] = users

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id }
        })

        setUsers(rest)
    }

    async function handleLogout(){
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    async function handleImageClick(user){
        await AsyncStorage.clear()
        await AsyncStorage.setItem('git', user)
        navigation.navigate('githubPage', { user })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>
                { users.length == 0 ?
                <Text style = {styles.empty}> Acabou :( </Text> :
                (users.map((user, index) => (
                    <View key= {user._id} style={[styles.card, {zIndex: users.length - index}]}>
                        <Image style={styles.avatar} source={{uri: user.avatar }} />
                        <View style={styles.footer}>
                            <Text style={styles.name}> {user.name} </Text>
                            <Text style={styles.bio} numberOfLines={3}> { user.bio } </Text>
                            <TouchableOpacity style={styles.github} onPress={() => handleImageClick(user.user)}>
                                <Text style={styles.githubLink}>{`github.com/${user.user}`}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                )))}
            </View>

            { users.length > 0 && (
                <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDislike}>
                    <Image source={dislike}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    <Image source={like}/>
                </TouchableOpacity>
            </View> 
            )}
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    logo:{
        marginTop: 30
    },

    cardsContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: 'center',
        maxHeight: 500,
    },

    card:{
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom : 0
    },

    avatar: {
        flex: 1,
        height: 300
    },

    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        marginBottom: 10,
        lineHeight: 18
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2
    },

    empty: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#999',
        alignSelf: 'center'
    },

    github: {
        flex: 1,
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#f5f5f5'
    },

    githubLink: {
        fontSize: 15,
        color: '#6D74FF'
    }
})