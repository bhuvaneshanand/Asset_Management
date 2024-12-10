import React, { useContext, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthProvider'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
export const Login = () => {
    const userRef = useRef()
    const errorRef = useRef()
    const [username, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState(false)
    const [validName, setValidName] = React.useState(false)
    const [roles, setRole] = React.useState("")
    const { setAuth } = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        console.log('First useEffcet fired.UseRef is set')
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(username)
        console.log("result of username valid :" + result)
        setValidName(result)
        console.log("Second useEffect fired .Useref is set...")
        setError('')
    }, [username, password])

    const loginUser = (e) => {
        console.log("loginuser function called..")
        e.preventDefault();
        console.log("prevent default behaviour of form submission..")
        const userLoginObj = { username, password, roles }
        AuthService.loginUser(userLoginObj).then(
            (response) => {
                const { token, username, role, password } = response.data;
                console.log(JSON.stringify(response.data))
                console.log("username=" + response.data.username)
                console.log("token=" + response.data.token)
                console.log("role=" + response.data.role)

                setSuccess(true)
                console.log("Success message set to true...")
                //navigate('/login')
                setAuth({
                    role,
                    token,
                    username,
                    password
                });
                
                if (roles === 'Admin' && role==='ADMIN') {
                    console.log("admin")
                    navigate(`/admin/${username}`);
                } else if (roles === 'Employee'&& role==='EMPLOYEE') {
                    console.log("employee")
                    navigate(`/employee/${username}`);
                } else {
                    window.alert("Wrong Credentials")
                }
                localStorage.setItem('token', response.data.token);
                console.log("Auth context variable is with values for username ,token and role" + JSON.stringify(auth))

            }).catch((error) => {
            console.log("error from login api " + error.response)
            if (!error?.response) {
                setError("No server response")
            }
            else if (error.response?.status === 500) {
                setError("Bad Credentials")
            }
            else {
                setError("Login failed")
            }
        })
    }
    return (
        <div id="background" className="content-container">
            <section id='login-form'>
                <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'}
                    aria-live='assertive'>{error}
                </p>
                <h2>Sign In</h2>
                <form>
                    {/* USERNAME */}
                    <label htmlFor="userName"> Username or Email</label>
                    <input
                        type="text"
                        id="userName"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => {
                            console.log("state variable userName set with value" + e.target.value)
                            setUserName(e.target.value)
                        }}
                        value={username} required />

                    {/* PASSWORD */}

                    <label htmlFor="password"> Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => {
                            console.log("state variable password set with value" + e.target.value)
                            setPassword(e.target.value)
                        }}
                        value={password} required />
                    <label htmlFor="role">Select Role</label>
                    <select
                        id="role"
                        onChange={(e) => {
                            console.log("state variable role set with value: " + e.target.value);
                            setRole(e.target.value);
                        }}
                        value={roles}
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                    </select>
                    <button
                        onClick={(e) => { loginUser(e) }}>
                        Login
                    </button>
                    <p>Need an account?
                        <span className='line'>
                            <a href="/registration"><u>Sign Up</u></a>
                        </span>
                    </p>
                </form>
            </section>
        </div>

    )
}