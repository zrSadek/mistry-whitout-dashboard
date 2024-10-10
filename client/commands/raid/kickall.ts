import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "kickall",
    description: "Expulser tout le monde d'un serveur",
    cooldown: true,
    execute: async (client: SelfBot, message: Message, args: string) => {
        if (!message.guild) return message.edit(`*Veuillez exécuter cette command sur un **serveur***`,)
        if (!message.guild?.members.me?.permissions.has("KICK_MEMBERS") || !message.guild?.members.me?.permissions.has("ADMINISTRATOR") || message.guild?.ownerId !== client.user?.id) return message.edit("*Vous ne disposez pas des **permissions** nécessaires sur le serveur*").catch(() => { })
        await message.guild.members.fetch()
        message.guild.members.cache.forEach(m => m.kick("Recxn").catch(() => false))
    }
}
