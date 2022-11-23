import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'

export type theme = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
    theme?: theme
}

const Icon: React.FC<IconProps> = (props) => {
    const { theme, className, ...restProps } = props;
    const classes = classNames('aimme-icon',className,{
        [`icon-${theme}`]:theme
    });
    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
}

export default Icon;