import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import styles from './AccountPreview.module.scss';
import Button from '../../../../components/Button';
import Image from "../../../../components/Image";
import * as userService from '../../../../services/userService';
import { authUserContext } from '../../../../App';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const [isFollowed, setIsFollowed] = useState(data.is_followed);

    const authUser = useContext(authUserContext);
    const token = authUser && authUser.meta.token ? authUser.meta.token : '';

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={`/@${data.nickname}`}>
                    <Image 
                        className={cx('avatar')}
                        src={data.avatar}
                        alt={data.nickname}
                    />
                </Link>
                {!isFollowed && 
                    <Button className={cx('follow-btn')} primary onClick={handleFollow}>Follow</Button>
                }
                {isFollowed &&
                    <Button className={cx('follow-btn')} secondary onClick={handleUnfollow}>Following</Button>
                }
            </div>

            <div className={cx('body')}>
                <Link to={`/@${data.nickname}`}>
                    <h4 className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </h4>
                    <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                </Link>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers_count} </strong>
                    <span className={cx('label')}>Followers</span>

                    <strong className={cx('value')}>{data.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountPreview;