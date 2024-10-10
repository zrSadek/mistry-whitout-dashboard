import { CommandInteraction, InteractionType, ButtonInteraction } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"
export default new Event({
    name: "interactionCreate",
    async run(client: Manager, interaction: ButtonInteraction) {
        if (interaction.isButton() && interaction.customId === 'logout') {
            const deco = await client.bots.deleteUser(interaction.user.id)
            if (!deco.state) return interaction.reply({ content: "Oops ! Vous n'êtes pas connecté à Recxn, si vous souhaitez nous **rejoindre** veuillez cliquer sur le bouton ci-dessous !", flags: 64, components: [{type: 1, components: [{ type: 2, label: "S'authentifier", style: 2, custom_id: "connect", emoji: {id: "1224091261854552264"} }]}]})
            await client.bots.reloadPanel()
            return interaction.reply({ content: `Vous avez bien été déconnecté de **Recxn**`, flags: 64 })
        } else if (interaction.isButton() && interaction.customId === 'prefix') {
            const deco = await client.bots.deleteUser(interaction.user.id)
            if (!deco.state) return interaction.reply({ content: "Oops ! Vous n'êtes pas connecté à Recxn, si vous souhaitez nous **rejoindre** veuillez cliquer sur le bouton ci-dessous !", flags: 64, components: [{type: 1, components: [{ type: 2, label: "S'authentifier", style: 2, custom_id: "connect", emoji: {id: "1224091261854552264"} }]}]})
            await client.bots.reloadPanel()
            return interaction.reply({ content: `Vous avez bien été déconnecté de **Recxn**`, flags: 64 })
        }
    }
})