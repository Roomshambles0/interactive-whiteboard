import { Server } from 'socket.io'
import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Server as IOServer } from "socket.io"
import { getproperties, undoredo, updatecanvas } from '../../utils/db/helperfunctions'


export const config = {
  api: {
    bodyParser: false,
  },
}

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}


const SocketHandler = (req:NextApiRequest, res:NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    res.status(200).json({ success: true, message: "Socket is already running"})
    return
  }
    const httpServer: any = res.socket.server as any;
    const io = new Server(httpServer,{ path: "/api/socket", addTrailingSlash: false})
    
    res.socket.server.io = io
    
    io.on('connection', socket => {
    
    //emit on server for load data 
      socket.on("get-data",async(param)=>{
      
       const id = param.id;

        if(!id) return

        const properties = await getproperties(id);
          
        if(!properties) return
          
        console.log(properties)
           
        socket.emit("load-canvas",properties)
       
      })
    
  
      socket.on("save-data",async(id,elements,scale,panOffset)=>{
        console.log(elements,panOffset,"elements panoffset")
          const updated = await updatecanvas(id,elements,scale,panOffset);
      
      })

      socket.on("save-history",async(id,elements,history)=>{
        console.log(id,elements,history)
        const identifier = id
        const ele = elements
        const hist = history 
       const returnvalue =  await undoredo(identifier,ele,hist)
      })
    
  })

  res.end()
}

export default SocketHandler;