import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import styles from './AccountPreview.module.scss';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img 
                    className={cx('avatar')}
                    src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/856d6e040a2b3181553f302cdef7f5f5.jpeg?x-expires=1689152400&x-signature=7blOD9gqeQPNg%2BypofyKID%2BTc%2FY%3D' 
                    alt=''
                />
                <Button className={cx('follow-btn')} primary>Follow</Button>
            </div>

            <div className={cx('body')}>
                <h4 className={cx('nickname')}>
                    <strong>roses_are_rosie</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <p className={cx('name')}>ROSE</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>10.2M </strong>
                    <span className={cx('label')}>Followers</span>

                    <strong className={cx('value')}>501.2M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;