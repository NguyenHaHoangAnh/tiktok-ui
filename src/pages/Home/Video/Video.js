import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import AccountPreview from '../AccountPreview';
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
} from '../../../components/Icons';
import VideoAction from './VideoAction';
import Menu from './Menu';

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

function Video({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex='-1' {...props}>
                <PopperWrapper>
                    <div className={cx('preview')}>
                        <AccountPreview data={data.user} />
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    // Handle logic
    const handleChange = (menuItem) => {
        console.log(menuItem);
    }

    return (
        <div className={cx('container')} key={data.id}>
            <div>
                <Tippy
                    interactive
                    zIndex={2}
                    popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
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
                                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
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
                                        {data.user.tick && <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />}
                                        <h4 className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                                    </div>
                                </Link>
                            </Tippy>
                        </div>

                        <p className={cx('description')}>{data.description}</p>
                        <div className={cx('music')}>{data.music}</div>
                    </div>

                    <Button className={cx('follow-btn')} outline small>Follow</Button>
                </div>

                <div className={cx('body')}>
                    <video className={cx('video')} poster={data.thumb_url} controls>
                        <source src={data.file_url} type={data.meta.mime_type} />
                    </video>

                    <div className={cx('action')}>
                        <VideoAction className={cx('action-btn', 'like-btn')} icon={<LikeIcon />} data={data.likes_count} />
                        <VideoAction className={cx('action-btn')} icon={<CommentIcon />} data={data.comments_count} />
                        <VideoAction className={cx('action-btn', 'collect-btn')} icon={<CollectIcon />} data={data.views_count} />
                        <Menu
                            items={MENU_ITEMS}
                            onChange={handleChange}
                        >
                            <VideoAction className={cx('action-btn')} icon={<ShareIcon />} data={data.shares_count} />
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;