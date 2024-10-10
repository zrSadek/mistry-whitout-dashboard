import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
import fs from "fs"
module.exports = {
    name: "backup",
    args: {
        "delete": "Supprimer une backup",
        "list": "Permet de voir vos backup",
        "create": "Créer une backup",
        "load": "Charger une backup"
    },
    cooldown: true,
    description: "Voir la liste des commandes backup",
    execute: async (client: SelfBot, message: Message, args: string, prefix: string) => {
        switch (args[0]) {
            case "delete":
                if (!message.inGuild()) return message.delete().catch(() => { })
                let settings = await client.db.get(`compte_${client.user?.id}.backupList`)
                if (!settings.includes(args[1])) return message.delete().catch(() => false)
                if (!settings.includes(args[1])) {
                    message.delete()
                } else {
                    settings = settings.filter((x: any) => x !== args[1])
                }
                if (!args) return message.delete().catch(() => false)
                await client.backup.remove(args[1]).then(() => message.edit('*Backup supprimée*'))
                await client.db.set(`compte_${client.user?.id}.backupList`, settings)
                break;
            case "list":
                message.edit('*Pour voir vos backups, veuillez utilisé le bot manager de Recxn*')
                break;
            case "create":
                if (!message.inGuild()) return message.delete().catch(() => { })
                message.edit('Je suis entrain de créer la backup du serveur')
                await client.backup.create(message.guild, {
                    doNotBackup: ["bans", "emojis"]
                }
                ).then((e: any) => {
                    message.edit('La backup du serveur a été créer ' + e.id)
                    client.db.push(`compte_${client.user?.id}.backupList`, e.id)
                })
                break;
            case "load":
                if (!message.inGuild()) return message.delete().catch(() => { })
                message.edit('Backup')
                await client.backup.load(args[1], message.guild)
                break;
            default: 
                message.edit(`▸ __**Recxn - Commandes Backup**__\n${["create", "load", "list", "delete"].map(e => "* \`" + prefix + e + " - " + client.commands.get("backup").args[e]).join("\`\n")}`)
            break;
        }

    }
}