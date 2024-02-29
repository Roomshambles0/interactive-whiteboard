import { X } from "lucide-react";
import { ReactNode } from "react";

interface params{
    open:boolean;
    onClose:()=> void;
    children:ReactNode
}



export default function Modal({ open, onClose, children }:params) {
   
    const borderStyle = {
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
        lineheight:' 1.5em',
        border: 'solid 2px hsla(0, 0%, 20%, 1)',
    
      };
   
    return (

      <div
        onClick={onClose}
       
        className={`
          fixed inset-0 flex justify-center items-center transition-colors
          ${open ? "visible bg-black/20" : "invisible"}
        `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={borderStyle}
          className={`
            bg-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            <X />
          </button>
          {children}
        </div>
      </div>
    )
  }