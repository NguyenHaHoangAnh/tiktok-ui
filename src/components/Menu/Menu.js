import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import {Wrapper as PopperWrapper} from '../Popper';
import MenuItem from './MenuItems';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ 
                className,
                children, 
                items = [],
                placement,
                offset,
                hideOnClick = false, 
                onChange = defaultFn,
                ...otherProp }) {
    const [history, setHistory] = useState([{  data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem 
                    key={index} 
                    data={item} 
                    onClick={() => {
                        if (isParent) 
                            setHistory(prev => [...prev, item.children]);
                        else
                            onChange(item);
                    }} 
                />
            );
        });
    }

    const handleBack = () => {
        setHistory(prev => prev.slice(0, prev.length - 1))
    }

    const renderResult = (attrs) => (
        <div 
            className={cx('menu-list', {
                [className]: className,
            })} 
            tabIndex='-1' {...attrs}
        >
            <PopperWrapper className={cx('menu-popper', {
                [otherProp.menuPopper]: otherProp.menuPopper,
            })}>
                {history.length > 1 && !!current.title &&
                    <Header 
                        title={current.title} 
                        onBack={handleBack}
                    />
                }
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory(prev => prev.slice(0, 1));
    }

    return (
        <div>
            <Tippy
                interactive
                zIndex={2}
                placement={placement}
                offset={offset}
                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }], strategy: 'fixed', }}
                hideOnClick={hideOnClick}
                render={renderResult}
                onHide={handleReset}
            >
                {children}
            </Tippy>
        </div>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu;