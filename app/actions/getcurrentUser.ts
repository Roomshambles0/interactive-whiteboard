import { Pclient } from "@/utils/prismaclient"; 
import getSession from "./getsession";

export const getCurrentUser = async () => {
    try {
      const session = await getSession();
  
      if (!session?.user?.name) {
        return null;
      }
  
      const currentUser = await Pclient.user.findUnique({
        where: {
          name: session.user.name as string
        }
      });
  
      if (!currentUser) {
        return null;
      }
  
      return currentUser;
    } catch (error: any) {
      return null;
    }
  };
  
  