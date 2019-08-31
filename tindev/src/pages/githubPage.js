import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage'

export default function GithubPage({ navigation}) {
    const user = navigation.getParam('user')

    useEffect(() => {
        AsyncStorage.getItem('git').then(user => {
            if(user){
                navigation.navigate('githubPage', { user })
            }
        })
    }, [])

    return (
        <WebView source={{ uri: `https://github.com/${user}` }} style={{ marginTop: 0 }} />
    )
}