import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import styles from './AccountPreview.module.scss';
import Button from '../../Button';
import Image from "../../Image";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { authUserContext } from '../../../App';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function AccountPreview({ data, isFollowed, handleFollow, handleUnfollow }) {
    const authUser = useContext(authUserContext);
    const userId = authUser && authUser.data.id ? authUser.data.id : '';

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
                {(userId === data.id) &&
                    <Button
                        className={cx('edit-btn')}
                        secondary
                        leftIcon={
                            <FontAwesomeIcon 
                                className={cx('edit-icon')}
                                icon={faPenToSquare}
                            />
                        }
                    >
                        Edit profile
                    </Button>
                }
                {!(userId === data.id) && !isFollowed &&
                    <Button 
                        className={cx('follow-btn')} 
                        primary
                        onClick={handleFollow}
                    >
                        Follow
                    </Button>
                }
                {!(userId === data.id) && isFollowed &&
                    <Button
                        className={cx('follow-btn')}
                        secondary
                        onClick={handleUnfollow}
                    >
                        Following
                    </Button>
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

                <p className={cx('bio')}>{data.bio || 'No bio'}</p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
    isFollowed: PropTypes.bool.isRequired,
    handleFollow: PropTypes.func.isRequired,
    handleUnfollow: PropTypes.func.isRequired,
}

export default AccountPreview;