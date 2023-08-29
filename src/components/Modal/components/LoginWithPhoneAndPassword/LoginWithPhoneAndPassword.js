import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Button/Button";
import { ModalContext } from "../../../../layouts/components/Header/Header";
import styles from './LoginWithPhoneAndPassword.module.scss';
import { EyeClose, EyeOpen } from "../../../Icons";

const cx = classNames.bind(styles);

function LoginWithPhoneAndPassword() {
    const context = useContext(ModalContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleBack = (e) => {
        e.preventDefault();
        context.handleModalValue(context.prevModalValue);
    }

    const handleLoginWithEmail = (e) => {
        e.preventDefault();
        context.handleModalValue('login-with-email');
    }

    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        context.handleModalValue('signup');
    }

    const handelLoginWithPhoneAndCode = (e) => {
        e.preventDefault();
        context.handleModalValue('login-with-phone-and-code');
    }

    return (
        <div className={cx('wrapper')}>
            <header>
                <div className={cx('back-btn')} onClick={(e) => handleBack(e)}>
                    <FontAwesomeIcon className={cx('back-icon')} icon={faAngleLeft} />
                </div>
            </header>

            <div className={cx('body')}>
                <h2 className={cx('header')}>Log in</h2>

                <div className={cx('label')}>
                    Phone
                    <a 
                        className={cx('link')} 
                        href='/login/phone-or-email/email'
                        onClick={(e) => handleLoginWithEmail(e)}
                    >
                        Login with email or username
                    </a>
                </div>
                
                <div className={cx('input-wrapper')}>
                    <div className={cx('phone-wrapper')}>
                        <span className={cx('phone-number')}>VN +84</span>
                        <FontAwesomeIcon className={cx('phone-icon')} icon={faCaretDown} />
                    </div>
                    <input className={cx('input')} placeholder='Phone number' />
                </div>
                <div className={cx('input-wrapper')}>
                    <input className={cx('input')} type={showPassword ? 'text' : 'password'} placeholder='Password' />
                    <button className={cx('password-btn')} onClick={(e) => handleToggleShowPassword(e)}>
                        {showPassword ? <EyeOpen /> : <EyeClose />}
                    </button>
                </div>
                    <div className={cx('footer-link')}>
                        <a className={cx('link')} href='/login/phone-or-email/forget-password'>Forgot password?</a>
                        <a 
                            className={cx('link')} 
                            href='/login/phone-or-email/phone'
                            onClick={(e) => handelLoginWithPhoneAndCode(e)}
                        >
                            Log in with code
                        </a>
                    </div>
                <Button className={cx('submit-btn')} primary>Log in</Button>
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

export default LoginWithPhoneAndPassword;