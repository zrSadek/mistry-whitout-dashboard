import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js"
import { Manager } from "../../structures"
import { Command } from "../../structures/commands"

export default new Command({
    name: "rpc",
    description: "ezefzed",
    type: ApplicationCommandType.ChatInput,
    options: [],
    async run(client: Manager, interaction: CommandInteraction) {
        let d = await client.bots.checkUser(interaction.user.id)
        if (!d.state) return interaction.reply({ content: "Vous n'êtes pas connecté sur Recxn", ephemeral: true })
        const menu: any = {
            type: 1,
            components: [
                {
                    customID: "selectRPC",
                    disabled: false,
                    options: [{
                        label: "Nom",
                        value: "name",
                        description: "Modifié le nom du RPC",
                    },
                    {
                        label: "State",
                        value: "state",
                        description: "Modifié le state du RPC",
                    },
                    {
                        label: "Détails",
                        value: "detail",
                        description: "Modifié les détails du RPC",
                    },
                    {
                        label: "Temps de jeux",
                        value: "time",
                        description: "Modifié le temps passé avec le RPC",
                    },
                    {
                        label: "Grande image",
                        value: "image1",
                        description: "Modifié la grande image",
                    },
                    {
                        label: "Petite image",
                        value: "image2",
                        description: "Modifié la petite image",
                    },
                    {
                        label: "Nom Bouton 1",
                        value: "button1.name",
                        description: "Modifié le nom du bouton 1",
                    },
                    {
                        label: "Nom Bouton 2",
                        value: "button2.name",
                        description: "Modifié le nom du bouton 2",
                    },
                    {
                        label: "Lien Bouton 1",
                        value: "button1.link",
                        description: "Modifié le lien du bouton 1",
                    },
                    {
                        label: "Lien Bouton 2",
                        value: "button2.link",
                        description: "Modifié le lien du bouton 2",
                    },],
                    type: 3
                }
            ]
        }
        const buttonsRow = {
            type: 1,
            components: [
                {
                    type: 2,
                    label: "Réinitialiser le RPC",
                    style: 2,
                    customID: "reset"
                }
            ]
        }

        const data = await client.db.get(`compte_${interaction.user?.id}.rpc`)
        let embed = {
            description: `Facilitez la gestion de votre compte Recxn en affichant directement votre depuis notre bot.`,
            color: 0x2f3136,
            fields: [
                { name: "Nom", value: data?.name || "Aucun" },
                { name: "State", value: data?.state || "Aucun" },
                { name: "Détails", value: data?.details || "Aucun" },
                { name: "Temps de jeux", value: data?.time || "Aucun" },
                { name: "Texte sur la grande image", value: data?.image1 || "Aucun" },
                { name: "Texte sur la petite image", value: data?.image2 || "Aucun" },
                { name: "Bouton 1", value: `${data?.button1?.name || "Aucun"} - ${data?.button1?.link || "Aucun lien"}` },
                { name: "Bouton 2", value: `${data?.button2?.name || "Aucun nom"} - ${data?.button2?.link || "Aucun lien"}` },

            ],
            author: { name: "⚠️ Ces paramètres RPC sont enregistrées sur votre compte.", iconURL: interaction.user.avatarURL() },
            footer: { text: interaction.guild?.name || "", iconURL: interaction.guild?.iconURL() || undefined },
            timestamp: new Date().toISOString(),
            image: { url: "https://media.discordapp.net/attachments/1153388506559811685/1153708665971417098/image_2023-05-23_205952398.jpg?ex=6615596c&is=6602e46c&hm=d2bbe94c2613b773fa061bb05d020b29262caa5ae18159dd761aba2e30fad95a&=&format=webp" }
        }
        interaction.reply({ embeds: [embed], components: [menu, buttonsRow], ephemeral: true });

    }
})