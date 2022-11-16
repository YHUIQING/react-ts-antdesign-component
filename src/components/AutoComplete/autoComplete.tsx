import classNames from "classnames";
import React, { ChangeEvent, useEffect, useState, KeyboardEvent, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";
import Icon from "../Icon/icon";
import Input, { InputProps } from "../Input/input";

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
    fetchSuggestions:(str: string) => string[] | Promise<string[]>;
    onSelect?: (item: string) => void;
}


const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
    const { onSelect, fetchSuggestions, value, ...restProps} = props;
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const debounceValue = useDebounce(inputValue,300);

    const triggerSearch = useRef(false);
    //点击其他区域 搜索的下来菜单消失
    const componentRef = useRef<HTMLDivElement>(null);

    useClickOutside(componentRef,() => {
        setSuggestions([]);
    })

    useEffect(()=>{
        // const value = e.target.value.trim();
        // setInputValue(debounceValue);
        if(debounceValue && triggerSearch.current){
            const results = fetchSuggestions(debounceValue);
            setLoading(true);
            if(results instanceof Promise){
                results.then((data)=>{
                    setSuggestions(data);
                    setLoading(false);
                })
            }else{
                setSuggestions(results)
            }
        }else{
            setSuggestions([])
        }

    },[debounceValue, fetchSuggestions])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    }
    const highlightControl = (index: number) => {
        if(highlightIndex < 0 ){
            setHighlightIndex(0);
        }
        if( highlightIndex >= suggestions.length){
            setHighlightIndex(suggestions.length - 1);
        }
        setHighlightIndex(index);

    }
    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode){
            case 13: //回车
                if(suggestions[highlightIndex]){
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: //向上
                highlightControl(highlightIndex-1);
                break;
            case 40: //向下
                highlightControl(highlightIndex+1);
                break;
            case 27: //esc
                setSuggestions([]);
                break;
        }
    }
    const handleSelect = (item: string) => {
        setInputValue(item);
        if(onSelect){
            onSelect(item);
        }
        highlightControl(-1);

        triggerSearch.current = false;

    }
    const generateDropdown = () => {
        return(
            <ul className="aimme-suggestion-list" >
                {
                    loading && (
                        <div className="suggstions-loading-icon">
                            <Icon icon='spinner' spin/>
                        </div>
                    )
                }
                {
                    suggestions?.map((item, index)=>{
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li 
                                className={cnames}
                                onClick={()=>{handleSelect(item)}}
                            >
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return(
        <div className="aimme-auto-complete" ref = {componentRef}>

            <Input 
                value={inputValue} 
                onChange = {handleChange} 
                onKeyDown = { handleKeyDown }
                {...restProps}
            />
            {
                (suggestions?.length > 0) && generateDropdown()
            }
        </div>
    )
}

export default AutoComplete;





