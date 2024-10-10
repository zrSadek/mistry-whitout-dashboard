import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "messageDelete",
    execute: async (client: SelfBot, message: Message) => {
        if (!message.type || !message.id) message = await message.fetch().catch(() => message)
        let blword = ["vbv", "1337"]
        if (blword.includes(message.content)) return;
        let snipe = client.antisnipe.get(message.channelId)
        if (snipe?.includes(message.id)) return;
        if (!blword.includes(message.content) && message?.author?.id === client.user?.id) {
            message.channel.send("1337").then(e => e.delete()).catch(() => { })
        } else if (!blword.includes(message.content) && message?.author?.id !== client.user?.id && !message.mentions.everyone && !(message.mentions.roles.size > 0 && message.mentions.users.size > 3)) {
            return client.snipe.set(message.channelId, message)
        }
    }
}