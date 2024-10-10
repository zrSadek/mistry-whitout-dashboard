import { SelfBot } from "../.."
import { Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "messageCreate",
    execute: async (client: SelfBot, message: Message) => {
        if (message?.author?.id !== client?.user?.id) return;
        let prefix = await client.db.get(`compte_${client.user?.id}.prefix`)
        if (!message?.content?.startsWith(prefix)) return;
        const args = message?.content?.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();
        if (command) {
            await client.sleep(350)
            let cmd = client.commands.get(command)
            if (cmd?.cooldown) {
                let date = client.cooldown.get(command)
                if (date && date > new Date().getTime() / 1000) {
                    message.edit("*Vous pourrez recommencer la commande dans " + `**<t:${Math.floor(date)}:R>***`).catch(() => { })
                    await client.sleep(2637)
                    message.delete().catch(() => { })
                    return;
                } else {
                    client.cooldown.set(command, Math.floor(new Date().getTime() / 1000) + 900)
                }
            }
            cmd.execute(client, message, args, prefix)
        }
    }
}
