import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../Video.module.scss';

const cx = classNames.bind(styles);

const VideoAction = forwardRef(({ className, icon, data }, ref) => {
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
            <strong className={cx('action-number')}>{data}</strong>
        </button>
    );
});

export default VideoAction;