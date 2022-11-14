import React, { FunctionComponentElement, useState } from "react";
import classNames from "classnames";
import {TabItemProps} from './TabItem'
type selectCallback =  (selectedIndex:number) => void;
interface TabsProps {
    defaultIndex?: number;
    className?: string;
    onSelect?: selectCallback;
    children?: React.ReactNode;
    type?: 'line' | 'card'
}

// export interface TabsContextProps {
//     index?: number;
//     onSelect?: selectCallback;

// }
// export const TabContext = React.createContext<TabsContextProps>({index:0})
const Tabs:React.FC<TabsProps> = (props) => {
    const { defaultIndex, children, className, onSelect} = props;
    const [active, setActive] = useState<number>(defaultIndex || 0);
    const classes = classNames('aimme-tabs', className, {
        // 'is-active':true,
        // 'is-disabled':disabled
    })
    const handleClick = (index:number,disabled?:boolean) => {
        if(!disabled){
            setActive(index);
            if(onSelect){
                onSelect(index);
            }
        }
    }

    const renderNavLinks = () => {
        return React.Children.map(children,(child, index)=>{
            const childElement = child as FunctionComponentElement<TabItemProps>;
            const { disabled, label } = childElement.props;
            const classes = classNames('tabs-item',{
                'is-active': active === index,
                'is-disabled': disabled
            })
            return (
                <li className={classes} onClick = {(e)=>{
                    e.preventDefault();
                    handleClick(index,disabled)

                }}>
                    {label}
                </li>
            )
        })
    }
    const renderContent = () => {
        return React.Children.map(children,(child, index)=>{
            const childElement = child as FunctionComponentElement<TabItemProps>;
            if(index === active){
                return childElement
            }
        })
    }
    return (
        <div className="tabs-content">
            <ul className={classes}>
                {renderNavLinks()}
            </ul>
            <div>
                {renderContent()}
            </div>
        </div>
        
    )
}

export default Tabs;