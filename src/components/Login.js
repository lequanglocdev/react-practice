import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { loginApi } from '../services/userService'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState("")
    const [loadingAPI, setLoadingAPI] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            navigate("/")
        }
    }, [])
    // const []
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required")
            return
        }
        setLoadingAPI(true)
        let res = await loginApi(email, password)
        if (res && res.token) {
            localStorage.setItem("token", res.token)
            navigate("/")
        }
        else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingAPI(false)
    }
    return (

        <div className="login-container col-12 col-sm-4">
            <div className='title'>Log in</div>
            <div className='text'>Email or userName(eve.holt@reqres.in)</div>
            <input type='text'
                placeholder='Email or username...'
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <div className='inputPassword'>
                <input

                    type='password'
                    placeholder='Password...'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <i className={isShowPassword === true ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>

            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >{loadingAPI && <i className="fas fa-circle-notch fa-spin"></i>}&nbsp;Login</button>
            <div className='goBack'><i className="fa-solid fa-angles-left"></i>Go back</div>
        </div>
    )
}

export default Login
