"use client";

import { tool } from "@/types/tools";
import { SetStateAction, useEffect } from "react";

import { ALargeSmall, Circle, Hand, Minus, MousePointer, Pencil, Plus, RectangleHorizontal, Redo2, Slash, Undo2 } from "lucide-react";


interface params{
    tool:tool,
    setTool:(value: SetStateAction<tool>) => void
    setCursorStyle:(value: SetStateAction<string>) => void
    onundo: () => void
    onredo: () => void
    scale: number 
    setScale: (value: SetStateAction<number>)=> void
    setSavedata:(value: SetStateAction<boolean>) => void
}

const Toolbar = (params:params)=>{



    useEffect(()=>{

        if(params.tool == "text"){
          params.setCursorStyle("text")
        }else if(params.tool == "pan"){
            params.setCursorStyle("grab")
        }else{
            params.setCursorStyle("default");
        }
        
        },[params])



        const plusclick = () => {
        
            params.setScale(prevstate => Math.min(prevstate + 0.1, 10))
            params.setSavedata(true)    
        }
    
        const minusclick = () => {
           
            params.setScale(prevstate => Math.max(prevstate - 0.1, 0.1))
            params.setSavedata(true)      
        }
    


 return(<div className="overflow-hidden">
    <div className='flex'>
    <div className='z-3 bottom-0 left-0 fixed bg-slate-200  m-6 flex justify-between rounded-lg shadow-2xl'>
        <button className='px-4 py-2 rounded-lg mr-2 hover:bg-slate-300 ' onClick={minusclick}><Minus/></button>
        <button onClick={() => params.setScale(1)}>{new Intl.NumberFormat('en-GB', { style: "percent" }).format(params.scale)}</button>
        <button className='px-4 py-2 rounded-lg ml-2 hover:bg-slate-300' onClick={plusclick}><Plus/></button>
    </div>
    <div className='bottom-0 left-0 fixed bg-slate-200 m-6 ml-60 flex justify-between  rounded-lg shadow-2xl'>
        <button className='px-4 py-2 hover:bg-slate-300 rounded-lg' onClick={params.onundo}><Undo2/></button>
        <button className='px-4 py-2 hover:bg-slate-300 rounded-lg' onClick={params.onredo}><Redo2/></button>
    </div>
</div>
    <div className='z-3 fixed w-full flex justify-center overflow-hidden'>
            <div className='mt-2 bg-slate-200 shadow-2xl rounded-lg p-2 flex '>
            <input className="hidden peer/select" type="radio" id='Select' checked={params.tool == "selection"} value={"selection"} onChange={(e) => {
                params.setTool("selection")} } />
            <label className='p-2 mx-2 hover:cursor-pointer hover:bg-slate-300  peer-checked/select:text-stone-100  peer-checked/select:bg-slate-500 rounded-lg' htmlFor='Select'><MousePointer/></label>

            <input className="hidden peer/pan" type="radio" id='pan' checked={params.tool == "pan"} value={"pan"} onChange={e => params.setTool("pan")} onClick={() => params.setCursorStyle("grab")} />
            <label className='p-2 mx-2 hover:cursor-pointer hover:bg-slate-300  peer-checked/pan:text-stone-100  peer-checked/pan:bg-slate-500 rounded-lg' htmlFor='pan'><Hand/></label>

            <input className="hidden peer/line" type="radio" id='line' checked={params.tool == "line"} value={"line"} onChange={(e) => {
                params.setTool("line") 
                }} />
            <label className='p-2 mx-2 hover:cursor-pointer hover:bg-slate-300  peer-checked/line:text-stone-100  peer-checked/line:bg-slate-500 rounded-lg' htmlFor='line'><Slash/></label>

            <input className="hidden peer/rect" type="radio" id='rectangle' checked={params.tool == "rectangle"} value={"rectangle"}  onChange={(e) => {
                params.setTool("rectangle") 
                }} />
            <label className='p-2 mx-2 hover:cursor-pointer hover:bg-slate-300  peer-checked/rect:text-stone-100  peer-checked/rect:bg-slate-500 rounded-lg' htmlFor='rectangle'><RectangleHorizontal/></label>

            <input className="hidden peer/circle" type="radio" id='circle' checked={params.tool == "circle"} value={"circle"}  onChange={(e) => {
                params.setTool("circle") 
               }} />
            <label className='p-2 mx-2 hover:cursor-pointer hover:bg-slate-300  peer-checked/circle:text-stone-100  peer-checked/circle:bg-slate-500 rounded-lg' htmlFor='circle'><Circle/></label>

            <input className="hidden peer/pencil" type="radio" id='pencil' checked={params.tool == "pencil"} value={"pencil"}  onChange={(e) => {
                params.setTool("pencil") 
                }} />
            <label className='p-2 mx-2 hover:cursor-pointer hover:bg-slate-300  peer-checked/pencil:text-stone-100  peer-checked/pencil:bg-slate-500 rounded-lg' htmlFor='pencil'><Pencil/></label>

            <input className="hidden peer/text" type="radio" id='text' checked={params.tool == "text"} value={"text"}  onChange={(e) => {
                params.setTool("text") 
                }} />
            <label className='p-2 mx-2 hover:cursor-pointer hover:bg-slate-300  peer-checked/text:text-stone-100  peer-checked/text:bg-slate-500 rounded-lg' htmlFor='text'><ALargeSmall/></label>
            </div>
        </div>
        </div>
 )
}

export default Toolbar;