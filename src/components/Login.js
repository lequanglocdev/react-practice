import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState("")
    // const []
    return (
        <div className="login-container col-12 col-sm-4">
            <div className='title'>Log in</div>
            <div className='text'>Email or userName</div>
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
            >Login</button>
            <div className='goBack'><i class="fa-solid fa-angles-left"></i>Go back</div>
        </div>
    )
}

export default Login
