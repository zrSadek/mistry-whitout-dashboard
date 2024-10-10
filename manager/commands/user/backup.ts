import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js"
import { Manager } from "../../structures"
import { Command } from "../../structures/commands"

export default new Command({
    name: "backup",
    description: "ezefzed",
    type: ApplicationCommandType.ChatInput,
    options: [],
    async run(client: Manager, interaction: CommandInteraction) {
        let test = interaction
        let d = await client.bots.checkUser(interaction.user.id)
        if (!d.state) return interaction.reply({ content: "Vous n'êtes pas connecté sur Recxn", ephemeral: true })
        let settings = await client.db.get(`compte_${interaction.user?.id}.backupList`)
        if (!settings) return interaction.reply({ content: "Vous n'avez pas de backup sur votre compte", ephemeral: true })
        const promises = settings.map((value: any) => client.backup.fetch(value));

        Promise.all(promises)
            .then(backups => {
                const fields = backups.map(e => ({
                    name: e.data.name,
                    value: `Nom du serveur : ${e.data.name}\nID du serveur : ${e.data.guildID}\nID de la backup : ${e.data.id}`
                }));

                let embed = {
                    description: `Facilitez la gestion de votre compte Recxn en affichant directement vos backups depuis notre bot.`,
                    color: 0x2f3136,
                    fields: fields,
                    author: { name: "⚠️ Ces backups sont enregistrées sur votre compte.", iconURL: test.user.avatarURL() },
                    footer: { text: test.guild?.name || "", iconURL: test.guild?.iconURL() || undefined },
                    timestamp: new Date().toISOString(),
                    image: { url: "https://media.discordapp.net/attachments/1153388506559811685/1153708665971417098/image_2023-05-23_205952398.jpg?ex=6615596c&is=6602e46c&hm=d2bbe94c2613b773fa061bb05d020b29262caa5ae18159dd761aba2e30fad95a&=&format=webp" }
                }
                interaction.reply({ embeds: [embed], ephemeral: true });
            })


    }
})