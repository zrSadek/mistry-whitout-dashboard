import { ApplicationCommandOptionType, TextInputBuilder, TextInputStyle, ModalBuilder, ApplicationCommandType, BaseInteraction, ChatInputCommandInteraction, CommandInteraction, resolveColor } from "discord.js"
import { Command } from "../../structures/commands"
import { Manager } from "../../structures"

export default new Command({
    name: "blacklist",
    description: "login commands",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "add", type: ApplicationCommandOptionType.Subcommand,
        description: "de",
        options: [{name: "user", description: "uw", type: ApplicationCommandOptionType.User, required: true}]
    },
    {
        name: "remove", type: ApplicationCommandOptionType.Subcommand,
        description: "dei",
        options: [{name: "user", description: "uw", type: ApplicationCommandOptionType.User, required: true}]
    },
    {
        name: "list", type: ApplicationCommandOptionType.Subcommand,
        description: "diie",
        options: []
    },
    {
        name: "clear", type: ApplicationCommandOptionType.Subcommand,
        description: "diie",
        options: []
    },
],
    async run(client: Manager, interaction: ChatInputCommandInteraction) {
        if(!interaction.guild) return;
        await interaction.deferReply({ephemeral: true})
        switch(interaction.options.data[0].name) {
            case "add": {
                let id = interaction?.options?.data[0]?.options
                if(!id || !id[0]?.user) return;
                let db = await client.db.get("blacklist")
                if(db && db.includes(id[0].user.id)) return interaction.followUp({content: "Cet utilisateur est déjà présent dans la blacklist !", flags: 64})
                await client.db.push("blacklist", id[0].user.id)
                interaction.guild.bans.create(id[0]?.user).catch(()=> {})
                return interaction.followUp({content:  `**${id[0].user.username}** est désormais dans la blacklist !`, flags: 64})
            }
            case "remove": {
                let id = interaction?.options?.data[0]?.options
                if(!id || !id[0]?.user) return;
                let db = await client.db.get("blacklist")
                if(db && !db.includes(id[0].user.id)) return interaction.followUp({content: "Cet utilisateur n'est pas présent dans la blacklist !", flags: 64})
                await client.db.pull("blacklist", id[0].user.id)
                interaction.guild.bans.remove(id[0]?.user).catch(()=> {})
                return interaction.followUp({content: `**${id[0].user.username}** est désormais retiré dans la blacklist !`, flags: 64})
            }
            case "list": {
                let db = await client.db.get("blacklist")
                
                return interaction.followUp({embeds: [{color: 0x2f3136, description: `${db && db.length > 0 ? `${db.map((e: string)=> `<@${e}>`).join(", ")}` : "Aucun utilisateur présent"}`}], flags: 64})
            }
            case "clear": {
                if(!await client.db.has("blacklist")) return interaction.followUp({content: "Il n'y a aucun utilisateur dans la blacklist", flags: 64})
                await client.db.delete("blacklist")
                return interaction.followUp({content: "La blacklist à bien été clear", flags: 64})
            }
        }

    }
})