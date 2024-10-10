import { ButtonInteraction, InteractionType, ModalActionRowComponent, ModalActionRowComponentBuilder, ModalActionRowComponentData } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"

export default new Event({
    name: "interactionCreate",
    async run(client: Manager, interaction: ButtonInteraction) {
        if (interaction.isButton() && interaction.customId === 'connect') {
            let modal = {
                title: "Recon",
                custom_id: "login",
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                custom_id: "token",
                                label: "What's your token",
                                style: 1,
                                required: true
                            }
                        ]
                    },
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                custom_id: "prefix",
                                label: "What's your prefix",
                                min_length: 1,
                                style: 1,
                                max_length: 1,
                                required: true,
                                value: "&"
                            }
                        ]
                    },
                ]

            };
            await interaction.showModal(modal)
        } else if (interaction.isButton() && interaction.customId === 'antisnipe') {
            let modal = {
                title: "Recon",
                custom_id: "antissnipe",
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                custom_id: "antisnipe",
                                label: "What's your new message",
                                min_length: 1,
                                style: 1,
                                max_length: 1000,
                                required: true,
                                value: "&"
                            }
                        ]
                    },
                ]

            };
            await interaction.showModal(modal)
        } else if (interaction.isButton() && interaction.customId === 'prefix') {
            let modal = {
                title: "Recon",
                custom_id: "prefix",
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 4,
                                custom_id: "prefix",
                                label: "What's your new prefix",
                                min_length: 1,
                                style: 1,
                                max_length: 1,
                                required: true,
                                value: "&"
                            }
                        ]
                    },
                ]

            };
            await interaction.showModal(modal)
        }
    }
})