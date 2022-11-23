import React from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

interface UploadListProps {
    fileList:UploadFile[];
    onRemove:(file:UploadFile) => void;
}
export const UploadList: React.FC<UploadListProps> = (props) => {
    const { fileList, onRemove} = props;
    return (
        <ul className="viking-upload-list">
            {
                fileList?.map((item: UploadFile)=>{
                    return(
                        <li className="viking-upload-list-item" key = {item.uid}>
                            <span className={`file-name file-name-${item.status}`}>
                                <Icon icon='file-alt' theme = 'secondary'/>
                                {item.name}
                            </span>
                            <span className="file-status">
                                { item.status === 'uploading' && <Icon icon={'spinner'} spin theme="primary"/>}
                                { item.status === 'success' && <Icon icon={'check-circle'} spin theme="success"/>}
                                { item.status === 'error' && <Icon icon={'times-circle'} spin theme="danger"/>}

                            </span>
                            <span className="file-actions">
                                <Icon icon={'times'} onClick={()=>{ onRemove(item)}}/>

                            </span>
                            {item.status === 'uploading' && <Progress percent={item.percent || 0}/>}
                        </li>
                    )
                })
            }

        </ul>
    )
}
export default UploadList;