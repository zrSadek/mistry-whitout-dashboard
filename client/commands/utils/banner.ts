import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "banner",
    description: "Avoir la bannière d'un utilisateur",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let user;
        if (!args[0]) user = message.author
        if (args[0]) user = message.mentions.users.first() || client.users.cache.get(args[0])
        await user?.fetch()
        message.edit({ content: `${user?.bannerURL({ dynamic: true, format: "png", size: 1024 })}` })
    }
}