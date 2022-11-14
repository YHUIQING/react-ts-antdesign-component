import React from "react";
export interface TabItemProps {
    disabled?: boolean;
    children?: React.ReactNode;
    label?:string;
}


const TabItem:React.FC<TabItemProps> = (props) => {
    const { children } = props;
    return (
        <div className="tabs-item">
            {children}
        </div>
    )
}
export default TabItem;