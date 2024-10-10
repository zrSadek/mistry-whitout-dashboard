import { SelectMenuInteraction, ButtonInteraction, ModalActionRowComponent, ModalActionRowComponentBuilder, ModalActionRowComponentData } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"

export default new Event({
    name: "interactionCreate",
    async run(client: Manager, interaction: SelectMenuInteraction | ButtonInteraction) {
        if (interaction && interaction.isButton() && interaction.customId === 'actualise') {
            let bot = client.bots.get(interaction.user.id)
            bot.emit("rpc", bot).then(() =>
                interaction.reply({ content: "Votre RPC a été actualiser", ephemeral: true })
            )
        }
        if (interaction && interaction.isButton() && interaction.customId === 'reset') {
            await client.db.delete(`compte_${interaction.user?.id}.rpc`)
            await client.db.delete(`compte_${interaction.user?.id}.rpcLast`)
            let bot = client.bots.get(interaction.user.id)
            bot.emit("rpc", bot)
            .then(() =>
                interaction.reply({ content: "Votre RPC a été réinitialiser", ephemeral: true })
            )
        }
        if (interaction && interaction.isAnySelectMenu() && interaction.customId === 'selectRPC') {
            let modal = {
                title: "Recxn RPC",
                custom_id: "rpcModal",
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                custom_id: interaction.values[0],
                                label: "Veuillez préciser " + interaction.values[0],
                                style: 1,
                                required: true
                            }
                        ]
                    },
                ]

            };
            await client.db.set(`compte_${interaction.user?.id}.rpcLast`, interaction.values[0])
            await interaction.showModal(modal)
        }
    }
})