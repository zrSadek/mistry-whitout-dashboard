import { CommandInteraction, InteractionType } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"
import gradient from "gradient-string"
export default new Event({
    name: "interactionCreate",
    async run(client: Manager, interaction: CommandInteraction) {
        if (!interaction.isCommand()) return
        let perm = false;
        if (interaction.commandName != "manage" && interaction.commandName != "rpc" && interaction.commandName != "backup") {
            if (!client.config.whitelist.includes(interaction.user.id)) perm = true
        }
        await client.logs("cmd", interaction)
        if (perm) return interaction.reply({ content: "Vous n'êtes pas autorisé à utiliser cette commande !", ephemeral: true })
        if (interaction.isCommand()) client.commands.get(interaction.commandName)?.run(client, interaction)
        
    }
})  