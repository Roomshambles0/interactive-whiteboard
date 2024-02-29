import { Prisma, PrismaClient } from "@prisma/client"

declare const global:  typeof globalThis & {
    Pclient?: PrismaClient;
};

let Pclient:PrismaClient;

if (!global.Pclient) {
        global.Pclient = new PrismaClient()
}
Pclient = global.Pclient


export { Pclient };