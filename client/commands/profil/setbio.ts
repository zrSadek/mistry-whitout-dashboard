import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "setbio",
    description: "Changer votre à propos de moi",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let bio = Array.from(args)
        client.user?.setAboutMe(bio.slice(0).join(' ') || null)
            .then(() => message.edit({ files: [], content: "Votre bio a été modifiée" }))
            .catch(() => message.edit({ files: [], content: "Je ne peux pas modifier votre bio" }))
    }
}