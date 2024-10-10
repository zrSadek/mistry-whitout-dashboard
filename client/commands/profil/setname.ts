import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "setname",
    description: "Changer le nom de votre compte",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let name = Array.from(args)
        if (!args[0]) return message.edit("Veuillez me donner un pseudo")
        client.user?.setGlobalName(name.slice(0).join(' '))
            .then(() => message.edit({ files: [], content: "Votre nom a été modifié" }))
            .catch(() => message.edit({ files: [], content: "Je ne peux pas modifier votre nom" }))
    }   
}
