import { SelfBot } from "../..";
import { Message } from "discord.js-selfbot-v13";

module.exports = {
    name: "sethypesquad",
    description: "Changer votre hypesquad",
    execute: async (client: SelfBot, message: Message, args: string[]) => {
        const hypesquadlist = ["bravery", "brilliance", "balance", "clear"];
        const hypesquad = (house: string) => {
            switch (house) {
                case "clear":
                    return "LEAVE";
                case "bravery":
                    return "HOUSE_BRAVERY";
                case "brilliance":
                    return "HOUSE_BRILLIANCE";
                case "balance":
                    return "HOUSE_BALANCE";
                default:
                    return "LEAVE";
            }
        };
        if (!args[0] || !hypesquadlist.includes(args[0])) return message.edit(`Veuillez entrer l'une de ces options : ${hypesquadlist.map(o => `\`${o}\``).join(', ')}`);
        client.user?.setHypeSquad(hypesquad(args[0]))
            .then(() => message.edit("Votre hypesquad a été modifiée"))
            .catch(() => message.edit("Je n'ai pas pu modifier votre hypesquad"));
    }
};
