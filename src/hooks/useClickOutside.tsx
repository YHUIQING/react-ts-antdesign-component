import { useEffect , RefObject} from "react";

function useClickOutside(ref:RefObject<HTMLElement>,hanler:Function){
    useEffect(()=>{
        const listener = (event: MouseEvent) => {
            //document.body.contains(node) 判断node是否为 body 元素的后代元素或 body本身。
            if(!ref.current || ref.current.contains(event.target as HTMLElement)){
                return;
            }
            hanler()
        }
        document.addEventListener('click',listener);

        return ()=>{
            document.removeEventListener('click',listener);
        }
    },[ref,hanler])
}

export default useClickOutside;