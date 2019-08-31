import React, { useState } from 'react'
import api from '../services/api'
import logo from '../Images/logo.svg'
import '../pages/Login.css'

export default function Login({ history }){
    const [username, setUsername] = useState('')

    async function handleSubmit(e){
        e.preventDefault()

        const response = await api.post('/devs', {username })

        if(response.data){
            const { _id } = response.data 

            history.push(`/dev/${_id}`)
        }else{
            window.alert('Este usuario não existe!')            
        }
    }

    function handleInputChange(e){
        e.preventDefault()
        setUsername(e.target.value)
    }

    return (
        <div className = "login-container">

            <form onSubmit={handleSubmit}> 
                <img src={logo} alt="Tindev"></img>

                <input 
                    placeholder="Digite seu usuário no Github" 
                    value={username}
                    onChange={handleInputChange}
                />

                <button type="submit">Enviar</button>
            </form>

        </div>
    )
}
