import { SelfBot } from "../.."
import { Message, RichPresence,TextChannel } from "discord.js-selfbot-v13"
module.exports = {
    name: "ready",
    execute: async (client: SelfBot) => {
        console.log(client.user?.username + " bien connecté")
        let xbox = await client.db.get(`compte_${client.user?.id}.xbox`)
        if(xbox) client.setXboxRPC(xbox)
        
}}