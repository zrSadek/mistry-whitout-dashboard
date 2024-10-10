import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js"
import { Manager } from "../../structures"
import { Command } from "../../structures/commands"

export default new Command({
    name: "delete",
    description: "ezefzed", 
    type: ApplicationCommandType.ChatInput,
    options: [{type: ApplicationCommandOptionType.User, name: "user", description: "uwu", required: true}],
    async run(client: Manager, interaction: CommandInteraction) {
        let user = interaction.options.getUser("user")?.id
        if(user) {
           const d =  await client.bots.deleteUser(user)
           if(!d.state) return interaction.reply({content: d.message, flags: 64}) 
           console.log(user)
           if(d.state) return interaction.reply({content: interaction.options.getUser("user") + " à bien été supprimé de la db !", flags: 64}) 
        }
    }
})