import { Guild, InteractionType } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"
export default new Event({
    name: "guildCreate",
    async run(client: Manager, guild: Guild) {
        await guild.leave()
    }
})
