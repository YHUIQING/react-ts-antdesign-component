import React from "react";
import { fireEvent, render, screen} from "@testing-library/react";
import Button, { ButtonSize, ButtonType } from "./button";

const defaultProps = {
    onClick: jest.fn()
}
const disabledProps = {
    disabled: true,
    onClick: jest.fn()
}
describe('test Button component', () => {
    it('should render the corrent default button',()=>{
        render(<Button {...defaultProps}>Nice</Button>)
        const element = screen.getByText('Nice')
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();

    })

    it('should render the correct component based on different props',()=>{
        render(<Button btnType={ButtonType.Primary} size = {ButtonSize.Large}>Primary Btn</Button>)
        const element = screen.getByText('Primary Btn')
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn btn-primary btn-lg')
    })
    it('should render a link when btnType equals link and href is provided',()=>{
        render(<Button btnType={ButtonType.Link} disabled href = 'http://www.baidu.com'>Baidu</Button>);
        const element = screen.getByText('Baidu')
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
        // expect(element).toHaveAttribute('href');

    })
    it('should render disabled button when disabled set to true',()=>{
        render(<Button {...disabledProps}>button</Button>);
        const element = screen.getByText('button') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        // eslint-disable-next-line jest/valid-expect
        expect(element.disabled);
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})