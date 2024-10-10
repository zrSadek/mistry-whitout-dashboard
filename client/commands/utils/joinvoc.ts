import { SelfBot } from "../.."
import { Message, VoiceChannel } from "discord.js-selfbot-v13"
import { joinVoiceChannel } from "@discordjs/voice"
module.exports = {
    name: "voice",
    description: "Rejoindre un salon vocal",
    execute: async (client: SelfBot, message: Message, args: string) => {
        switch (args[0]) {
            case "join": {
                let channel: VoiceChannel | undefined;
                if (client.channels.cache.has(args[0]) && client.channels.cache.get(args[0])?.isVoice()) channel = client.channels.cache.get(args[0]) as VoiceChannel;
                if (message.mentions.channels.first() && message.mentions.channels.first()?.isVoice()) channel = message.mentions.channels.first() as VoiceChannel;
                if (!channel?.full && !channel?.joinable) return message.delete().catch(() => { });
                if (joinVoice(channel)) {
                    message.edit({ content: `J'ai rejoins **${channel?.toString()}**` })
                } else return message.delete().catch(() => { });
            }
            break;
            case "list": {
                
            }
        }
    }



}

function joinVoice(channel: VoiceChannel | undefined): boolean {
    if (!channel?.id || !channel || channel.guild.voiceStates.cache.has(channel.guildId)) return false;
    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: true,
        selfDeaf: true
    })
    return true
}