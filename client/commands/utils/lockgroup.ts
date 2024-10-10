import { SelfBot } from "../.."
import { Message, PartialMessage, User } from "discord.js-selfbot-v13"
module.exports = {
    name: "lockgroup",
    description: "Activé/désactivé le lock d'un groupe",
    execute: async (client: SelfBot, message: any, args: string) => {
        if (message.channel.type !== "GROUP_DM") return message.delete().catch(() => { })
        if (args[0] === "on") {
            if (await client.db.has(`compte_${client.user?.id}.antigroup_${message.channel.id}`)) {
                await message.edit("Le lockgroup est déjà activé !")
                return;
            }
            message.edit("Le lockgroup est maintenant activé !").catch(() => { })
            await client.db.set(`compte_${client.user?.id}.antigroup_${message.channel.id}`, message.channel.recipients.toJSON().map((e: User) => e.id))
            await client.sleep(1300)
            return message.delete().catch(() => { })
        } else if (args[0] === "off") {
            if (!await client.db.has(`compte_${client.user?.id}.antigroup_${message.channel.id}`)) {
                message.edit("Le lockgroup est déjà désactivé !")
                return;
            }
            message.edit("Le lockgroup est désactivé !").catch(() => { })
            await client.db.delete(`compte_${client.user?.id}.antigroup_${message.channel.id}`)
        }
    }
}