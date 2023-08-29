import classNames from "classnames/bind";
import { useContext } from "react";
import styles from './Login.module.scss';
import { 
    ModalAppleIcon,
    ModalFacebookIcon,
    ModalGoogleIcon,
    ModalInstagramIcon,
    ModalKakaoTalkIcon,
    ModalLineIcon,
    ModalQRIcon,
    ModalTwitterIcon,
    ModalUserIcon,
} from '../../../Icons';
import Button from '../../../Button';
import { ModalContext } from "../../../../layouts/components/Header/Header";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <ModalQRIcon />,
        title: 'Use QR code',
    },
    {
        icon: <ModalUserIcon />,
        title: 'Use phone / email/ username',
        value: 'login-with-email',
    },
    {
        icon: <ModalFacebookIcon />,
        title: 'Continue with Facebook',
    },
    {
        icon: <ModalGoogleIcon />,
        title: 'Continue with Google',
        href: '',
    },
    {
        icon: <ModalTwitterIcon />,
        title: 'Continue with Twitter',
        href: '',
    },
    {
        icon: <ModalLineIcon />,
        title: 'Continue with LINE',
        href: '',
    },
    {
        icon: <ModalKakaoTalkIcon />,
        title: 'Continue with KakaoTalk',
        href: '',
    },
    {
        icon: <ModalAppleIcon />,
        title: 'Continue with Apple',
        href: '',
    },
    {
        icon: <ModalInstagramIcon />,
        title: 'Continue with Instagram',
        href: '',
    },
];

function Login() {
    const context = useContext(ModalContext);

    const handleChangeModal = (e, item) => {
        e.preventDefault();
        context.handleModalValue(item.value);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        context.handleModalValue('signup');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Log in to TikTok</h2>

                {MENU_ITEMS.map((item, index) => (
                    <Button 
                        className={cx('btn')} 
                        key={index} 
                        href={item.href}
                        onClick={(e) => handleChangeModal(e, item)}
                    >
                        <span className={cx('btn-icon')}>{item.icon}</span>
                        {item.title}
                    </Button>
                ))}
                
            </div>
            
            <footer>
                <div className={cx('policy-confirm')}>
                    <p>
                        By continuing, you agree to TikTok's 
                        <a className={cx('policy-link')} href="/"> Terms of Service </a>
                        and confirm that you have read TikTok's 
                        <a className={cx('policy-link')} href="/"> Privacy Policy</a>.
                    </p>
                </div>

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

export default Login;