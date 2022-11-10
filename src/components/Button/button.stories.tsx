import React from "react";
import Button,{ ButtonType, ButtonSize} from "./button";

import { ComponentMeta, ComponentStory } from '@storybook/react';

const buttonMate: ComponentMeta<typeof Button> = {
    title: '第四章：Button',
    component: Button

}
export default buttonMate;

const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args}></Button>
)
export const Default = Template.bind({});
Default.args = {
    children:'Default Button',
    btnType:ButtonType.Default
}

export const Primary = Template.bind({});
Primary.args = {
    children:'Primary Button',
    btnType:ButtonType.Primary
}

export const Danger = Template.bind({});
Danger.args = {
    children:'Danger Button',
    btnType:ButtonType.Danger
}

export const Large = Template.bind({});
Large.args = {
    children:'Large Button',
    size:ButtonSize.Large
}


// export const ButtonWithType: ComponentStory<typeof Button> = () => (
//     <>
//         <Button btnType={ButtonType.Primary}> Primary Btn</Button>
//         <Button btnType={ButtonType.Danger}> Danger Btn</Button>
//     </>
// )
// ButtonWithType.storyName = '按钮类型';

// export const ButtonWithSize: ComponentStory<typeof Button> = () => (
//     <>
//         <Button size={ButtonSize.Large}>Large Btn</Button>
//         <Button size={ButtonSize.Small}>Small Btn</Button>
//     </>
// )
// ButtonWithSize.storyName = '按钮大小';
