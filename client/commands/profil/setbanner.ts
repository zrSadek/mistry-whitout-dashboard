import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "setbanner",
    description: "Changer votre bannière",
    execute: async (client: SelfBot, message: Message, args: string) => {
        if (message.attachments.first()) {
            const bannerUrl = message.attachments.first()?.url;
            if (bannerUrl) client.user?.setBanner(bannerUrl)
                .then(() => message.edit({ files: [], content: "Votre bannière a été modifiée" }))
                .catch(() => message.edit({ files: [], content: "Je ne peux pas modifier votre bannière" }))
        } else if (args[0] && args[0].startsWith("https://" || "http://")) {
            client.user?.setAvatar(args[0])
                .then(() => message.edit("Votre bannière a été modifiée"))
                .catch(() => message.edit("Je ne peux pas modifier votre bannière"))
        }
    }
}