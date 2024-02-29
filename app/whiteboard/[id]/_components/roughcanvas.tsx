"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";


import { drawfunction } from "@/utils/draw";
import { getMouseCoordinates } from "../../../../utils/getMousecoordinates";
import { Generator } from "../../../../shapes/generator";

import { useHistory } from "../../../../hooks/useHistory";

import { tool } from "../../../../types/tools";
import { genratortype } from "../../../../types/gen";
import Toolbar from "./toolbar";

import socketClient from "@/utils/socketClient";
import { Data } from "@/types/data";

import localFont from 'next/font/local'
import './styles/loader.css'; 


const myFonts = localFont({
    src: '../../../../public/fonts/Virgil.woff2',
    variable: '--excal',
  });


export enum actions{
    "drawing",
    "panning",
    "writing",
    "no Action"
}




const Rough = (params:{id:string,data:Data}) => {

const [iswindow , setIswindow] = useState(false);

const [savedata,setSavedata] = useState(false);

const {elements,setElements,onundo,onredo,history,setHistory} = useHistory({id:params.id});
const [draw,setDraw] = useState(false);
const [action, setAction] = useState<actions>(actions["no Action"]);
const [panOffset, setPanOffset] = useState({x:0 ,y:0});
const [startingpanoffset, setStartingPanoffset] = useState({ x: 0, y: 0 });
const [scale, setScale] = useState(1);
const [scaleoffset, setScaleoffset] = useState({ x: 0, y: 0 });

const [tool, setTool] = useState<tool>("selection");
const [genr, setGenr] = useState<genratortype>();
const [cursorstyle, setCursorStyle] = useState<string>("default");

const [socketc,setSocketc] =useState<any>()

const canvasRef = useRef<HTMLCanvasElement>(null);
const canvas = canvasRef.current;

const textarea = useRef<HTMLTextAreaElement>(null);

useEffect(()=>{
    const socket = socketClient();
setSocketc(socket)

    return ()=>{
        socket.disconnect();
    }
},[])


useEffect(()=>{ 
    if(!params.data) return
    const data = params.data
    console.log(data)
   const dataelements = data?.elements 
   const datahistory = data?.history
   const datascale = parseFloat(data.scale)

    setElements([...dataelements]);
    setHistory([...datahistory]);
    setScale(datascale);
    setPanOffset(data.panoffset)
 
   
},[params])




useEffect(()=>{


if(savedata){
   console.log(elements,"save-data")
    socketc.emit("save-data",params.id,elements,scale,panOffset);

    }

},[savedata,scale])

useEffect(() => {
    if(typeof window != "undefined"){
        setIswindow(true)
    }
    
    if (!canvas) return
    const genrator = rough.generator()
    const rc = rough.canvas(canvas)
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    if(!canvas) return
    
    const generator = new Generator(genrator,rc,ctx as CanvasRenderingContext2D);
    setGenr(generator)
     
    console.log(elements,"146");

    ctx?.clearRect(0, 0, canvas.width, canvas.height)

    const scaledwidth = canvas.width * scale
    const scaledheight = canvas.height * scale

    const scaledoffsetx = (scaledwidth - canvas.width) / 2;
    const scaledoffsety = (scaledheight - canvas.height) / 2;
    setScaleoffset({ x: scaledoffsetx, y: scaledoffsety })

    ctx.save()

    ctx.translate(panOffset.x * scale - scaledoffsetx, panOffset.y * scale - scaledoffsety)
    ctx.scale(scale, scale)

    console.log(elements,"165");
    
    drawfunction(elements,genr,scale)

    ctx.restore();
    

}, [params,elements,panOffset,tool,scale])




    

    const mousedown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (tool == "selection" || tool == "text") return
        
        setDraw(true);
        setSavedata(false)
        const { clientx, clienty } = getMouseCoordinates(e,panOffset,scale,scaleoffset);
        
        if(tool == "pan"){
            setAction(actions.panning)
            setCursorStyle("grabbing")
            const { clientx, clienty } = getMouseCoordinates(e,panOffset,scale,scaleoffset)
            setStartingPanoffset({ x: clientx, y: clienty })
            return
        }
        else
        {
        const element = genr?.createElement(tool,{x:clientx,y:clienty},{x:clientx,y:clienty});
        if(!element) return 
        setElements(prevState =>[...prevState,element])
        } 

    }

    const mousemove = (e: React.MouseEvent<HTMLCanvasElement>) => {
     if(!draw) return
     
     if(tool == "text" || tool == "selection") return

     const { clientx, clienty } = getMouseCoordinates(e,panOffset,scale,scaleoffset);

     if(tool == "pan"){
        if (action != actions.panning) return
        const { clientx, clienty } = getMouseCoordinates(e,panOffset,scale,scaleoffset)
        const deltaX = clientx - startingpanoffset.x
        const deltaY = clienty - startingpanoffset.y
        setPanOffset(prevstate =>
        ({
            x: prevstate.x + deltaX,
            y: prevstate.y + deltaY
        }

        )
        )
        console.log(panOffset)
        return
     } else
     {
        const index = elements.length - 1;
        const last = elements[index];
        if(!last) return
        const updated = genr?.updateElement(tool,{x:last.x1,y:last.y1},{x:clientx,y:clienty},undefined,last,undefined)
        if (!updated) return
        const elementscopy = [...elements];
        elementscopy[index] = updated;
        setElements(elementscopy);
     }
 
    }

    const mouseup = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (tool == "text") return
        setDraw(false);
       
        if (tool == "pan") {
            setAction(actions["no Action"])
            setCursorStyle("grab")
         setSavedata(true)
            return
        }

        if (tool != "pencil") {
            setTool("selection")
        }

        setCursorStyle("default")
        setSavedata(true)
    }

    const blurhandler = () => {
        if (tool != "text") return
        const text = textarea.current?.value;
 
        const index = elements.length - 1;
        const elementText = elements[index]
 
        const updated = genr?.updateElement(tool,undefined,undefined,elementText,undefined,text)
        if (!updated) return

        const elementscopy = [...elements];
        elementscopy[index] = updated;
        setElements(elementscopy);
        setAction(actions.drawing)
        setTool("selection")
        setSavedata(true)
    }

    const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if(tool != "text") return
    if (action == actions.writing) return
    
   
    setAction(actions.writing)
    setSavedata(false)

    const { clientx, clienty } = getMouseCoordinates(e,panOffset,scale,scaleoffset);
    console.log(clientx, clienty);
    
    const element = genr?.createElement(tool,{x:clientx,y:clienty},{x:clientx,y:clienty},{x:clientx,y:clienty});
    if (!element) return
    setElements(prevState => [...prevState, element])
       
    }


    

    return (<div className={`overflow-hidden`}>

        <Toolbar tool={tool} 
        setTool={setTool} 
        setCursorStyle={setCursorStyle}
        onundo={onundo} 
        onredo={onredo} 
        scale={scale} 
        setScale={setScale}
        setSavedata={setSavedata}/>

    
        {(action === actions.writing) ? <textarea
            className="${myFonts.className}"
            ref={textarea}
            onBlur={blurhandler}
            autoFocus={true}
            style={
                {

                    position: "fixed",
                    top: (elements[elements.length - 1].y1 * scale + panOffset.y * scale - scaleoffset.y),
                    left: (elements[elements.length - 1].x1 * scale + panOffset.x * scale - scaleoffset.x),
                    overflow: 'hidden',
                    font: `${24 * scale}px ${myFonts.style.fontFamily}`,
                    margin: 0,
                    padding: 0,
                    border: "transparent",
                    outline: 0,
                    whiteSpace: "pre",
                    background: "transparent",
                    zIndex: 3,
                    
                }
            } /> : null}


      {(iswindow )&&<div className="overflow-hidden"> <canvas
            ref={canvasRef}
            style={{ cursor: cursorstyle }}
            height={window.innerHeight}
            width={window.innerWidth}
            onMouseDown={mousedown}
            onMouseMove={mousemove}
            onMouseUp={mouseup}
            onClick={onClick}
            className='z-1  overflow-hidden'
        >Canvas</canvas></div>}

      
    </div>
      
    )

}


export default Rough;

