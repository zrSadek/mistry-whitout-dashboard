import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "avatar",
    description: "Avoir l'avatar d'un utilisateur",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let user;
        if (!args[0]) user = message.author
        if (args[0]) user = message.mentions.users.first() || client.users.cache.get(args[0])
        message.edit({ content: `${user?.displayAvatarURL({ dynamic: true, size: 4096 })}` })
    }
}