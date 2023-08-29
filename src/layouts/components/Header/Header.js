import classNames from 'classnames/bind';
import { createContext, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEllipsisVertical, 
    faEarthAsia, 
    faCircleQuestion, 
    faKeyboard, 
    faUser, 
    faCoins, 
    faGear, 
    faSignOut 
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '../../../config';
import Button from '../../../components/Button';
import styles from './Header.module.scss';
import images from '../../../assets/images';
import Menu from '../../../components/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '../../../components/Icons';
import Image from '../../../components/Image';
import Search from '../Search';

// import { ModalProvider, ModalContext } from '../../../components/Modal/ModalContext';
import Modal from '../../../components/Modal';
import Login from '../../../components/Modal/components/Login';
import Signup from '../../../components/Modal/components/Signup';
import LoginWithPhoneAndCode from '../../../components/Modal/components/LoginWithPhoneAndCode';
import LoginWithEmail from '../../../components/Modal/components/LoginWithEmail';
import LoginWithPhoneAndPassword from '../../../components/Modal/components/LoginWithPhoneAndPassword/LoginWithPhoneAndPassword';
import { authUserContext } from '../../../App';

const cx = classNames.bind(styles);

export const ModalContext = createContext();

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const authUser = useContext(authUserContext);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch(menuItem.to) {
            case '/logout':
                localStorage.removeItem('user');
                window.location.reload();
                break;
            case '/@nickname':
                window.location.href = `/@${authUser.data.nickname}`;
                break;
            default:
                break;
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@nickname',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            className: 'separate',
        },
    ];

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState('login');
    const [children, setChildren] = useState(<Login />)
    const [prevModalValue, setPrevModalValue] = useState(null);
    
    // Show / hide modal
    const handleShowModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
        setModalValue('');
    };

    // Handle modal
    const handleModalValue = (value) => {
        setModalValue(value || 'login');
    }

    const value = {
        modalValue,
        handleModalValue,
        prevModalValue,
    };

    useEffect(() => {
        switch(modalValue) {
            case 'login':
                setChildren(<Login />);
                setPrevModalValue(null);
                break;
            case 'signup':
                setChildren(<Signup />);
                setPrevModalValue(null);
                break;
            case 'login-with-email':
                setChildren(<LoginWithEmail />);
                setPrevModalValue('login');
                break;
            case 'login-with-phone-and-code':
                setChildren(<LoginWithPhoneAndCode />);
                setPrevModalValue('login');
                break;
            case 'login-with-phone-and-password':
                setChildren(<LoginWithPhoneAndPassword />);
                setPrevModalValue('login');
                break;
            default:
                setChildren(<Login />)
                break;
        }
        // console.log(modalValue);
    }, [modalValue]);

    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt='Tiktok' />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {authUser ? (
                        <>
                            <Tippy delay={[0, 200]} content='Upload video' placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content='Message' placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content='Inbox' placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('message-number')}>10</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary onClick={(e) => handleShowModal(e)}>Log in</Button>
                        </>
                    )}

                    <Menu 
                        className={cx('header-menu-list')}
                        items={authUser ? userMenu : MENU_ITEMS} 
                        placement='bottom-end'
                        offset={[12, 8]}
                        onChange={handleMenuChange}
                        menuPopper={cx('header-menu-popper')}
                    >
                        {authUser ? (
                            <Image 
                                className={cx('user-avatar')}
                                src={authUser.data.avatar}
                                alt={authUser.data.nickname}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>              
            </div>

            <ModalContext.Provider value={value}>
                {showModal &&
                    <Modal onClose={handleHideModal}>
                        {children}
                    </Modal>
                }
            </ModalContext.Provider>
        </header>
    );
}

export default Header;