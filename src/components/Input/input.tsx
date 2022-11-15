import React, { ChangeEvent } from "react";
import Icon from '../Icon/icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames';
/**
 * disabled
 * size
 * icon
 * prepand
 * append
 * {...restProps}
 */

type InputSize = 'lg' | 'sm'

export interface InputProps  extends Omit<React.InputHTMLAttributes<HTMLElement>,'size'>{
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | React.ReactNode;
    append?: string | React.ReactNode;
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
}


export const Input:React.FC<InputProps> = (props) => {
    const { disabled, size, icon, prepend, append, ...restProps} = props;

    const cnames = classNames('aimme-input-wrapper',{
        [`input-size-${size}`]:size,
        'is-disables':disabled,
        'input-group':prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append,
    });
    const formatInput = (value:any) => {
        if(typeof value === 'undefined' || value === null){
            return '';
        }
        return value.trim();
    }
    console.log(restProps);
    if('vaule' in restProps){
        delete restProps.defaultValue
        restProps.value =  formatInput(restProps.value);
    }
    return(
        <div className={cnames}>
        {
            prepend && <div className="aimme-input-group-prepend">{prepend}</div>
        }
        {
            icon && <div className="icon-wrapper"> <Icon  theme="danger" icon={icon}/> </div>
        }
        <input 
            className="aimme-input-inner"
            disabled = {disabled}  
            {...restProps}
        />
        {
            append && <div className="aimme-input-group-append">{append}</div>
        }
    </div>
        
    )

}
export default Input;