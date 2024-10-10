import { ClientEvents } from "discord.js";
import Manager from "../.."

export class Event {
    constructor(options: {
        name: keyof ClientEvents;
        run: Function;
    }) {
        Manager.on(String(options.name), async (...args) => options.run(Manager, ...args))
    }
}

