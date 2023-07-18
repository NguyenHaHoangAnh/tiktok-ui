import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon 
} from '../../../components/Icons';
import SuggestedAccounts from '../SuggestedAccounts';
import * as userService from '../../../services/userService';
import * as followingService from '../../../services/followingService';
import config from '../../../config';
import { faL } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        userService
            .getSuggested({ page: controller.page, perPage: PER_PAGE })
            .then(data => {
                isMounted && setSuggestedUsers(prevUser => [...prevUser, ...data]);
            })
            .catch(error => console.log(error));

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [page]);

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     followingService
    //         .getFollowing({ page })
    //         .then(data => {
    //             isMounted && setFollowingUsers(prevUser => [...prevUser, ...data]);
    //         })
    //         .catch(error => console.log(error));

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    // }, [page]);

    const handleSeeAll = (isSeeAll) => {
        setPage(page + 1);
    };

    return ( 
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title='For You' to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem title='Following' to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon />} />
                <MenuItem title='LIVE' to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            <SuggestedAccounts 
                label='Suggested accounts' 
                data={suggestedUsers} 
                isSeeAll={isSeeAll}
                onViewChange={handleSeeAll} 
            />
            
            <SuggestedAccounts 
                label='Following accounts' 
                // data={followingUsers}
                onViewChange={handleSeeAll}
            />
        </aside>
    );
}

export default Sidebar;