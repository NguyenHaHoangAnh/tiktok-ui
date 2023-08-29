import classNames from "classnames/bind";
import { useContext } from "react";
import styles from './LoginWithPhoneAndCode.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Button/Button";
import { ModalContext } from "../../../../layouts/components/Header/Header";

const cx = classNames.bind(styles);

function LoginWithPhoneAndCode() {
    const context = useContext(ModalContext);

    const handleBack = (e) => {
        e.preventDefault();
        context.handleModalValue(context.prevModalValue);
    }

    const handleLoginWithEmail = (e) => {
        e.preventDefault();
        context.handleModalValue('login-with-email');
    }

    const handleLoginWithEmailAndPassword = (e) => {
        e.preventDefault();
        context.handleModalValue('login-with-phone-and-password');
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
                    <input className={cx('input')} placeholder='Enter 6-digit code' />
                    <Button className={cx('code-btn')}>Send code</Button>
                </div>
                <a 
                    className={cx('link', 'footer-link')} 
                    href='/login/phone-or-email/phone-password'
                    onClick={(e) => handleLoginWithEmailAndPassword(e)}
                >
                    Log in with password
                </a>
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

export default LoginWithPhoneAndCode;