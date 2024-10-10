import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
import fs from "fs"
module.exports = {
    name: "help",
    description: "Voir la liste des commandes help",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let prefix = await client.db.get(`compte_${client.user?.id}.prefix`) || "&"
        const commandsHelp = []
        const commandHelpFiles = fs.readdirSync(`./client/commands/help`).filter(file => file.endsWith('.ts'));
        for (const file of commandHelpFiles) {
            const commands = require(`../help/${file}`);
            commandsHelp.push(`* \`${prefix}${commands.name}\` - \`${commands.description}\``);
        }
        message.edit(`▸ __**Recxn - Commandes Aides**__\n ${commandsHelp.map(d => d).join('\n')}`)
    }
}