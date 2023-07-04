import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ 
    to, 
    href, 
    primary = false, 
    outline = false, 
    text = false,
    rounded = false,
    disable = false,
    small = false, 
    large = false, 
    children, 
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...otherProps 
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...otherProps
    };

    // Remove event listener in disabled button
    if (disable) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function')
                delete props[key];
        });
    }

    if (to) {
        props.to = to;
        Comp = Link
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        rounded,
        disable,
        small,
        large
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;