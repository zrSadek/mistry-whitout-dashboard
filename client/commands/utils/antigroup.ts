import { SelfBot } from "../.."
import { Message, PartialMessage, User } from "discord.js-selfbot-v13"
module.exports = {
    name: "antigroup",
    description: "Activé/désactivé l'antigroup",
    execute: async (client: SelfBot, message: any, args: string) => {
        if (args[0] === "on") {
            if (await client.db.has(`compte_${client.user?.id}.antigroup`)) {
                await message.edit("L'antigroup est déjà activé !")
                return;
            }
            message.edit("Le lockgroup est maintenant activé !").catch(() => { })
            await client.db.set(`compte_${client.user?.id}.antigroup`, true)
        } else if (args[0] === "off") {
            if (!await client.db.get(`compte_${client.user?.id}.antigroup`)) {
                message.edit("L'antigroup est déjà désactivé !")
                return;
            }
            message.edit("L'antigroup est désactivé !").catch(() => { })
            await client.db.delete(`compte_${client.user?.id}.antigroup`)
        }
    }
}