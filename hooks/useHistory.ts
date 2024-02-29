import { element } from "@/types/element";
import socketClient from "@/utils/socketClient";
import { SetStateAction, useState } from "react";

interface params{
    id:string
}

export const useHistory = (params:params)=>{
    const [elements, setElements] = useState<element[]>([]);
    const [history, setHistory] = useState<element[]>([]);
    const [undo,setUndo] = useState(false)

  

    const onundo = ()=>{
        const socket = socketClient()
        let histcp:element[] = [...history];
        if (undo && elements.length >= history.length) {
            const copyh = [...elements]
            setHistory([...copyh]);
            histcp = copyh
        }

        if (!undo) {
            setUndo(true);
            const copyh = [...elements]
            setHistory([...copyh]);
            histcp = copyh
        }

        const copy = [...elements]
        copy.pop()
        setElements([...copy]);
        const lastelecopy = [...copy]
       
            socket.emit("save-history",params.id,lastelecopy,histcp)
         
     
     }

    const onredo = ()=>{
        const socket = socketClient()
        if (elements.length >= history.length) {
            console.log(elements.length)
            console.log(history.length)
            setHistory([])
            setUndo(false)
            const histcp:any = []
            socket.emit("save-history",params.id,elements,histcp)
            return
        }

        const index = elements.length - 1
        if (elements[index] != history[index]) {
            setHistory([])
            setUndo(false)
            const histcp:any = []
            socket.emit("save-history",params.id,elements,histcp)
            return;
        }
        setElements(prevState => [...prevState, history[index + 1]])
        const elecp = [...elements , history[index + 1]]
        socket.emit("save-history",params.id,elecp,history)
    }

    return{
        elements,
        setElements,
        onundo,
        onredo,
        history,
        setHistory
    }
}