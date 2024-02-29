"use client";

import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
const myFonts = localFont({
    src: '../../../public/fonts/Virgil.woff2',
    variable: '--excal',
  });


interface cardprops{
    name:String;
    createdAt:String;
    updatedAt:String;
    id:String;
}

export const Card = (props:cardprops)=>{
    const router = useRouter()
    const id = props.id;
    const borderStyle = {
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
        padding:'2em',
        lineheight:' 1.5em',
        border: 'solid 2px hsla(0, 0%, 20%, 1)',
        boxShadow:'1px 9px 9px '
      };

     const Buttonstyle = {
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
        lineheight:' 1.5em',
        border: 'solid 2px hsla(0, 0%, 20%, 1)',
        boxShadow:'1px 9px 3px black'
     };

    return <div className={`p-3 m-3 w-full flex ${myFonts.className} `}>
<div style={borderStyle}> 
        <div className=" mx-2 py-4 text-4xl font-extrabold text-sky-500">{props.name}</div>
        <div className='flex shrink'>
        <p className='mx-2 p-2 rounded-lg font-extralight text-stone-500 text-lg bg-slate-200'>created at: {props.createdAt}</p> 
        <p className='mx-2 p-2 rounded-lg font-extralight text-stone-500 text-lg bg-slate-200'>last updated: {props.updatedAt}</p>
        </div>
        <button style={Buttonstyle} className=' mt-5 mx-2 text-3xl px-5 text-emerald-500' onClick={()=>{
                 router.push(`/whiteboard/${id}`);
        }}>edit</button>
    </div>
    </div>
}