import { SelfBot } from "../.."
import { Guild, Message, TextChannel } from "discord.js-selfbot-v13"
import { request } from "undici"
import { WebhookClient } from "discord.js"
module.exports = {
    name: "guildUpdate",
    execute: async (client: SelfBot, old: Guild, guild: Guild) => {

        const snipe = await client.db.get(`compte_${client.user?.id}.snipe`)
        if (Boolean(snipe) && old.vanityURLCode && guild.id === snipe.snipe && old.vanityURLCode !== guild.vanityURLCode && client.guilds.cache.has(snipe.target) && client.guilds.cache.get(snipe.target)?.features.includes("VANITY_URL") && (client.guilds.cache.get(snipe.target)?.members.me?.permissions.has("MANAGE_GUILD") || client.guilds.cache.get(snipe.target)?.members.me?.permissions.has("ADMINISTRATOR") || client.guilds.cache.get(snipe.target)?.ownerId === client.user?.id)) {
            const now = Date.now();
            request(`https://discord.com/api/v9/guilds/${snipe.target}/vanity-url`, {
                "headers": {
                    "Authorization": `${client.token}`,
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify({
                    "code": old.vanityURLCode
                }),
                "method": "PATCH",
            }).then((e) => {
                if (e.statusCode === 200) {
                    const date = Date.now() - now;
                    const aa = client.guilds.cache.get(snipe.target);
                    if (aa && aa.channels.cache.size > 0) {
                        let w = aa.channels.cache.filter((e) => e.isText() && e.guild.rulesChannelId !== e.id && aa.members.me && e.permissionsFor(aa.members.me).has("MANAGE_WEBHOOKS") && e.permissionsFor(aa.members.me).has("VIEW_CHANNEL"))
                        .random() as TextChannel
                        w.createWebhook("Recon Sniper 1337", { avatar: "https://media.discordapp.net/attachments/1226094709974237234/1226094859874599002/a7f5c1f5599126362dc5a36f6b7117a6.png?ex=662384d2&is=66110fd2&hm=21d39461177c9e61258575e37dbafaa7d2c7f651ad110f29107da8fa10affc91&=&format=webp&quality=lossless&width=102&height=102" })
                        .then((webhook) => {
                            webhook.send({ embeds: [{ color: 0x2f3136, image: { url: "https://media.discordapp.net/attachments/1226094709974237234/1226098032198549524/reconbanner.webp?ex=662387c6&is=661112c6&hm=58492cf59fa5fdac38d1dddb9591f584860e3a00afaac600ccec78466548e0c0&=&format=webp&width=814&height=304" } },
                             { color: 0x2f3136, description: `*L'url **\`${old.vanityURLCode}\`** vient d'être snipe en **${date}**ms*` }] })
                            .then(()=> webhook.delete().catch(()=> {}))
                        })
                        .catch(()=> {})
                    }
                }
            });
        }
    }
}