import { useState, useEffect, useRef } from 'react';
import * as videoService from '../../services/videoService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Video from '../../components/Video';
import GoToTopBtn from '../../components/GoToTopBtn';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const TYPE = 'for-you';
const INIT_VOLUME = 0.04;

function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [data, setData] = useState([]);
    const [volume, setVolume] = useState(INIT_VOLUME);
    const [prevVolume, setPrevVolume] = useState(volume);
    const [mute, setMute] = useState(true);

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

    useEffect(() => {
        if (volume === 0) setMute(true);
        if (mute) setVolume(0);
    }, [volume]);

    const handleToggleMute = () => {
        if (mute) {
            setVolume(prevVolume);
            setMute(false);
        } else {
            setPrevVolume(volume);
            setVolume(0);
            setMute(true);
        }
    };

    const handleAdjustVolume = (e) => {
        setVolume(e.target.value / 100);
        setPrevVolume(volume);
        setMute(false);
    };
    
    return ( 
        <div 
            className={cx('wrapper')} 
        >
            {data.map(data => (
                <Video 
                    key={data.id}
                    data={data}
                    mute={mute}
                    volume={volume}
                    toggleMute={handleToggleMute}
                    adjustVolume={handleAdjustVolume}
                />
            ))}

            <GoToTopBtn />
        </div>
    );
}

export default Home;