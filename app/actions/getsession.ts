import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authopt";

export default async function getSession() {
  return await getServerSession(authOptions);
}