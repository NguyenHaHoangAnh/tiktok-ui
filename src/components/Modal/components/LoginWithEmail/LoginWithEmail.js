import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from './LoginWithEmail.module.scss';
import Button from "../../../Button/Button";
import { ModalContext } from "../../../../layouts/components/Header/Header";
import { EyeClose, EyeOpen } from "../../../Icons";
import * as authService from '../../../../services/authService';

const cx = classNames.bind(styles);

function LoginWithEmail() {
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(ModalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle login
    const userLogin = () => {
        authService
            .login(email, password)
            .then(data => {
                if (data.meta && data.meta.token) {
                    localStorage.setItem('user', JSON.stringify(data));
                    window.location.reload();
                } else {
                    alert('Email or password is invalid! Please try again');
                }
            })
            .catch(error => console.log(error));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        userLogin();
    }

    // Handle modal
    const handleBack = (e) => {
        e.preventDefault();
        context.handleModalValue(context.prevModalValue);
    }

    const handleLoginWithPhone = (e) => {
        e.preventDefault();
        context.handleModalValue('login-with-phone-and-code');
    }

    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        context.handleModalValue('signup');
    }

    return (
        <div>
            <header>
                <div className={cx('back-btn')} onClick={(e) => handleBack(e)}>
                    <FontAwesomeIcon className={cx('back-icon')} icon={faAngleLeft} />
                </div>
            </header>

            <div className={cx('body')}>
                <h2 className={cx('header')}>Log in</h2>

                <div className={cx('label')}>
                    Email or username
                    <a 
                        className={cx('link')} 
                        href='/login/phone-or-email/phone'
                        onClick={(e) => handleLoginWithPhone(e)}
                    >
                        Login with phone
                    </a>
                </div>
                
                <div className={cx('input-wrapper')}>
                    <input 
                        className={cx('input')} 
                        type='email' 
                        value={email}
                        placeholder='Email or username' 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('input-wrapper')}>
                    <input 
                        className={cx('input')} 
                        type={showPassword ? 'text' : 'password'} 
                        value={password}
                        placeholder='Password' 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={cx('password-btn')} onClick={(e) => handleToggleShowPassword(e)}>
                        {showPassword ? <EyeOpen /> : <EyeClose />}
                    </button>
                </div>
                <a className={cx('link', 'footer-link')} href='/login/phone-or-email/forget-password'>Forgot password?</a>
                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={(e) => handleLogin(e)}
                >
                    Log in
                </Button>
            </div>
            
            <footer className={cx('footer-wrapper')}>
                <div className={cx('footer')}>
                    Don't have an account? 
                    <a 
                        className={cx('auth-link')} 
                        href="/signup" 
                        onClick={(e) => handleSignup(e)}
                    >
                        Sign up
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default LoginWithEmail;