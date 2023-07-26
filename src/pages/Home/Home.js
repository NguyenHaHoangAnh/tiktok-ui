import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import * as videoService from '../../services/videoService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Video from './Video';
import GoToTopBtn from '../../components/GoToTopBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const TYPE = 'for-you';
const INIT_VOLUME = 5;

function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [data, setData] = useState([]);
    const [isPlayed, setIsPlayed] = useState(false);
    const [volumeValue, setVolumeValue] = useState(INIT_VOLUME);
    const [isMuted, setIsMuted] = useState(volumeValue === 0);
    const [prevVolumeValue, setPrevVolumeValue] = useState(volumeValue);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        videoService
            .getVideo({ type: TYPE, page: controller.page })
            .then(data => {
                isMounted && setData(prevVideo => [...prevVideo, ...data]);
            })
            .catch(error => console.log(error));
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [page]);

    const videoRef = useRef([]);
    
    const handlePlay = (index) => {
        setIsPlayed(!isPlayed);
        videoRef.current[index].play();
    };

    const handlePause = (index) => {
        setIsPlayed(!isPlayed);
        videoRef.current[index].pause();
    }

    const handleVideoControl = (index) => {
        if (!isPlayed) {
            setIsPlayed(!isPlayed);
            videoRef.current[index].play();
        } else {
            setIsPlayed(!isPlayed);
            videoRef.current[index].pause();
        }
    }

    const handleVideoVolume = (value) => {
        setVolumeValue(value);
        setIsMuted(false);
    }

    useEffect(() => {
        videoRef.current.forEach(video => video.volume(volumeValue));
    }, [volumeValue]);

    const handleMuteVideo = () => {
        if (!isMuted) setPrevVolumeValue(volumeValue);
        setIsMuted(!isMuted);
    }

    useEffect(() => {
        if (isMuted) {
            setVolumeValue(0);
            videoRef.current.forEach(video => video.volume(volumeValue));
        }
        else {
            setVolumeValue(prevVolumeValue)
            videoRef.current.forEach(video => video.volume(volumeValue));
        }
    }, [isMuted]);
    
    return ( 
        <div className={cx('wrapper')}>
            {data.map((data, index) => (
                <div className={cx('video-wrapper')} key={data.id}>
                    <Video 
                        ref={ref => (videoRef.current[index] = ref)} 
                        key={data.id}
                        data={data}
                        initVolume={volumeValue}  
                    >
                        <div className={cx('volume-wrapper')}>
                            <div className={cx('volume-range-wrapper')}>
                                <input 
                                    className={cx('volume-range')}
                                    value={volumeValue} 
                                    type='range' 
                                    min='0' 
                                    max='100' 
                                    onInput={(e) => handleVideoVolume(e.target.value)} 
                                    style={{
                                        backgroundSize: `${volumeValue}% 100%`,
                                    }}
                                />
                            </div>
                            <button className={cx('volume-btn')} onClick={handleMuteVideo}>
                                <FontAwesomeIcon 
                                    className={cx('volume-icon')} 
                                    icon={(volumeValue > 1 && !isMuted) ? (faVolumeLow) : (faVolumeXmark)}
                                />
                            </button>
                        </div>
                    </Video>
                </div>
            ))}

            <GoToTopBtn />
        </div>
    );
}

export default Home;