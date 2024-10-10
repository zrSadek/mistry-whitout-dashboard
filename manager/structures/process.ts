import { WebhookClient } from "discord.js";

export class ProcessManager{
    constructor() {
        process.on("unhandledRejection", async(err: any)=> {
            console.log(err)
        })

        process.on("uncaughtException", (e)=> {
            console.log(e)
        })
    }
}