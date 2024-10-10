import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
import fs from "fs"
module.exports = {
    name: "raid",
    description: "Voir la liste des commandes raid",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let prefix = await client.db.get(`compte_${client.user?.id}.prefix`) || "&"
        const commandsRaid = []
        const commandRaidFiles = fs.readdirSync(`./client/commands/raid`).filter(file => file.endsWith('.ts'));
        for (const file of commandRaidFiles) {
            const commands = require(`../raid/${file}`);
            commandsRaid.push(`* \`${prefix}${commands.name}\` - \`${commands.description}\``);
        }
        message.edit(`▸ __**Recxn - Commandes Raid**__\n ${commandsRaid.map(d => d).join('\n')}`)
    }
}