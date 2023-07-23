import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data = [], isSeeAll = false, onViewChange }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map(account => (
                <Link to={`/@${account.nickname}`}>
                    <AccountItem key={account.id} data={account} />
                </Link>
            ))}

            <p className={cx('more-btn')} onClick={() => onViewChange(isSeeAll)}>
                {isSeeAll ? 'See less' : 'See all'}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
}

export default SuggestedAccounts;