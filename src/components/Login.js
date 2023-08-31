import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { handleLoginRedux } from '../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    // const [loadingAPI, setLoadingAPI] = useState(false)

    const isLoading = useSelector(state => state.user.isLoading)
    const acount = useSelector(state => state.user.acount)


    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if (token) {
    //         navigate("/")
    //     }
    // }, [])
    // const []
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required")
            return
        }

        dispatch(handleLoginRedux(email, password))

    }
    const handleGoback = () => {
        navigate('/')
    }
    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }
    useEffect(() => {
        if (acount && acount.auth === true) {
            navigate("/")
        }
    }, [acount])
    return (<>
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
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                />
                <i className={isShowPassword === true ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>

            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >{isLoading && <i className="fas fa-circle-notch fa-spin"></i>}&nbsp;Login</button>
            <div className='goBack'>
                <i className="fa-solid fa-angles-left"></i>
                <span onClick={() => handleGoback()}>&nbsp;Go back</span>
            </div>
        </div>
    </>

    )
}

export default Login
