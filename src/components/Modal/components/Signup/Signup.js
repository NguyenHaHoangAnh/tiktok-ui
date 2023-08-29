import classNames from "classnames/bind";
import styles from './Signup.module.scss';
import Button from '../../../Button';
import { 
    ArrowDownIcon,
    ModalFacebookIcon,
    ModalGoogleIcon,
    ModalKakaoTalkIcon,
    ModalLineIcon,
    ModalTwitterIcon,
    ModalUserIcon,
} from '../../../Icons';
import { useContext } from "react";
import { ModalContext } from "../../../../layouts/components/Header/Header";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <ModalUserIcon />,
        title: 'Use phone or email',
    },
    {
        icon: <ModalFacebookIcon />,
        title: 'Continue with Facebook',
        href: '',
    },
    {
        icon: <ModalGoogleIcon />,
        title: 'Continue with Google',
        href: '',
    },
    {
        icon: <ArrowDownIcon />,
        className: 'icon-only',
        children: [
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
        ],
    },
];

function Signup() {
    const context = useContext(ModalContext);

    const handleLogin = (e) => {
        e.preventDefault();
        context.handleModalValue('login');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Sign up for TikTok</h2>

                {MENU_ITEMS.map((item, index) => (
                    <Button 
                        className={cx('btn', {
                            [item.className]: item.className, 
                        })} 
                        key={index} 
                        href={item.href}
                    >
                        <span className={cx('btn-icon', {
                            [item.className]: item.className, 
                        })}
                        >
                            {item.icon}
                        </span>
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
                        href="/login"
                        onClick={(e) => handleLogin(e)}
                    >
                        Log in
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Signup;