import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
// import { config } from "react-transition-group";
import Alert, { BaseAlertProps } from "./alert";

const testProps: BaseAlertProps = {
    title: 'title',
    onClose: jest.fn()
}
const typeProps:BaseAlertProps = {
    ...testProps,
    alertType: 'success',
    content: 'hello',
    showClose: false
}
describe('test Alert component',()=>{
    it('should render the correct default Alert',()=>{

        const { getByText, container} = render(<Alert {...testProps}/>);
        // expect(getByText('title')).toBeInTheDocument();
        // expect(container.querySelector('.alert')).toHaveClass('alert-default');
        // fireEvent.click(getByText('times'));
        // expect(testProps.onClose).toHaveBeenCalled();
        // expect(queryByText('title')).not.toBeInTheDocument();

    })
    it('should render the correct Alert based on different type and description',()=>{
        const {container, queryByText } = render(<Alert {...typeProps}/>);
        // expect(queryByText('title')).toHaveClass('bold-title');
        // expect(container.querySelector('.alert').toHaveClass('alert-success'));
        // expect(queryByText('hello')).toBeInTheDocument();
        // expect(queryByText('times')).not.toBeInTheDocument();
    })
})