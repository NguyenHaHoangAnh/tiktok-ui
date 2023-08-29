import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import Image from '../Image';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import Button from '../Button';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountPreview from './AccountPreview';
import {
    ArrowDownIcon,
    CollectIcon,
    CommentIcon,
    EmbedIcon,
    FacebookIcon,
    LikeIcon,
    LinkIcon,
    SendIcon,
    ShareIcon,
    WhatsAppIcon,
    TwitterIcon,
    LinkedInIcon,
    RedditIcon,
    TelegramIcon,
    EmailIcon,
    LineIcon,
    PinterestIcon,
    PlaySolidIcon,
    PauseIcon,
    VolumeIcon,
    MutedIcon,
} from '../Icons';
import VideoAction from './VideoAction';
import Menu from '../Menu';
import { authUserContext } from '../../App';
import * as userService from '../../services/userService';

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

const Video = ({ data, mute, volume, toggleMute, adjustVolume }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    const [pausePressed, setPausePressed] = useState(false);

    const authUser = useContext(authUserContext);
    const token = authUser && authUser.meta.token ? authUser.meta.token : '';

    // Handle logic
    const handleChange = (menuItem) => {
        console.log(menuItem);
    }

    // Handle follow
    const handleFollow = () => {
        if (token) {
            userService
                .followUser({ id: data.id, token })
                .then(data => setIsFollowed(data.is_followed))
                .catch(error => console.log(error));
        } else {
            alert('Please login!');
        }
    }

    const handleUnfollow = () => {
        if (token) {
            userService
                .unfollowUser({ id: data.id, token })
                .then(data => setIsFollowed(data.is_followed))
                .catch(error => console.log(error));
        } else {
            alert('Please login!');
        }
    }

    const videoRef = useRef();
    const imgRef = useRef();

    // Mute
    useEffect(() => {
        if (mute) videoRef.current.volume = 0;
        else {
            videoRef.current.muted = false;
            videoRef.current.volume = volume;
        }
    }, [volume]);

    //  Play / Pause / Stop video
    const playVideo = () => {
        setIsPlayed(true);
        imgRef.current.classList.remove(cx('active'));
        videoRef.current.play();
    }

    const pauseVideo = () => {
        setIsPlayed(false);
        videoRef.current.pause();
    }

    const stopVideo = () => {
        setIsPlayed(false);
        imgRef.current.classList.add(cx('active'));
        videoRef.current.currentTime = '0';
        videoRef.current.pause();
    }

    const handleTogglePlay = () => {
        if (!isPlayed) {
            setPausePressed(false);
            playVideo();
        }
        else {
            setPausePressed(true);
            pauseVideo();
        }
    }

    // Auto play video
    useEffect(() => {
        const windowHeight = window.innerHeight;
        
        const handleScroll = () => {
            const video = videoRef.current;
            const videoHeight = video.clientHeight;
            const videoTop = video.getBoundingClientRect().top;

            if (videoTop <= windowHeight - videoHeight * 0.75 && 
                videoTop >= 60 - videoHeight * 0.75 && 
                !pausePressed)
                playVideo();
            else {
                if (pausePressed) pauseVideo();
                else stopVideo();
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    const renderPreview = (props) => {
        return (
            <div tabIndex='-1' {...props}>
                <PopperWrapper>
                    <div className={cx('preview')}>
                        <AccountPreview
                            data={data.user}
                            isFollowed={isFollowed}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow} 
                        />
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('container')} key={data.id}>
            <div>
                <Tippy
                    interactive
                    zIndex={2}
                    popperOptions={{ modifiers: [{ name: 'flip', enabled: false }], strategy: 'fixed', }}
                    delay={[800, 400]}
                    offset={[0, 2]}
                    placement='bottom-start'
                    render={renderPreview}
                >
                    <Link to={`/@${data.user.nickname}`} className={cx('user-link')}>
                        <Image 
                            className={cx('avatar')}
                            src={data.user.avatar}
                            alt={data.user.nickname}
                        />
                    </Link>
                </Tippy>
            </div>

            <div className={cx('content')}>
                <div className={cx('heading')}>
                    <div>
                        <div>
                            <Tippy
                                interactive
                                zIndex={2}
                                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }], strategy: 'fixed', }}
                                delay={[800, 400]}
                                offset={[-68, 38]}
                                placement='bottom-start'
                                render={renderPreview}
                            >
                                <Link to={`/@${data.user.nickname}`}>
                                    <div className={cx('user-info')}>
                                        <h3 className={cx('nickname')}>
                                            <strong>{data.user.nickname}</strong>
                                        </h3>
                                        {data.user.tick && 
                                            <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />
                                        }
                                        <h4 className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                                    </div>
                                </Link>
                            </Tippy>
                        </div>

                        <p className={cx('description')}>{data.description}</p>
                        <div className={cx('music')}>{data.music}</div>
                    </div>

                    {!isFollowed &&
                        <Button 
                            className={cx('follow-btn')} 
                            outline 
                            small
                            onClick={handleFollow}
                        >
                            Follow
                        </Button>
                    }

                    {isFollowed &&
                        <Button 
                            className={cx('follow-btn')} 
                            secondary 
                            small
                            onClick={handleUnfollow}
                        >
                            Following
                        </Button>
                    }
                </div>

                <div className={cx('body')}>
                    <div 
                        className={cx('video-item')} 
                        onClick={handleTogglePlay}
                    >
                        <video 
                            ref={videoRef} 
                            className={cx('video')}  
                            poster={data.thumb_url} 
                            src={data.file_url}
                            loop
                            muted
                        />
                        <img 
                            ref={imgRef}
                            className={cx('video-thumb', 'active')}
                            src={data.thumb_url}
                            alt={data.description}
                        />
                    </div>

                    <button className={cx('control-btn')} onClick={handleTogglePlay}>
                        {isPlayed ? (<PlaySolidIcon />) : (<PauseIcon />)}
                    </button>
                    
                    <div className={cx('volume-wrapper')}>
                            <div className={cx('volume-range-wrapper')}>
                                <input 
                                    className={cx('volume-range')}
                                    value={volume * 100} 
                                    type='range' 
                                    min='0' 
                                    max='100' 
                                    step='2'
                                    onInput={adjustVolume}
                                    style={{
                                        backgroundSize: `${volume * 100}% 100%`,
                                    }}
                                />
                            </div>
                            <button className={cx('volume-btn')} onClick={toggleMute}>
                                {(volume * 100 > 0 && !mute) ? (<VolumeIcon />) : (<MutedIcon />)}
                            </button>
                        </div>

                    <div className={cx('action')}>
                        <VideoAction className={cx('action-btn', 'like-btn')} icon={<LikeIcon />} data={data} number={data.likes_count} />
                        <VideoAction className={cx('action-btn')} icon={<CommentIcon />} data={data} number={data.comments_count} />
                        <VideoAction className={cx('action-btn', 'collect-btn')} icon={<CollectIcon />} data={data} number={data.views_count} />
                        <Menu
                            className={cx('home-menu-list')}
                            items={MENU_ITEMS}
                            placement='top-start'
                            offset={[-28, 8]}
                            onChange={handleChange}
                            menuPopper={cx('share-menu-popper')}
                        >
                            <VideoAction className={cx('action-btn')} icon={<ShareIcon />} data={data} number={data.shares_count} />
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
};

Video.propTypes = {
    data: PropTypes.object.isRequired,
    mute: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    toggleMute: PropTypes.func.isRequired,
    adjustVolume: PropTypes.func.isRequired,
}

export default Video;