"use client";

import Modal from '@/components/modal';
import { signOut } from 'next-auth/react';
import localFont from 'next/font/local';
import { useState } from 'react';
const myFonts = localFont({
    src: '../../../public/fonts/Virgil.woff2',
    variable: '--excal',
  });


export const Toolbar = ()=>{
  const [open, setOpen] = useState(false);

    const borderStyle = {
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
        lineheight:' 1.5em',
        border: 'solid 3px hsla(0, 0%, 20%, 1)',
    
      };

    const upperborder = {borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    lineheight: '1.5em',
    borderBottom: 'solid 3px hsla(0, 0%, 20%, 1)',}

    return <div className={` w-full flex justify-between h-24 ${myFonts.className} `} style={upperborder}>
        <div className='ml-6 mt-8 font-extrabold text-4xl text-sky-500'>INTERACTIVE CANVAS</div>
       
        <div>
        <button className="m-5 mx-10 px-6 py-2 font-bold text-slate-600"style={borderStyle} onClick={()=>{setOpen(true)}} >Logout</button>
        </div>
       <Modal open={open} onClose={() => setOpen(false)}>
         <div className='m-4 font-bold text-3xl text-gray-600'>Are you sure about Signing out</div>
         <div>
          <button className='mx-3 font-semibold text-xl text-white bg-black px-2' style={borderStyle} onClick={()=>{signOut()}}>Yes</button>
          <button className="px-3 mx-3  font-semibold text-xl" style={borderStyle} onClick={()=>{setOpen(false)}}>No</button>
         </div>
        </Modal>
        </div>
}