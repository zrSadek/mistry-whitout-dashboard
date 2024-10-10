import { ModalSubmitInteraction, InteractionType } from "discord.js";
import { Manager } from "../../structures";
import { Event } from "../../structures/events"
import { SelfBot } from "../../../client";

export default new Event({
    name: "interactionCreate",
    async run(client: Manager, interaction: ModalSubmitInteraction) {
        if (interaction.isModalSubmit()) {
            if (interaction.customId === "login" || interaction.customId === "antissnipe" || interaction.customId === "prefix") return
            let test = await client.db.get(`compte_${interaction.user?.id}.rpcLast`)
            await client.db.set(`compte_${interaction.user?.id}.rpc.${test}`, interaction.fields.getTextInputValue(test))
            interaction.reply({ content: "Votre RPC a bien été modifié", ephemeral: true })
            let bot = client.bots.get(interaction.user.id)
            bot.emit("rpc", bot)
        }
    }
})