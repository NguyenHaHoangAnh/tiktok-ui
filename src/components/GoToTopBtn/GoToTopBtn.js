import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './GoToTopBtn.module.scss';
import Button from '../Button';
import { GoToTopIcon } from '../Icons';

const cx = classNames.bind(styles);

function GoToTopBtn() {
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [showClass, setShowClass] = useState('');
    const [firstLoadPage, setFirstLoadPage] = useState(true);

    useEffect(() => {
        const handleScroll = () => setShowGoToTop(window.scrollY >= 4);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (showGoToTop) {
            setFirstLoadPage(false);
            setShowClass('show-go-to-top-btn');
        } else {
            if (!firstLoadPage) setShowClass('hide-go-to-top-btn');
            else return;
        }
    }, [showGoToTop]);

    const handleGoToTop = () => {
        window.scrollTo({
            top :0,
            behavior: 'smooth',
        });
    };


    return (
        <div 
            className={cx('bottom-btn', {
                [showClass]: !!showClass,
            })}
        >
            <Button className={cx('download-btn')} rounded small>Get app</Button>
                
            <button className={cx('go-to-top-btn')} onClick={handleGoToTop}>
                <GoToTopIcon />
            </button>
        </div>
    );
}

export default GoToTopBtn;