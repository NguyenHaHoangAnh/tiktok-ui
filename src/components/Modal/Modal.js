import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './Modal.module.scss';
import { CloseButtonIcon } from "../Icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Login from './components/Login';
import Signup from './components/Signup';

const cx = classNames.bind(styles);

function Modal({ children, onClose }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('close')} onClick={onClose}>
                    <CloseButtonIcon className={cx('close-icon')} />
                </div>

                <div className={cx('body')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node,
}

export default Modal;