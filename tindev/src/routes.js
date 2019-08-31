import {createAppContainer, createDrawerNavigator} from 'react-navigation'
import Login from './pages/Login'
import Main from './pages/Main'
import githubPage from './pages/githubPage'

export default createAppContainer(
    createDrawerNavigator({
        Login,
        Main,
        githubPage,
    }) 
)