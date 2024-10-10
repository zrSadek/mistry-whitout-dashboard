import { SelfBot } from "../.."
import { Message, DMChannel, PartialDMChannel, NewsChannel, TextChannel, ThreadChannel } from "discord.js-selfbot-v13"
module.exports = {
    name: "clear",
    description: "Supprimé tout ses messages",
    execute: async (client: SelfBot, message: Message, args: string) => {
        if (parseInt(message?.content?.split(" ")[1]) <= 100) {
            let messages = (await message.channel.messages.fetch({ limit: parseInt(message?.content?.split(" ")[1]) })).filter((e) => e.author.id === client.user?.id)
            client.antisnipe.set(message.channel.id, messages.map(e => e.id))
            await message.client.sleep(1337)
            for (let msg of messages) {
                await message.client.sleep(1200)
                msg[1].delete().catch(() => { })
            }
        }
        message.delete().catch(() => { })
        await message.client.sleep(1337)
        message.delete().catch(() => { })
        await client.sleep(1350)
        let channel: DMChannel | PartialDMChannel | NewsChannel | TextChannel | ThreadChannel | undefined = undefined;
        let before: string | undefined = undefined;
        if (client.users.cache.has(args[0])) channel = client.users.cache.get(args[0])?.dmChannel as DMChannel
        if (client.channels.cache.has(args[0])) channel = client.channels.cache.get(args[0]) as TextChannel
        if (!channel) channel = message.channel as TextChannel;
        if (channel) {
            const messages = (await channel.messages.fetch({ limit: 100 })).filter((e: Message) => e.author.id === client.user?.id)
            if (messages && messages.size === 0) {
                message.delete().catch(() => { })
                return;
            }
            before = messages?.firstKey();
            return await clearALL(client, channel, before)
        }
    }
}

async function clearALL(client: SelfBot, channel: DMChannel | PartialDMChannel | NewsChannel | TextChannel | ThreadChannel, lastMessageId: string | undefined) {
    if (!lastMessageId) return;
    await client.sleep(1337)
    const messages = (await channel.messages.fetch({ limit: 100, before: lastMessageId })).filter(e => e.author.id === client.user?.id)
    channel.messages.cache.get(lastMessageId)?.delete().catch(() => { })
    if (!messages.lastKey()) return;
    let d = messages.map(e => e.id)
    d.push(lastMessageId)
    client.antisnipe.set(channel.id, d)
    let lastmsg = messages.lastKey()
    for (let message of messages) {
        await client.sleep(1200)
        if (message[1].id !== lastmsg) {
            message[1].delete().catch(() => { })
        } else if (message[1].id === lastmsg) {
            await client.sleep(2060)
            const msg = (await channel.messages.fetch({ limit: 100, before: lastmsg })).filter(e => e.author.id === client.user?.id)
            if (msg.size > 0) return clearALL(client, channel, lastmsg)
            message[1].delete().catch(() => { })
        }
    }
}
