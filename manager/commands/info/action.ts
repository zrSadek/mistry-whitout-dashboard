import { ApplicationCommandOptionType, ApplicationCommandType,ContextMenuCommandInteraction } from "discord.js"
import { Manager } from "../../structures"
import { Command } from "../../structures/commands"

export default new Command({
    name: "action",
    description: "ezefzed", 
    type: ApplicationCommandType.ChatInput,
    options: [{type: ApplicationCommandOptionType.String, name: "action", description: "uwu", required: true, choices: [
        {
            name: "Redémarrer tout les utilisateurs",
            value: "restart"
        },
        {
            name: "Éteindre tout les utilisateurs",
            value: "stop"
        },
        {
            name: "Démarrer tout les utilisateurs",
            value: "start"
        },
        {
            name: "Supprimer tout les utilisateurs",
            value: "delete"
        },
        {
            name: "Voir tout les utilisateurs",
            value: "show"
        },
    ]}],
    async run(client: Manager, interaction: ContextMenuCommandInteraction) {
        await interaction.deferReply({ephemeral: true})
        switch(interaction.options.data[0].value) {
            case "restart": {
            await client.bots.restartAll()
            await interaction.followUp({content: "Tous les utilisateurs ont bien redémarré"})
            }
            break;
            case "stop": {
                await client.bots.stopAll()
                await interaction.followUp({content: "Tous les utilisateurs ont bien arreté"})
            }
            break;
            case "start": {
                await client.bots.startAll()
                await interaction.followUp({content: "Tous les utilisateurs ont bien démaré"})
            }
            break;
            case "delete": {
                await client.bots.stopAll();
                await client.sleep(1337);
                //await client.db.delete("bot");
                await interaction.followUp({content: "Tous les utilisateurs ont bien été supprimé"})
            }
            break;
            case "show": {
                const data = await client.db.get("bot")
                await interaction.followUp({embeds: [{description: `${Boolean(data) ? `${Object.keys(data).map((e, n)=> `${n + 1}. **<@${e}>** ${client.bots.has(e) ? "`✅`" : "`❌`"}`).join("\n")}` : "Aucun utilisateur"}`}]})
            }
            break;
        }
    }
})