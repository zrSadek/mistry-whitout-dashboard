import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
import fs from "fs"
module.exports = {
    name: "profil",
    description: "Voir la liste des commandes profil",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let prefix = await client.db.get(`compte_${client.user?.id}.prefix`) || "&"
        const commandsProfil = []
        const commandProfilFiles = fs.readdirSync(`./client/commands/profil`).filter(file => file.endsWith('.ts'));
        for (const file of commandProfilFiles) {
            const commands = require(`../profil/${file}`);
            commandsProfil.push(`* \`${prefix}${commands.name}\` - \`${commands.description}\``);
        }
        message.edit(`▸ __**Recxn - Commandes Profil**__\n ${commandsProfil.map(d => d).join('\n')}`)
    }
}