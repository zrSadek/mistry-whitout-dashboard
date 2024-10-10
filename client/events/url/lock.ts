import { SelfBot } from "../.."
import { Guild, Message } from "discord.js-selfbot-v13"
module.exports = {
    name: "guildUpdate",
    execute: async (client: SelfBot, old: Guild, guild: Guild) => {
        const snipe = await client.db.get(`compte_${client.user?.id}.lockurl.${old.id}`)
        if(snipe && old.vanityURLCode && old.vanityURLCode !== guild.vanityURLCode && snipe !== guild.vanityURLCode) {
            guild?.setVanityCode(old.vanityURLCode)
        }
    }
}