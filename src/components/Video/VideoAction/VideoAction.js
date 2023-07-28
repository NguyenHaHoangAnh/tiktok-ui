import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../Video.module.scss';

const cx = classNames.bind(styles);

const VideoAction = forwardRef(({ className, icon, data, number }, ref) => {
    const [liked, setLiked] = useState(data.is_liked);

    const handleLike = () => {
        setLiked(!liked);
    }

    return (
        <button 
            ref={ref}
            className={cx({
                [className]: className,
                active: liked,
            })} 
            icon={icon} 
            onClick={handleLike}
        >
            <span className={cx('icon-wrapper')}>
                <span className={cx('icon')}>{icon}</span>
            </span>
            <strong className={cx('action-number')}>{number}</strong>
        </button>
    );
});

VideoAction.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
}

export default VideoAction;