import { SelfBot } from "../.."
import { Message, GroupDMChannel, User } from "discord.js-selfbot-v13"
module.exports = {
    name: "channelRecipientRemove",
    execute: async (client: SelfBot, channel: GroupDMChannel, user: User) => {
        if (await client.db.has(`compte_${client.user?.id}.antigroup_${channel.id}`)) {
            channel.addUser(user).catch(() => { })
        }
    }
}