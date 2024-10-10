import { SelfBot } from "../.."
import { Message,GroupDMChannel,User } from "discord.js-selfbot-v13"
module.exports = {
    name: "channelRecipientAdd",
    execute: async (client: SelfBot, channel: GroupDMChannel, user: User) => {
        
        let u = await client.db.get(`compte_${client.user?.id}.antigroup_${channel.id}`)
        if (await client.db.has(`compte_${client.user?.id}.antigroup_${channel.id}`) && !u.includes(user.id)) {
            channel.removeUser(user).catch(()=> {})
        }
    }
}