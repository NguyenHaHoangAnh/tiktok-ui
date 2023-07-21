import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLink, faLock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import * as profileService from '../../services/profileService';
import Image from '../../components/Image';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function Profile() {
    const match = useMatch('/:nickname');
    const [data, setData] = useState({});
    const [firstTab, setFirstTab] = useState(true);

    // console.log(match.params.nickname); // @roses-are-rosie

    useEffect(() => {
        profileService
            .getUser({ userNickname: match.params.nickname })
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, [match]);

    // useEffect(() => {
    //     console.log(data);
    // });

    const handleActiveFirstTab = () => {
        setFirstTab(true);
    }

    const handleActiveSecondTab = () => {
        setFirstTab(false);
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
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
                                <div className={cx('follow-btn')}>
                                    <Button primary>Follow</Button>
                                </div>
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

                    <div className={cx('header-btn')}></div>
                </div>
    
                <div className={cx('body')}>
                    <div className={cx('video-feed-tab')}>
                        <Button 
                            className={cx('video-feed-tab-element', 'video-feed-tab-btn', {
                                active: firstTab,
                            })}
                            onClick={handleActiveFirstTab}
                        >
                            Videos
                        </Button>
                        <Button 
                            className={cx('video-feed-tab-element', 'video-feed-tab-btn', 'disable', {
                                active: !firstTab,
                            })}
                            onClick={handleActiveSecondTab}
                        >
                            <FontAwesomeIcon className={cx('disable-icon')} icon={faLock} />
                            Liked
                        </Button>
                        <div className={cx('video-feed-tab-element', 'video-feed-tab-line')}></div>
                    </div>

                    <div className={cx('video-wrapper')}>
                        <div className={cx('video-feed-tab-element', 'video-container', {
                            active: firstTab,
                        })}>Pane 1</div>
                        <div className={cx('video-feed-tab-element', 'video-container', {
                            active: !firstTab
                        })}>Pane 2</div>
                    </div>
                </div>   
            </div>  
        </div>
    );
}

export default Profile;