import React, { createContext, CSSProperties, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type selectCallback =  (selectedIndex:string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: selectCallback;
    children:React.ReactNode;
    defaultOpenSubMenus?:string[]
}

interface IMenuContext {
    index?: string,
    onSelect?:selectCallback,
    mode?:MenuMode,
    defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index:'0'});

export const Menu:React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, onSelect, children, defaultOpenSubMenus} = props;
    const [active, setActive] = useState(defaultIndex);
    const classes = classNames('aimme-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'

    })
    const handleClick = (index:string) => {
        setActive(index);
        if(onSelect){
            onSelect(index)
        }
    } 
    const passedContext: IMenuContext = {
        index: active ? active : '0',
        onSelect: handleClick,
        mode:mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children,(child, index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if(displayName === 'MenuItem' || displayName === 'SubMenu'){
                return React.cloneElement(childElement,{
                    index:index.toString()
                })
            }else{
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }

        })
    }
    return (
        <ul className = {classes} style = {style} data-testid = 'test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0', 
    mode: 'horizontal'
}

export default Menu;