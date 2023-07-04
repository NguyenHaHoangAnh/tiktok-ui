import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/856d6e040a2b3181553f302cdef7f5f5.jpeg?x-expires=1688652000&x-signature=WQti1FIM7%2BQPXxMjs6VrAMdMwUY%3D" alt="Rose" />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>roses_are_rosie</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('name')}>ROSE</span>
            </div>
        </div>
    );
}

export default AccountItem;