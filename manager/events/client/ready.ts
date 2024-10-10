import { CommandInteraction, InteractionType } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"
import gradient from "gradient-string"
export default new Event({
    name: "ready",
    async run(client: Manager, interaction: CommandInteraction) {
        console.log(gradient.instagram("Manager: "+client.user?.tag + " en ligne !"));
        await client.bots.reloadPanel()
    }
})
