import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "ghostping",
    description: "ghostping un utilisateur",
    execute: async (client: SelfBot, message: Message, args: string) => {
        await client.sleep(350)
        message.delete().catch(() => { })
    }
}