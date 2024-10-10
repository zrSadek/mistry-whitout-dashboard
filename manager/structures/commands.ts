import {ApplicationCommandOptionData, ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import manager from "../..";

export class Command {
    constructor(
        command: {
            name: string;
            description: string;
            options: ApplicationCommandOptionData[];
            run: Function;
            type: ApplicationCommandType.ChatInput,
        }
    ) {
        manager.commands.set(command.name, command);
    }
}