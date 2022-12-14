import React from "react";
import { CSSTransition} from 'react-transition-group';
import { CSSTransitionProps} from 'react-transition-group/CSSTransition';

type TransitionProps =  CSSTransitionProps & {
    animation?: 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-left' | 'zoom-in-bootom';
    children: React.ReactNode;
    classNames?: React.ClassicComponentClass;
    wrapper?: boolean
}


const Transition:React.FC<TransitionProps> = (props) => {
    const {animation, classNames, children, wrapper, ...restProps} = props;
    return (
        <CSSTransition
            classNames = {classNames ? classNames : animation}
            {...restProps}
        >
            {
                wrapper ? (
                    <div>{children}</div>
                ): (
                    children 
                )
            }
            
        </CSSTransition>
    )
}
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}

export default Transition;