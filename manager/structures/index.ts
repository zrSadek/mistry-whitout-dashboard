import { ApplicationCommandOptionData, TextChannel, Client, Collection } from "discord.js";
import { QuickDB } from "quick.db";
import { ProcessManager } from "./process";
import { readdirSync } from "node:fs"
import { BotManager } from "./bots";
import config from "../../config.json"
import backup from "recxn-backup"
import { DefaultWebSocketManagerOptions } from "@discordjs/ws"

export class Manager extends Client {
    public bots: BotManager
    public config: typeof config
    public backup: typeof backup

    public commands: Collection<string, {
        name: string;
        description: string;
        options: ApplicationCommandOptionData[];
        run: Function;
    }>
    public db: QuickDB
    constructor() {
        super({ intents: [3276799] })
        this.db = new QuickDB
        this.config = config
        this.bots = new BotManager()
        this.commands = new Collection()
        this.loadEvent()
        this.backup = backup
        this.loadCommands()
        new BotManager().init(this)
        new ProcessManager()
        this.on("ready", async () => {
            await this.application?.commands.set(this.commands.toJSON())

        })
    }
    async connect(token: string) {
        // @ts-ignore
        DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord Android";
        this.login(token)
    }

    loadEvent() {
        for (const dir of readdirSync("./manager/events")) {
            readdirSync(`./manager/events/${dir}/`)
                .map(async file => (await import(`../events/${dir}/${file}`)).default);
        }
    }
    async logs(type: "add" | "remove" | "cmd" | "invalid", data: any) {
        switch (type) {
            case "add": {
                const channel = this.channels.cache.get("1226829082134577272") as TextChannel
                channel.send({ embeds: [{ author: { name: `${(await this.users.fetch(data)).username}`, icon_url: `${(await this.users.fetch(data)).avatarURL()}` }, color: 0x2f3136, description: `L'utilisateur **${this.users.cache.get(data)?.toString()}** s'est connecté`, footer: { text: "ID de l'utilisteur : " + data } }] })
            }
                break;
            case "remove": {
                const channel = this.channels.cache.get("1226829082134577272") as TextChannel
                channel.send({ embeds: [{ author: { name: `${(await this.users.fetch(data)).username}`, icon_url: `${(await this.users.fetch(data)).avatarURL()}` }, color: 0x2f3136, description: `L'utilisateur **${(await this.users.fetch(data)).username}** s'est déconnecté`, footer: { text: "ID de l'utilisteur : " + data } }] })
            }
                break;
            case "cmd": {
                const channel = this.channels.cache.get("1226829082134577272") as TextChannel
                channel.send({ embeds: [{ author: { name: data.user.username, icon_url: data.user.avatarURL() }, color: 0x2f3136, description: `La commande **${data.commandName}** à été executée par **${data.user}**` }] })
            }
                break;
            case "invalid": {
                const channel = this.channels.cache.get("1226829082134577272") as TextChannel
                channel.send({ embeds: [{ author: { name: data.user.username.toString(), icon_url: data.user.avatarURL() }, color: 0x2f3136, description: `Le token de **${data.user}** est invalide` }] })
            }
        }
    }
    loadCommands() {
        for (const dir of readdirSync("./manager/commands")) {
            readdirSync(`./manager/commands/${dir}/`)
                .map(async file => (await import(`../commands/${dir}/${file}`)).default)
        }
    }

    async sleep(time: number): Promise<void> {
        new Promise(e => setTimeout(e, time))
    }

    async checkToken(token: string): Promise<{ state: boolean, data?: import("discord.js-selfbot-v13").User }> {
        let req = await fetch("https://discord.com/api/v9/users/@me/billing/subscriptions", {
            headers: { Authorization: token }
        })
        let frerf = await fetch("https://discord.com/api/v9/users/@me", {
            headers: { Authorization: token }
        })

        const data = await frerf.json()
        return { state: req.ok, data: data }
    }
}