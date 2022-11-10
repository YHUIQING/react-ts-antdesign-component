import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from './menu';
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
// import { CSSTransition } from 'react-transition-group'
import Transition from "../Transition/transition";
export interface SubMenuProps {
    index?: string;
    title?: string;
    className?: string;
    children:React.ReactNode
}

const SubMenu:React.FC<SubMenuProps> = ({index, title, className, children}) =>{
    const context = useContext(MenuContext);
    const openSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpen = (context.mode === 'vertical' && index) ? openSubMenus.includes(index) : false
    const [open, setOpen] = useState<boolean>(isOpen);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index ,
        'is-opened': open,
        'is-vertical': context.mode === 'vertical'
    });

    
    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault();
        setOpen(!open);
    }
    let timer:any;
    const handleMouse = (e:React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            setOpen(toggle)
        },400);
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick:handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter:(e:React.MouseEvent) => {handleMouse(e,true)},
        onMouseLeave:(e:React.MouseEvent) => {handleMouse(e,false)}
    } : {}
    const renderChildren = () => {
        const subClasses = classNames('aimme-submenu',{
            'menu-opened':open
        })
        const childrenComponent = React.Children.map(children,(child, i)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if(displayName === 'MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`
                })
            }else{
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }

        })
        return(
            <Transition 
                in = {open} 
                timeout = {300} 
                animation = 'zoom-in-top'
            >
                <ul className={subClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
            
        )
    }
    return (
        <li className={classes}  key = {index} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon={'angle-down'} className = 'arrow-icon'/>
            </div>
            {renderChildren()}
        </li>
    )

}
SubMenu.displayName = 'SubMenu';

export default SubMenu;