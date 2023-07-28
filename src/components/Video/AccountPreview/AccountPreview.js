import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import styles from './AccountPreview.module.scss';
import Button from '../../Button';
import Image from "../../Image";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
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
                <Button className={cx('follow-btn')} primary>Follow</Button>
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
}

export default AccountPreview;