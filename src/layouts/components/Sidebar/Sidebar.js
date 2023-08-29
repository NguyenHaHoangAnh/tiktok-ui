import { useState, useEffect, useContext } from 'react';
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
import config from '../../../config';
import { authUserContext } from '../../../App';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [sPage, setSPage] = useState(INIT_PAGE);
    const [sPerPage, setSPerPage] = useState(PER_PAGE);
    const [fPage, setFPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    const authUser = useContext(authUserContext);
    const token = authUser && authUser.meta.token ? authUser.meta.token : '';

    // Get suggested users
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        userService
            .getSuggested({ page: sPage, perPage: sPerPage})
            .then(data => {
                isMounted && setSuggestedUsers(prevUser => [...prevUser, ...data]);
            })
            .catch(error => console.log(error));

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [sPage, sPerPage]);

    // Get following users
    useEffect(() => {
        if (token) {
            let isMounted = true;
            const controller = new AbortController();

            userService
                .getFollowing({ page: fPage, token })
                .then(data => {
                    isMounted && setFollowingUsers(prevUser => [...prevUser, ...data]);
                })
                .catch(error => console.log(error));

            return () => {
                isMounted = false;
                controller.abort();
            }
        } else {
            setFollowingUsers([]);
        }
    }, [fPage, token]);

    const moreSUser = () => {
        if (suggestedUsers.length === PER_PAGE) {
            setSPerPage(PER_PAGE * 4);
            setSPage(prev => prev + 1);
        } else {
            setSuggestedUsers([]);
            setSPerPage(PER_PAGE);
            setSPage(INIT_PAGE);
        }
    }

    const moreFUser = () => {
        if (followingUsers.length === PER_PAGE * 6 || followingUsers.length < fPage * PER_PAGE) {
            setFollowingUsers([]);
            setFPage(INIT_PAGE);
        } else {
            setFPage(prev => prev + 1);
        }
    }

    return ( 
        <div className={cx('wrapper')}>
            <Menu>
                <MenuItem title='For You' to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem title='Following' to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon />} />
                <MenuItem title='LIVE' to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            <SuggestedAccounts 
                label='Suggested accounts' 
                data={suggestedUsers} 
                isSeeAll={suggestedUsers.length === PER_PAGE ? 'See all' : 'See less'}
                onViewChange={moreSUser}
            />
            
            <SuggestedAccounts 
                label='Following accounts' 
                data={followingUsers}
                isSeeAll={(followingUsers.length === PER_PAGE * 6 || followingUsers.length < fPage * PER_PAGE) ? 'See less' : 'See more'}
                onViewChange={moreFUser}
            />

            <div className={cx('footer')}>
                <div className={cx('info')}>
                    <a className={cx('link')} href='/'>About</a>
                    <a className={cx('link')} href='/'>Newsroom</a>
                    <a className={cx('link')} href='/'>Contact</a>
                    <a className={cx('link')} href='/'>Careers</a>
                    <a className={cx('link')} href='/'>ByteDance</a>
                </div>
                <div className={cx('info')}>
                    <a className={cx('link')} href='/'>TikTok for Good</a>
                    <a className={cx('link')} href='/'>Advertise</a>
                    <a className={cx('link')} href='/'>Developers</a>
                    <a className={cx('link')} href='/'>Transparency</a>
                    <a className={cx('link')} href='/'>TikTok Rewards</a>
                    <a className={cx('link')} href='/'>TikTok Embeds</a>
                </div>
                <div className={cx('info')}>
                    <a className={cx('link')} href='/'>Help</a>
                    <a className={cx('link')} href='/'>Safety</a>
                    <a className={cx('link')} href='/'>Term</a>
                    <a className={cx('link')} href='/'>Privacy</a>
                    <a className={cx('link')} href='/'>Creator Portal</a>
                    <a className={cx('link')} href='/'>Community Guidelines</a>
                </div>
                <span className={cx('copyright')}>© 2023 TikTok</span>
            </div>
        </div>
    );
}

export default Sidebar;