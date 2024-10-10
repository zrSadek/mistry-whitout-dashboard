import { SelfBot } from "../.."
import { Message, PartialMessage, User } from "discord.js-selfbot-v13"
module.exports = {
    name: "lockurl",
    description: "Lock l'url d'un serveur",
    execute: async (client: SelfBot, message: any, args: string, prefix: string) => {
        const data = await client.db.get(`compte_${client.user?.id}.lockurl.${args[0]}`)
        let guilds = await client.db.get(`compte_${client.user?.id}.lockurl`)
        if (args.length === 0 && !data && (!guilds || Object.keys(guilds).filter((e)=> client.guilds.cache.has(e)).length === 0)) return message.edit(`*${prefix}lockurl delete [id du serveur] / [id du serveur]  *`)
        if(["off", "delete"].includes(args[0]) && !await client.db.has(`compte_${client.user?.id}.lockurl.${args[1]}`)) {
            return message.edit(`*Le serveur que vous souhaitez supprimer n'est pas enregistré*`).catch(() => { })
        } 
        if (["off", "delete"].includes(args[0]) && await client.db.has(`compte_${client.user?.id}.lockurl.${args[1]}`)) {
            message.edit("*Le lockurl à bien été supprimé*")
            await client.sleep(1337)
            await client.db.delete(`compte_${client.user?.id}.lockurl.${args[1]}`)
            return message.delete().catch(() => { })
        }
        if (client.guilds.cache.has(args[0]) && data) {
            let snipe = client.guilds.cache.get(args[0])
            if (!snipe) return message.edit("*Le serveur sur lequel vous voulez lock l'url est **invalide***").catch(() => { })
            if (!(snipe.members.me?.permissions.has("MANAGE_GUILD") || snipe.members.me?.permissions.has("ADMINISTRATOR") || snipe.ownerId !== client.user?.id)) return message.edit("*Vous ne disposez pas des **permissions** nécessaires sur le serveur*").catch(() => { })
            if (!snipe) return message.edit("*Le serveur sur lequel vous souhaitez lock l'url est **invalide***").catch(() => { })
            if (!snipe.vanityURLCode) return message.edit("*Le serveur sur lequel vous souhaitez lock l'url ne dispose pas d'une **vanity***").catch(() => { })
            return message.edit(`# Lock URL - Recon\n- **${snipe.name}** (${snipe.vanityURLCode}) `).catch(() => { })
        }
        if(args.length === 0 && Object.keys(guilds).filter((e)=> client.guilds.cache.has(e)).length > 0) {
            return message.edit(`# Lock URL - Recon\n${Object.keys(guilds).map((guild, n)=> `${n}. ${client.guilds.cache.get(guild)?.name} (${client.guilds.cache.get(guild)?.vanityURLCode})`).join("\n")}`).catch(() => { })
        }
        if (args[0] && !data) {
            let target = client.guilds.cache.get(args[0])
            if (!target) return message.edit("*Le serveur sur lequel vous voulez lock l'url est **invalide***").catch(() => { })
            if (!target.features.includes("VANITY_URL")) return message.edit("*Le serveur sur lequel la vanity sera mise ne dispose pas du niveau 3*").catch(() => { })
            if (!(target.members.me?.permissions.has("MANAGE_GUILD") || target.members.me?.permissions.has("ADMINISTRATOR") || target.ownerId === client.user?.id)) return message.edit("*Vous ne disposez pas des **permissions** nécessaires*").catch(() => { })

            message.edit(`*Le serveur **${target.name}** est désormais lock*`).catch(() => { })

            await client.db.set(`compte_${client.user?.id}.lockurl.${args[0]}`, target.vanityURLCode)
        }
    }
}