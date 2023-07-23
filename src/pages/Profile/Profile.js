import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBan, 
    faCheckCircle, 
    faEllipsis, 
    faFlag, 
    faLink, 
    faLock, 
    faUserCheck
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import * as profileService from '../../services/profileService';
import Image from '../../components/Image';
import Button from '../../components/Button';
import { 
    EmbedIcon,
    SendIcon,
    FacebookIcon,
    WhatsAppIcon,
    LinkIcon,
    ArrowDownIcon,
    TwitterIcon,
    LinkedInIcon,
    RedditIcon,
    TelegramIcon,
    EmailIcon,
    LineIcon,
    PinterestIcon,
    ProfileShareIcon
} from '../../components/Icons';
import Menu from '../../components/Menu';
import GoToTopBtn from '../../components/GoToTopBtn';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const SMALL_MENU_ITEMS = [
    {
        icon: <EmbedIcon />,
        title: 'Embed',
        href: '/',
    },
    {
        icon: <SendIcon />,
        title: 'Send to friends',
        href: '/',
    },
    {
        icon: <FacebookIcon />,
        title: 'Share to Facebook',
        href: '/',
    },
    {
        icon: <WhatsAppIcon />,
        title: 'Share to WhatsApp',
        href: '/',
    },
    {
        icon: <LinkIcon />,
        title: 'CopyLink',
        href: '/',
    },
]

const MENU_ITEMS = [
    ...SMALL_MENU_ITEMS,
    {
        icon: <ArrowDownIcon />,
        className: 'only-icon',
        children: {
            data: [
                ...SMALL_MENU_ITEMS,
                {
                    icon: <TwitterIcon />,
                    title: 'Share to Twitter',
                    href: '/',
                },
                {
                    icon: <LinkedInIcon />,
                    title: 'Share to LinkedIn',
                    href: '/',
                },
                {
                    icon: <RedditIcon />,
                    title: 'Share to Reddit',
                    href: '/',
                },
                {
                    icon: <TelegramIcon />,
                    title: 'Share to Telegram',
                    href: '/',
                },
                {
                    icon: <EmailIcon />,
                    title: 'Share to Email',
                    href: '/',
                },
                {
                    icon: <LineIcon />,
                    title: 'Share to Line',
                    href: '/',
                },
                {
                    icon: <PinterestIcon />,
                    title: 'Share to Pinterest',
                    href: '/',
                },
            ]
        }
    },
];

const MORE_MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faFlag} />,
        to: '/',
        title: 'Report',
    },
    {
        icon: <FontAwesomeIcon icon={faBan} />,
        title: 'Block',
        to: '/',
        className: 'separate',
    },
]

function Profile() {
    const match = useMatch('/:nickname');
    const [data, setData] = useState({});
    const [firstTab, setFirstTab] = useState(true);
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        profileService
            .getUser({ userNickname: match.params.nickname })
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, [match]);

    const handleChange = (menuItem) => {
        console.log(menuItem);
    }

    const handleFollow = () => {
        setIsFollowed(!isFollowed);
    }

    const handleActiveFirstTab = () => {
        setFirstTab(true);
    }

    const handleActiveSecondTab = () => {
        setFirstTab(false);
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info-wrapper')}>
                    <div className={cx('user-info')}>
                        <Image className={cx('avatar')} src={data.avatar} />
                        <div className={cx('info')}>
                            <h1 className={cx('nickname')}>
                                {data.nickname}
                                {data.tick && <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />}
                            </h1>
                            <h2 className={cx('name')}>{`${data.first_name} ${data.last_name}`}</h2>

                            {!isFollowed &&
                                <Button 
                                    className={cx('follow-btn')} 
                                    primary
                                    onClick={handleFollow}
                                >
                                    Follow
                                </Button>
                            }
                            {isFollowed &&
                                <div className={cx('message-btn-wrapper')}>
                                    <Button
                                        className={cx('message-btn')}
                                        outline
                                    >
                                        Messages
                                    </Button>
                                    <Tippy content='Unfollow' placement='bottom'>
                                        <button
                                            className={cx('unfollow-btn')}
                                            onClick={handleFollow}
                                        >
                                            <FontAwesomeIcon className={cx('unfollow-icon')} icon={faUserCheck} />
                                        </button>
                                    </Tippy>
                                </div>
                            }
                        </div>
                    </div>

                    <h3 className={cx('count-info-wrapper')}>
                        <div className={cx('count-info')}>
                            <strong className={cx('count-number')}>{data.followings_count}</strong>
                            <span className={cx('count-unit')}>Following</span>
                        </div>
                        <div className={cx('count-info')}>
                            <strong className={cx('count-number')}>{data.followers_count}</strong>
                            <span className={cx('count-unit')}>Followers</span>
                        </div>
                        <div className={cx('count-info')}>
                            <strong className={cx('count-number')}>{data.likes_count}</strong>
                            <span className={cx('count-unit')}>Likes</span>
                        </div>
                    </h3>

                    <h2 className={cx('bio')}>{data.bio}</h2>

                    <div>
                        {(data.facebook_url || data.youtube_url || data.twitter_url || data.instagram_url) &&
                            <Button href={data.youtube_url} text className={cx('shared-link')}>
                                <FontAwesomeIcon icon={faLink} className={cx('shared-link-icon')} />
                                {(data.facebook_url || data.youtube_url || data.twitter_url || data.instagram_url)}
                            </Button>
                        }
                    </div>
                </div>

                <div className={cx('header-btn-wrapper')}>
                    <Menu
                        className={cx('profile-menu-list-1')}
                        items={MENU_ITEMS}
                        placement='bottom-end'
                        offset={[22, 8]}
                        onChange={handleChange}
                        menuPopper={cx('share-menu-popper')}
                    >
                        <button className={cx('header-btn')}>
                            <ProfileShareIcon />
                        </button>
                    </Menu>
                    
                    <Menu
                        className={cx('profile-menu-list-2')}
                        items={MORE_MENU_ITEMS}
                        placement='bottom-end'
                        offset={[22, 8]}
                        onChange={handleChange}
                        menuPopper={cx('share-menu-popper')}
                    >
                        <button className={cx('header-btn')}>
                            <FontAwesomeIcon className={cx('header-btn-icon')} icon={faEllipsis} />
                        </button>
                    </Menu>
                </div>
            </div>

            <div className={cx('body')}>
                <div className={cx('video-feed-tab')}>
                    <Button 
                        className={cx('video-feed-tab-btn', {
                            active: firstTab,
                        })}
                        onClick={handleActiveFirstTab}
                    >
                        Videos
                    </Button>
                    <Button 
                        className={cx('video-feed-tab-btn', 'disable', {
                            active: !firstTab,
                        })}
                        onClick={handleActiveSecondTab}
                    >
                        <FontAwesomeIcon className={cx('disable-icon')} icon={faLock} />
                        Liked
                    </Button>
                    <div className={cx('video-feed-tab-line')}></div>
                </div>

                <div className={cx('grid', 'video-container')}>
                    <div className={cx('grid__row', 'video-list', {
                        active: firstTab,
                    })}>
                        {!!data.videos && data.videos.map(video => (
                            <div className={cx('grid__column-5')} key={video.id}>
                                <div className={cx('video-item')}>
                                    <video className={cx('video')} poster={video.thumb_url} controls>
                                        <source src={video.file_url} type={video.meta.mime_type} />
                                    </video>
                                    <img className={cx('video-thumb')} src={video.thumb_url} alt={video.description} />
                                    <h4 className={cx('video-description')}>{video.description}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className={cx('video-list', {
                        active: !firstTab
                    })}>
                        Pane 2
                    </div>
                </div>
            </div>
            <GoToTopBtn />
        </div>
    );
}

export default Profile;