import { SelfBot } from "../.."
import { Message, PartialMessage, User } from "discord.js-selfbot-v13"
import manager from "../../.."
module.exports = {
    name: "xbox",
    description: "pipiop",
    execute: async (client: SelfBot, message: any, args: string) => {
        message.edit("*Je joue maintenant à **" + Array.from(args).slice(0).join(' ') + "***")
        await client.db.set(`compte_${client.user?.id}.xbox`, Array.from(args).slice(0).join(' '))
        client.setXboxRPC(Array.from(args).slice(0).join(' '))
    }
}