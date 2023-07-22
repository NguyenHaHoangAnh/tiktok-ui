import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as videoService from '../../services/videoService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Video from './Video/Video';
import GoToTopBtn from '../../components/GoToTopBtn';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const TYPE = 'for-you';

function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [data, setData] = useState([]);

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

    return ( 
        <div className={cx('wrapper')}>
            {data.map(data => (
                <Video data={data} key={data.id} />
            ))}

            <GoToTopBtn />
        </div>
    );
}

export default Home;