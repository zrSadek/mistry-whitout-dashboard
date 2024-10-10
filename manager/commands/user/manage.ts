import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js"
import { Manager } from "../../structures"
import { Command } from "../../structures/commands"

export default new Command({
    name: "manage",
    description: "ezefzed",
    type: ApplicationCommandType.ChatInput,
    options: [],
    async run(client: Manager, interaction: CommandInteraction) {
        let d = await client.bots.checkUser(interaction.user.id)
        if (!d.state) return interaction.reply({ content: "Vous n'êtes pas connecté sur Recxn", ephemeral: true })
        let config = await client.db.get(`compte_${interaction.user.id}`)
        let embed = {
            description: `Facilitez la gestion de votre compte Recxn en affichant directement vos paramètres avec notre bot.
                
                Préfix: ${await client.db.get(`compte_${interaction.user.id}.prefix`) || "&"}
                AntiSnipe: ${await client.db.get(`compte_${interaction.user.id}.antisnipe`) ? await client.db.get(`compte_${interaction.user.id}.antisnipe`) : "Message de base \"1337\""}

                > ⚠️ Ces configurations sont enregistrées sur votre compte.`,
            color: 0x2f3136,
            author: { name: interaction.user.tag, iconURL: interaction.user.avatarURL() },
            footer: { text: interaction.guild?.name || "", iconURL: interaction.guild?.iconURL() || undefined },
            timestamp: new Date().toISOString(),
            image: { url: "https://media.discordapp.net/attachments/1153388506559811685/1153708665971417098/image_2023-05-23_205952398.jpg?ex=6615596c&is=6602e46c&hm=d2bbe94c2613b773fa061bb05d020b29262caa5ae18159dd761aba2e30fad95a&=&format=webp" }
        }
        interaction.reply({ embeds: [embed], ephemeral: true, components: [{ type: 1, components: [{ type: 2, label: "Changer votre prefix", style: 1, custom_id: "prefix" }, { type: 2, label: "Changer le message de l'antisnipe", style: 1, custom_id: "antisnipe" }, { type: 2, label: "Se déconnecter", style: 4, custom_id: "logout" }] }] })
    }
})