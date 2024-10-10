import { SelfBot } from "../.."
import { Message, GroupDMChannel, User } from "discord.js-selfbot-v13"
module.exports = {
    name: "channelCreate",
    execute: async (client: SelfBot, channel: GroupDMChannel) => {
        if (channel.type === "GROUP_DM" && await client.db.has(`compte_${client.user?.id}.antigroup`) && channel.ownerId !== client.user?.id) {
                fetch(`https://discord.com/api/v9/channels/${channel.id}?silent=true`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `${client.token}`
                    } 
                })
        }
    }
}