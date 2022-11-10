import React from "react";
import classNames from "classnames";
import { Transition } from "react-transition-group";
import Icon from "../Icon/icon";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'
}
export interface BaseAlertProps {
    // children: React.ReactNode;
    alertType?: string;
    showClose?: boolean;
    title?: string;
    content?: string;
    visible?: boolean;
    className?: string;
    onClose?: () => void
}
// type NativeDivProps = React.AllHTMLAttributes<HTMLElement>;
// type AlertProps = Partial<BaseAlertProps & NativeDivProps>;
const Alert:React.FC<BaseAlertProps> = (props) => {
    const {
        className,
        alertType,
        showClose,
        title,
        content,
        visible,
        onClose
    } = props;
    const classes = classNames('content',className,{
        [`alert-${alertType}`]:alertType
    });
    if(!visible){
        return null;
    }
    return (
        <Transition in = {visible} timeout = {300} animation = 'zoom-in-top'>
            <div className='alert'>
                <div className={classes}>
                    {
                        showClose && <div className="closeBtn" onClick={onClose}>
                            <Icon theme='light' icon = 'close'/>
                        </div>
                    }
                    <div>
                        {
                            title && (
                                <div className="title">{title}</div>
                            )
                        }
                        {
                            content && (
                                <div className="description">{content}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Transition>
        
    );
}
Alert.defaultProps = {
    showClose: false,
    alertType: AlertType.Default
}
export default Alert;