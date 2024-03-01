
import { io as ClientIO } from  'socket.io-client'

export default function socketClient() {
  const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
    path: "/api/socket/io",
    addTrailingSlash: false,
  });

  socket.on('connect',()=>{
    console.log("socket connected")
})
  
  socket.on("disconnect", () => {
    console.log("Disconnected")
  })

  socket.on("connect_error", async (err:any) => {
    console.log(`connect_error due to ${err.message}`)
    await fetch("/api/socket")
  })

  return socket
}
  