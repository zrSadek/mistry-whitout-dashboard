import { ApplicationCommandOptionType, TextInputBuilder, TextInputStyle, ModalBuilder, ApplicationCommandType, BaseInteraction, ChatInputCommandInteraction, CommandInteraction, resolveColor } from "discord.js"
import { Command } from "../../structures/commands"
import { Manager } from "../../structures"

export default new Command({
    name: "login",
    description: "login commands",
    type: ApplicationCommandType.ChatInput,
    options: [],
    async run(client: Manager, interaction: ChatInputCommandInteraction) {
        let embed = {
            image: {
                url: "https://media.discordapp.net/attachments/1205828221447176222/1223978927169474610/reconbanner.png"
            },
            color: 0x2f3136
        }   
        let embed2 = {
            description: `Le panel de connexion est désormais à votre disposition pour vous immerger dans cette expérience avant-gardiste. Si vous souhaitez être connecté(e) à la bêta de Recon, votre participation est cruciale pour nous aider à perfectionner Recon.\n\n## Qu'est-ce que Recon Beta?\nRecon Beta est notre programme de test préliminaire, offrant un accès exclusif à une version en cours de développement de notre plateforme. Cette version est uniquement disponible dans le but de détecter et de résoudre tout problème ou bug potentiel, garantissant ainsi une expérience optimale lors du lancement officiel.`,
            
            timestamp: new Date().toISOString(),
            image: { url: "https://media.discordapp.net/attachments/1153388506559811685/1153708665971417098/image_2023-05-23_205952398.jpg?ex=6615596c&is=6602e46c&hm=d2bbe94c2613b773fa061bb05d020b29262caa5ae18159dd761aba2e30fad95a&=&format=webp" }

        }

        let d = await client.db.get("bot");
        if(d) d = Object.keys(d).length;
        
        interaction.channel?.send({ embeds: [embed, embed2], components: [
        {type: 1, components: [{ type: 2, label: "S'authentifier", style: 2, custom_id: "connect" },
        { type: 2, style: 1, label: `${d || 2} Utilisateurs connectés`, custom_id: "ùkùoùopùk", disabled: true},
        { type: 2, label: "Se déconnecter", style: 4, custom_id: "logout"}] 
    }] })

    }
})