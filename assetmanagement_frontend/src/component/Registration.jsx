import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import './Registration.css';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

export const Registration = () => {

    const userNameRef = useRef();
    const errorRef = useRef();
    const navigate=useNavigate()

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [userName, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [role, setRole] = React.useState("")
    

    useEffect(() => {
        console.log("First useEffect fired")
        userNameRef.current.focus();
        console.log("First useEffect fired...Userref set focus .....")
    }, []);

    useEffect(() => {
        console.log("Second useEffect fired beacuse of intitial mount or userName state variable changed...")

        const result = USER_REGEX.test(userName);
        console.log("Result of username valid :" + result)

        setValidName(result);
        console.log("State variable validName assigned with result of regex :" + result)

    }, [userName]);

    useEffect(() => {
        console.log("Third useEffect fired beacuse of intitial mount or password/matchPwd state variables changed...")

        const result = PWD_REGEX.test(password);
        console.log("Result of password valid :" + result)

        setValidPassword(result);
        console.log("State variable validPassword assigned with result of regex :" + result)

        const matchResult = password === confirmPassword;
        setValidMatch(matchResult);
        console.log("State variable validMatch assigned with result of match btwn pwd & confirmpwd :" + matchResult)

    }, [password, confirmPassword]);

    useEffect(() => {
        console.log("Fourth useEffect fired beacuse of intitial mount or email state variables changed...")

        const result = EMAIL_REGEX.test(email);
        console.log("Result of email valid :" + result)

        setValidEmail(result);
        console.log("State variable validEmail assigned with result of regex :" + result)

    }, [email]);

    useEffect(() => {
        console.log("Fifth useEffect fired beacuse of intitial mount or phoneNumber state variables changed...")

        const result = PHONE_REGEX.test(phoneNumber);
        console.log("Result of phoneNumber valid :" + result)

        setValidPhone(result);
        console.log("State variable ValidPhone assigned with result of match btwn pwd & confirmpwd :" + result)


    }, [phoneNumber]);

    useEffect(() => {
        console.log("sixth useEffect fired beacuse of intitial mount or user,password,confirmPassword state variable changed...")

        setError('');
        console.log("status variable error set with empty string")

    }, [userName, password, confirmPassword]);

    const saveUserRegistration = (e) => {
        console.log("saveUserRegistration function called...")

        e.preventDefault()
        console.log("Prevent default behaviour of form submission.....")

        const userRegistrationObj = {
            "name": name,
            "gender": gender,
            "contactNumber": phoneNumber,
            "username": userName,
            "email": email,
            "password": password
        };

        AuthService.registerUser(userRegistrationObj)
            .then((response) => {
                console.log(JSON.stringify(response.data))

                setSuccess(true);
                console.log("Success message set to true.........")
                navigate('/login')
            })
            .catch((error) => {
                console.log("error from register api" + e)
                if (!error?.response) {
                    setError("No server Response");
                } else if (error.response?.status === 403) {
                    setError("Username already exist");
                } else {
                    setError("Registration failed");
                }
            });
    };

    return (
        <div id='background'className="content-container">
            <section id='registration-form'>
                <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'} aria-live='assertive'>{error}</p>
                <p ref={userNameRef} className={success ? 'successmsg' : 'offscreen'} aria-live='assertive'>{success ? 'Registration Successful!' : ''}</p>
                <h2>Register User</h2>
                <form id="form-outline">
                    {/* NAME */}
                    <label htmlFor='name'>Full Name</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* GENDER DROPDOWN */}
                    <label htmlFor='gender'>Gender</label>
                    <select
                        id='gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>


                    {/* EMAIL */}
                    <label htmlFor='email'>Email
                        {/* Show the check icon only if the email is valid */}
                        {validEmail && (
                            <span className='valid'>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                        )}

                        {/* Show the cross icon only if the email is not valid and the user has typed something */}
                        {!validEmail && email && (
                            <span className='invalid'>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? 'false' : 'true'}
                        aria-describedby='emailnote'
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id='emailnote' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Invalid email address<br />
                    </p>


                    {/* PHONE NUMBER */}
                    <label htmlFor='phone'>Phone Number
                        {validPhone && (
                            <span className='valid'>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                        )}


                        {!validPhone && phoneNumber && (
                            <span className='invalid'>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}

                    </label>
                    <input
                        type='text'
                        id='phone'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required aria-invalid={validPhone ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => { setPhoneNumberFocus(true) }}
                        onBlur={() => { setPhoneNumberFocus(false) }}
                    />

                    <p id='uidnote' className={phoneNumberFocus && phoneNumber && !validPhone ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Enter 10 digits for phone number<br />
                    </p>
                    
                    {/* USERNAME */}
                    <label htmlFor='username'>Username
                        {validName && (
                            <span className='valid'>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                        )}


                        {!validName && userName && (
                            <span>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}


                    </label>

                    <input type='text'
                        id='username'
                        value={userName}
                        ref={userNameRef}
                        autoComplete='off'
                        onChange={(e) => { setUsername(e.target.value) }}
                        required aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => { setUserNameFocus(true) }}
                        onBlur={() => { setUserNameFocus(false) }}
                    />

                    <p id='uidnote' className={userNameFocus && userName && !validName ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 chars<br />
                        Must begin with letter<br />
                        Letters,Numbers,Underscores, Hypen allowed
                    </p>

                    {/* PASSWORD */}
                    <label htmlFor='password'>Password
                        {validPassword &&(
                            <span className='valid'>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        )} 
                        {!validPassword && password &&(
                             <span>
                             <FontAwesomeIcon icon={faTimes} />
                         </span>
                        )} 
                    </label>
                    <input type="password"
                        id='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required aria-invalid={validPassword ? 'false' : 'true'}
                        aria-describedby='pwdnote'
                        onFocus={() => { setPasswordFocus(true) }}
                        onBlur={() => { setPasswordFocus(false) }}
                    />
                    <p id='pwdnote' className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        6 to 24 charaters<br />
                        Must include uppercase & lowercase letters, a number and special symbol<br />
                        Allowed special charaters:
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar Sign">$</span>
                        <span aria-label="percent">%</span>
                        <span aria-label="aterisk">@</span>
                    </p>

                    {/* CONFIRM PASSWORD */}
                    <label htmlFor='confirm-pwd'>Confirm Password
                        {validMatch && confirmPassword &&(
                            <span className='valid'>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        )} 
                        {!validMatch && confirmPassword &&(
                             <span>
                             <FontAwesomeIcon icon={faTimes} />
                         </span>
                        )} 
                    </label>
                    <input type="password"
                        id='confirm-pass'
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        required aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby='confirmnote'
                        onFocus={() => { setConfirmPasswordFocus(true) }}
                        onBlur={() => { setConfirmPasswordFocus(false) }}
                    />
                    <p id="confirmnote" className={confirmPasswordFocus && !validMatch ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match first password input field
                    </p>
                    <button disabled={!validName || !validPassword || !validMatch || !validEmail || !validPhone} onClick={(e) => saveUserRegistration(e)}>
                        Signup
                    </button>

                    <p>Already Registered?
                        <span className='line'>
                            <a href='/login'><u>Sign In</u></a>
                        </span>
                    </p>
                </form>
            </section>

        </div>
    );
};