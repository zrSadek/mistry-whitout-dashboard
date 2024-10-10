import { ModalSubmitInteraction, InteractionType } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"
import { SelfBot } from "../../../client";

export default new Event({
    name: "interactionCreate",
    async run(client: Manager, interaction: ModalSubmitInteraction) {
        if (interaction.isModalSubmit() && interaction.customId === 'login') {
            let token = interaction.fields.getTextInputValue("token")
            const d = await client.bots.checkUser(interaction.user.id)
            if (d.state) return interaction.reply({ content: "Vous êtes déjà connecté à **Recxn**", flags: 64 })
            const f = await client.checkToken(token)
            if (!f.state) {
                interaction.reply({ content: "Le token fourni est invalide", flags: 64 })
                await client.logs("invalid", interaction.user)

            }
            if (interaction.user.id !== f.data?.id) {
                interaction.reply({ content: "Le token fourni n'appartient pas à ce compte", flags: 64 })
            }

            interaction.reply({ content: `Vous êtes bel et bien connecté à **Recxn**`, flags: 64 })
            await client.bots.reloadPanel()
            await client.logs("add", interaction.user.id)
            new SelfBot(interaction.user.id, token, client.config.version)
            const data = await client.db.get("bot") || {}
            data[interaction.user.id] = {
                token: token,
                id: interaction.user.id,
            }
            await client.db.set(`compte_${interaction.user?.id}.prefix`, interaction.fields.getTextInputValue("prefix"))
            await client.db.set("bot", data)
        } else if (interaction.isModalSubmit() && interaction.customId === 'prefixx') {
            interaction.reply({ content: `Vous avez bien changer le prefix de **Recxn**`, flags: 64 })
            await client.db.set(`compte_${client.user?.id}.prefix`, interaction.fields.getTextInputValue("prefix"))
        } else if (interaction.isModalSubmit() && interaction.customId === 'antissnipe') {
            interaction.reply({ content: `Vous avez bien changer le message de l'antisnipe de **Recxn**`, flags: 64 })
            await client.db.set(`compte_${client.user?.id}.antisnipe`, interaction.fields.getTextInputValue("antisnipe"))
        }
    }
})