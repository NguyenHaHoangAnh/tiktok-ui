import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as videoService from '../../services/videoService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Video from './Video/Video';
import { GoToTopIcon } from '../../components/Icons';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const TYPE = 'for-you';

function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [videos, setVideos] = useState([]);
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [showClass, setShowClass] = useState('');
    const [firstLoadPage, setFirstLoadPage] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        videoService
            .getVideo({ type: TYPE, page: controller.page })
            .then(data => {
                isMounted && setVideos(prevVideo => [...prevVideo, ...data]);
            })
            .catch(error => console.log(error));
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [page]);

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
        <div className={cx('wrapper')}>
            {videos.map(data => (
                <Video data={data} key={data.id} />
            ))}

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
        </div>
    );
}

export default Home;