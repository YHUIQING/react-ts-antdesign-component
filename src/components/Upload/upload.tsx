import React, {ChangeEvent, useRef, useState} from "react";
import axios from "axios";
// import Button ,{ButtonType}from "../Button/button";
import UploadList from "./uploadList";
import Dragger from "./dragger";


export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[]
    beforeUpload?:(file:File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data:any, file:File) => void;
    onError?: (err:any, file: File) => void;
    onChange?: (file:File) => void;
    onRemove?: (file:File) => void;
    headers?: {[key : string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?:string;
    multiple?:boolean;
    children:React.ReactNode;
    drag?:boolean;

}
export const Upload: React.FC<UploadProps> = (props) => {
    const { onProgress, onSuccess, onError, action, beforeUpload, onChange, defaultFileList,
    headers, data, name, withCredentials, accept, multiple, children, drag } = props;
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList||[])

    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        fileInput.current?.click()
    }
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files){
            return
        }
        uploadFiles(files)
        if(fileInput.current){
            fileInput.current.value = ''
        }
    }

    const uploadFiles = (files:FileList) => {
        const postFiles = Array.from(files);
        postFiles.forEach((file)=>{
            if(!beforeUpload){
                post(file);
            }else{
                const result = beforeUpload(file);
                if(result && result instanceof Promise){
                    result.then(processedFile => {
                        post(processedFile);
                    })
                }else if(result !== false){
                    post(file)
                }
            }

        })

    }

    const updateFileList = (updateFile:UploadFile,updateObj:Partial<UploadFile>) => {
        setFileList((pervlist:UploadFile[])=>{
            return pervlist.map((file)=>{
                if(file.uid === updateFile.uid){
                    return {...file,...updateObj}
                }else{
                    return file;
                }
            })
        })
        
    }
    const post = (file:File) => {
        const _file:UploadFile = {
            uid: Date.now()+'upload_file',
            size:file.size,
            name:file.name,
            status:'ready',
            percent:0,
            raw:file
        }
        setFileList((prevList)=>{
            return [_file,...prevList]
        })
        const formData = new FormData();
        formData.append(name || 'file', file);
        if(data){
            Object.entries(data).forEach(([key,value])=>{
                formData.append(key, value);
            })
        }
        axios.post(action,formData,{
            headers:{
                ...headers,
                'Content-Type':'multipart/form-data'
            },
            withCredentials,
            onUploadProgress:(e:any)=>{
                const percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if(percentage < 100){
                    updateFileList(_file,{status:'uploading',percent:percentage})
                    if(onProgress){
                        onProgress(percentage, file);
                    }
                }
            }
        }).then((resp)=>{
            console.log(resp);
            updateFileList(_file,{status:'success',percent:100, response:resp.data})

            if(onSuccess){
                onSuccess(resp.data, file)
            }
            if(onChange){
                onChange(file)
            }
            
        }).catch((err)=>{
            updateFileList(_file,{status:'error',percent:100, error:err})

            if(onError){
                onError(err,file)
            }
            if(onChange){
                onChange(file)
            }
        })
    }

    const handleRemove = (file:UploadFile) => {
        setFileList((prevList)=>{
            return prevList.filter((item)=>{
                return item.uid !== file.uid
            })
        })
    }
    return (
        <div className="viking-upload-list">
            <div 
                className="viking-upload-input"
                style={{display:'inline-block'}}
                onClick = {handleClick}
            >
                {
                    drag?(
                        <Dragger onFile={(files)=>{uploadFiles(files)}}>
                            拖拽
                        </Dragger>


                    ):(
                        children
                    )
                }
            </div>
            {/* <Button 
                onClick={handleClick}
                btnType={ButtonType.Primary}
            > Upload file</Button> */}
            <input
                className="viking-input-file"
                type={'file'}
                onChange = {handleFileChange}
                style={{display:'none'}}
                ref = {fileInput}
                accept = {accept}
                multiple = {multiple}

            />
            <UploadList fileList={fileList} onRemove={(file)=>{handleRemove(file);
            }}/>
        </div>
    )
}
Upload.defaultProps = {
    name:'file'
}
export default Upload;