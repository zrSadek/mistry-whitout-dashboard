import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "setavatar",
    description: "Changer votre avatar",
    execute: async (client: SelfBot, message: Message, args: string) => {
        if (message.attachments.first()) {
            const avatarUrl = message.attachments.first()?.url;
            if (avatarUrl) client.user?.setAvatar(avatarUrl)
                .then(() => message.edit({ files: [], content: "Votre avatar a été modifié" }))
                .catch(() => message.edit({ files: [], content: "Je ne peux pas modifier votre avatar" }))
        } else if (args[0] && args[0].startsWith("https://" || "http://")) {
            client.user?.setAvatar(args[0])
                .then(() => message.edit("Votre avatar a été modifié"))
                .catch(() => message.edit("Je ne peux pas modifier votre avatar"))
        }
    }
}