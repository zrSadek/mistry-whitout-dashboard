import { User } from "discord.js";
import { Client, Message, RichPresence } from "discord.js-selfbot-v13";
import manager from "..";
import { Collection } from "discord.js"
import fs from "node:fs"
import { QuickDB } from "quick.db";
import backup from "recxn-backup"
export class SelfBot extends Client {
    public version: boolean
    public commands: Collection<string, any>
    public db: QuickDB
    public snipe: Map<string, Message>
    public antisnipe: Map<string, string[]>
    public backup: typeof backup
    public cooldown: Map<string, number>
    constructor(user: User["id"], token: string, client_version: number) {
        super()
        this.snipe = new Map()
        this.antisnipe = new Map()
        this.cooldown = new Map()
        this.commands = this.loadCommands()
        this.loadEvents()
        this.db = manager.db;
        this.backup = backup
        this.version = client_version === manager.config.version;
        if (manager.bots.has(user) && !this.isReady) {
            this.removeAllListeners()?.destroy();
        }

        this.login(token)

        this.on("ready", () => {
            manager.bots.set(user, this)
        })

        this.on("shardDisconnect", (e) => {
            if (e.reason === "Authentication failed." && e.code === 4004 && e.wasClean) {
                manager.bots.deleteUser(user)
            }
        })
    }


    loadCommands(): Collection<string, any> {
        const commands: Collection<string, any> = new Collection();
        for (let dir of fs.readdirSync("./client/commands")) {
            fs.readdirSync("./client/commands/" + dir).forEach((file: string) => {
                var data: { name: string, description: string, execute: void } = require("./commands/" + dir + "/" + file)
                commands.set(data.name, data)
            })
        }
        return commands;
    }

    loadEvents() {
        for (let dir of fs.readdirSync("./client/events")) {
            fs.readdirSync("./client/events/" + dir).forEach(file => {
                var data = require("./events/" + dir + "/" + file)
                this.on(data.name, async (...args) => data.execute(this, ...args))
            })
        }
    }
    setXboxRPC(name: string) {
        this.user?.setPresence({
            activities: [new RichPresence()
                .setType("PLAYING")
                .setApplicationId("438122941302046720")
                .setStartTimestamp(new Date())
                .setName(name)]
        })
    }
}
