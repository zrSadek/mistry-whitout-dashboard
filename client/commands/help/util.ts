import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
import fs from "fs"
module.exports = {
    name: "utils",
    description: "Voir la liste des commandes utiles",
    execute: async (client: SelfBot, message: Message, args: string) => {
        let prefix = await client.db.get(`compte_${client.user?.id}.prefix`) || "&"
        const commandsUtil = []
        const commandUtilFiles = fs.readdirSync(`./client/commands/utils`).filter(file => file.endsWith('.ts'));
        for (const file of commandUtilFiles) {
            const command = require(`../utils/${file}`);
            commandsUtil.push(`* \`${prefix}${command.name}\` - \`${command.description}\``);
        }
        message.edit(`▸ __**Recxn - Commandes Utiles**__\n ${commandsUtil.map(c => c).join('\n')}`)
    }
}