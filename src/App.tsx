import React, { useState } from 'react';
import Alert from './components/Alert/alert';
import Button ,{ButtonType, ButtonSize} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Tabs from './components/Tabs/tabs';
// import TabItem from './components/Tabs/TabItem';
import TabItem from './components/Tabs/TabItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';
import Upload, { UploadFile } from './components/Upload/upload';
library.add(fas);


function App() {
  /******* alert 开始 ********/
  const [visible, setVisible] = useState<boolean>(false);
  const show = () => {
    setVisible(true);
  }
  const close = () => {
    setVisible(false);
  }
  /******* alert 结束 ********/

  /********input 开始 ********/
  const [inputValue, setInputValue] = useState('');
  /********input 结束 ********/


  /*********AutoComplete start **/
  const optionArray = ['asd','add','about','baba','bank','cool'];
  const fetchSuggestions = (value: string) => {
    console.log(123,value,);
    return optionArray.filter((item:string)=>item.includes(value));
  }

  const handleFetch = (value: string) => {
    return fetch(`https://api.github.com/search/users?q=${value}`)
    .then((data)=> data.json())
    .then(({items})=>{
      const formatItems = items.slice(0,20).map((item:any)=>{
        return item.login
      })
      return formatItems
    })
  }
  /*********AutoComplete end ****/


  /*********upload start ****/
  const checkFileSize = (file: File) => {
    if(Math.round(file.size / 1024) > 50){
      alert('file too big');
      return false;
    }
    return true;
  }

  const filePromise = (file: File) => {
    const newFile = new File([file],'new_name.docx',{type:file.type});
    return Promise.resolve(newFile);
  }

  const defaultFileList:UploadFile[]= [
    { uid:'123', size:1234, name:'hello.md', status:'uploading', percent:40},
    { uid:'122', size:1234, name:'xyz.md', status:'success', percent:40},
    { uid:'121', size:1234, name:'eyhf.md', status:'error', percent:40},
  ]
  /*********upload end ****/



  return (
    <div className="App">
      <header className="App-header">
      <Upload 
        defaultFileList = {defaultFileList}
        action='http://jsonplaceholder.typicode.com/posts/1'
        onChange={(file:File)=>{
          console.log(file);
          
        }}
        beforeUpload={checkFileSize}
      >
        <Button btnType={ButtonType.Primary}> 拖拽 </Button>
      </Upload>
      <Upload 
        defaultFileList = {defaultFileList}
        action='http://jsonplaceholder.typicode.com/posts/1'
        onChange={(file:File)=>{
          console.log(file);
          
        }}
        drag
        beforeUpload={checkFileSize}
      >
        <Button btnType={ButtonType.Primary}> 拖拽 </Button>
      </Upload>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      <AutoComplete 
        onSelect={(value)=>{ console.log('----value----',value)}}
        // value={'123'} 
        fetchSuggestions = {handleFetch}
      />

        <p></p>
        <p></p>
        <p></p>
        <p></p>

        <Input icon = 'search' placeholder='search'/>
        <Input prepend = 'https://'  append = '.com' placeholder='前后缀'/>
        <Input prepend = 'https://'  append = '.com' disabled placeholder='disabled'/>
        <Input 
          defaultValue={inputValue}
          placeholder='受控input' 
          value = {inputValue} 
          onChange = {(e)=>{
            setInputValue(e.target.value)
          }}
        />










        <Tabs>
          <TabItem label = 'item_1'>item_content_1</TabItem>
          <TabItem label = 'item_2'>item_content_2</TabItem>
        </Tabs>





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
