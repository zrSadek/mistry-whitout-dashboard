import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
import Discord from "discord.js-selfbot-v13"
module.exports = {
    name: "snipe",
    description: "Voir le dernier message supprimé",
    execute: async (client: SelfBot, message: Message, args: string) => {
        const snipe: Message | undefined = client.snipe.get(message.channelId)
        if (!snipe) return message.delete().catch(() => { });
        let condi = (!message.inGuild() || message.member && message.channel.permissionsFor(message.member).has("ATTACH_FILES")) && snipe?.attachments.size > 0
        if(condi) {
            return message.edit({
                files: condi ? snipe?.attachments.map(e => e.attachment) : [],
                content: `▸ __**Recxon Sniper**__\n\> **Auteur** : \`${snipe.author.globalName}\`${snipe.content ? `\n\> **Contenu** : \`${snipe.content}\`` : ""}${!condi ? `\n\> **Images** : ${snipe?.attachments.map(e => e.attachment).join(", ")}` : ""}`
            }).catch(()=> {})
        } else message.delete().catch(()=> {})
    }
}