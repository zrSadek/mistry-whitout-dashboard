import { CommandInteraction, InteractionType,ButtonInteraction, GuildMember } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"
export default new Event({
    name: "guildMemberRemove",
    async run(client: Manager, member: GuildMember) {
        if(member.guild.id === "1221226009253118123") {
            if((await client.bots.checkUser(member.id)).state) await client.bots.deleteUser(member.id)
        }
    }
})