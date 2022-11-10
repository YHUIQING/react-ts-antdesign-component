import React, { useState } from 'react';
import Alert from './components/Alert/alert';
import Button ,{ButtonType, ButtonSize} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const show = () => {
    setVisible(true);
  }
  const close = () => {
    setVisible(false);
  }
  return (
    <div className="App">
      <header className="App-header">
        <Icon theme='danger' icon = 'coffee'/>
        
        <FontAwesomeIcon icon={faCoffee} size='lg'/>
      <Menu defaultIndex={'0' } 
          defaultOpenSubMenus = {['3']}
          // mode = "vertical"
          onSelect = {(index:string) => {
            console.log(index)
          }}
        >
        <MenuItem >
          cool link-0
        </MenuItem>
        <MenuItem  disabled>
          cool link-1
        </MenuItem>
        <MenuItem >
          cool link-2
        </MenuItem>
        <SubMenu title="Submenu">
          <MenuItem >
            sub link-1
          </MenuItem>
          <MenuItem >
            sub link-2
        </MenuItem>
        </SubMenu>
      </Menu>



        <p>
          Button
        </p>
        <Button autoFocus onClick={(e)=>{
          e.preventDefault();
          alert(123)
        }}>Hello</Button>
        <Button disabled >Disabled Btn</Button>
        <Button btnType={ButtonType.Primary} size = {ButtonSize.Large}>Primary Btn</Button>
        <Button btnType={ButtonType.Primary}>Primary Btn</Button>
        <Button btnType={ButtonType.Primary} size = {ButtonSize.Small}>Primary Btn</Button>
        <Button btnType={ButtonType.Danger} >Danger Btn</Button>
        <Button btnType={ButtonType.Link} disabled href = 'http://www.baidu.com'>Baidu</Button>
        <p>
          Alter
        </p>
        <Button onClick={show}>Alert Btn</Button>

        <Alert
          alertType='danger'
          onClose = {close}
          visible = {visible}
          title = {'title'}
          content = {'测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'}
          showClose = {true}
        />
      </header>
    </div>
  );
}

export default App;
