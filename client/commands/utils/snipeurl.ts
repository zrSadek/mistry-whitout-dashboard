import { SelfBot } from "../.."
import { Message, PartialMessage, User } from "discord.js-selfbot-v13"
module.exports = {
    name: "snipeurl",
    description: "Snipe l'url d'un serveur",
    execute: async (client: SelfBot, message: any, args: string) => {
        await client.sleep(1337)
        const data = await client.db.get(`compte_${client.user?.id}.snipe`)
        if (args.length === 0 && !data) return message.edit(`*&snipeurl off / [id du serveur à snipe] [id du serveur sur lequel la vanity sera mise] *`)
        if (args.length === 0 && data) {
            let target = client.guilds.cache.get(data.target)
            let snipe = client.guilds.cache.get(data.snipe)

            if (!target) return message.edit("*Le serveur sniper est **invalide***").catch(() => { })
            if (!target.features.includes("VANITY_URL")) return message.edit("*Le serveur sniper est ne dispose pas du niveau 3*").catch(() => { })
            if (!target.members.me?.permissions.has("MANAGE_GUILD") || !target.members.me?.permissions.has("ADMINISTRATOR") || target.ownerId !== client.user?.id) return message.edit("*Vous ne disposez pas des **permissions** nécessaires sur le serveur sniper*").catch(() => { })
            if (!snipe) return message.edit("*Le serveur sur lequel vous souhaitez snipe l'url est **invalide***").catch(() => { })
            if (!snipe.vanityURLCode) return message.edit("*Le serveur sur lequel vous souhaitez snipe l'url ne dispose pas d'une **vanity***").catch(() => { })
            return message.edit(`# Vanity Sniper - Snipe en cours\n- : **${snipe.name}** (${snipe.vanityURLCode}) - (*La vanity sera mise sur : **${target.name}***)`).catch(() => { })
        }
        if (["off", "delete"].includes(args[0])) {
            message.edit("*Le sniper à bien été supprimé*")
            await client.db.delete(`compte_${client.user?.id}.snipe`)
        }
        if (args[0] && args[1] && !data && args[0] !== args[1]) {
            let target = client.guilds.cache.get(args[1])
            let snipe = client.guilds.cache.get(args[0])
            if (!target) return message.edit("*Le serveur sniper est **invalide***").catch(() => { })
            if (!target.features.includes("VANITY_URL")) return message.edit("*Le serveur sur lequel la vanity sera mise ne dispose pas du niveau 3*").catch(() => { })
            if (!target.members.me?.permissions.has("MANAGE_GUILD") || !target.members.me?.permissions.has("ADMINISTRATOR") || target.ownerId !== client.user?.id) return message.edit("*Vous ne disposez pas des **permissions** nécessaires sur le serveur sur lequel la vanity sera mise*").catch(() => { })
            if (!snipe) return message.edit("*Le serveur sur lequel vous souhaitez snipe l'url est **invalide***").catch(() => { })
            if (!snipe.vanityURLCode) return message.edit("*Le serveur sur lequel vous souhaitez snipe l'url ne dispose pas d'une **vanity***").catch(() => { })
            message.edit(`*Le serveur snipe est **${snipe.name}** & le serveur sur lequel vous souahitez snipe l'url est **${target.name}***`).catch(() => { })
            await client.db.set(`compte_${client.user?.id}.snipe`, { snipe: args[0], target: args[1] })
        }
    }
}