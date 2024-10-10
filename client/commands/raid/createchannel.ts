import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "createchannel",
    description: "Créer 100 salons sur un serveur",
    cooldown: true,
    execute: async (client: SelfBot, message: Message, args: string) => {
        if (!message.guild) return message.edit(`*Veuillez exécuter cette command sur un **serveur***`,)
        if (!message.guild?.members.me?.permissions.has("MANAGE_CHANNELS") || !message.guild?.members.me?.permissions.has("ADMINISTRATOR") || message.guild?.ownerId !== client.user?.id) return message.edit("*Vous ne disposez pas des **permissions** nécessaires sur le serveur*").catch(() => { })
        for (let i = 0; i < 20; i++) {
            message.guild.channels.create(args[0] || "Recxn").catch(() => false)
        }
    }
}
