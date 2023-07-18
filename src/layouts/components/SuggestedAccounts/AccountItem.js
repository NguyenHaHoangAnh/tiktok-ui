import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '../../../components/Popper';
import AccountPreview from './AccountPreview';
import styles from './SuggestedAccounts.module.scss';
import Image from '../../../components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex='-1' {...props}>
                <PopperWrapper>
                    <div className={cx('preview')}>
                        <AccountPreview data={data} />
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-20 ,0]}
                zIndex={2}
                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                placement='bottom'
                render={renderPreview}
            >
                <div className={cx('account-item')}>
                    <Image 
                        className={cx('avatar')}
                        src={data.avatar}
                        alt={data.nickname}
                    />
                    <div className={cx('user-info')}>
                        <h4 className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </h4>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem;