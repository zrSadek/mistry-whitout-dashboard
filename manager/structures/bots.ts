import { User } from "discord.js"
import manager from "../.."
import { SelfBot } from "../../client"
import { version } from "../../config.json"
import { Manager } from "."
import { TextChannel } from "discord.js-selfbot-v13"
export class BotManager extends Map {
    async init(client: Manager) {
        client.on("ready", async () => {
            const data: Object | null = await manager.db.get("bot")
            if (!data) return;
            for (const user of Object.values(data)) {
                let uwu = await manager.checkToken(user.token)
                if (uwu.state) {
                    await manager.sleep(1337)
                    new SelfBot(user.id, user.token, version)
                } else if (!uwu.state) {
                    console.log(`delete: ${user.id}`)
                    await manager.bots.deleteUser(user.id)
                }
            }
        })
    }
    async reloadPanel() {
        const channel = await manager.channels.fetch("1226829047019995186") as TextChannel | null
        const msg = await channel?.messages.fetch("1226831960484216843")
        let embed = {
            image: {
                url: "https://media.discordapp.net/attachments/1205828221447176222/1223978927169474610/reconbanner.png"
            },
            color: 0x2f3136
        }
        let embed2 = {
            description: `Le panel de connexion est désormais à votre disposition pour vous immerger dans cette expérience avant-gardiste. Si vous souhaitez être connecté(e) à la bêta de Recon, votre participation est cruciale pour nous aider à perfectionner Recon.\n\n## <:emoji_1:1224091229675851846> Qu'est-ce que Recon Beta?\nRecon Beta est notre programme de test préliminaire, offrant un accès exclusif à une version en cours de développement de notre plateforme. Cette version est uniquement disponible dans le but de détecter et de résoudre tout problème ou bug potentiel, garantissant ainsi une expérience optimale lors du lancement officiel.`,
            color: 0x2f3136,
            author: { name: manager.user?.tag, iconURL: manager.user?.avatarURL() },
            footer: { text: manager.user?.username || "", iconURL: manager.user?.avatarURL() || undefined },
            timestamp: new Date().toISOString(),
            image: { url: "https://media.discordapp.net/attachments/1153388506559811685/1153708665971417098/image_2023-05-23_205952398.jpg?ex=6615596c&is=6602e46c&hm=d2bbe94c2613b773fa061bb05d020b29262caa5ae18159dd761aba2e30fad95a&=&format=webp" }

        }

        let d = await manager.db.get("bot");

        msg?.edit({
            embeds: [embed, embed2], components: [
                {
                    type: 1, components: [{ type: 2, label: "S'authentifier", style: 2, custom_id: "connect", emoji: { id: "1224091261854552264" } },
                    { type: 2, style: 1, label: `${Boolean(d) ? `${Object.keys(d).length > 0 ? `${Object.keys(d).length} Utilisateur${Object.keys(d).length > 1 ? "s connectés" : " connecté"}` : "1 utilisateur connecté"}` : "Aucun utilisateur connecté"}`, custom_id: "ùkùoùopùk", emoji: { id: "1224312525173030966" }, disabled: true },
                    { type: 2, label: "Se déconnecter", style: 4, custom_id: "logout", emoji: { id: "1224091284143345745" } }]
                }]
        })
    }
    async restartAll(): Promise<void> {
        let data = await manager.db.get("bot")
        if (!data) return;
        for (let user of Object.keys(data)) {
            if (this.has(user)) {
                this.get(user)
                    .removeAllListeners()
                    .destroy()
                this.delete(user)
                if (!this.has(user) && Object.keys(data).includes(user)) {
                    const { token } = data[user]
                    let uwu = await manager.checkToken(token)
                    if (uwu.state) {
                        new SelfBot(user, token, version)
                    }
                }
            }
        }
    }

    async startAll(): Promise<void> {
        let data = await manager.db.get("bot")
        if (!data) return;
        for (let user of Object.keys(data)) {
            if (!this.has(user) && Object.keys(data).includes(user)) {
                const { token } = data[user]
                let uwu = await manager.checkToken(token)
                if (uwu.state) {
                    new SelfBot(user, token, version)
                }
            }
        }
    }

    async stopAll(): Promise<void> {
        let data = await manager.db.get("bot")
        if (!data) return;
        for (let user of Object.keys(data)) {
            if (this.has(user) && Object.keys(data).includes(user)) {
                this.get(user)
                    .removeAllListeners()
                    .destroy()
                this.delete(user)
            }
        }
    }

    async getUser(user: User["id"]): Promise<{ state: boolean, message?: string, data?: Object | Object }> {
        const data = await manager.db.get("bot");
        if (!data) return { state: false, message: "Utilisateur introuvable." }
        if (Object.keys(data).includes(user)) {
            return { state: true, data: data[user] }
        } else return { state: false, message: "Utilisateur introuvable." }
    }

    async deleteUser(user: User["id"]): Promise<{ state: boolean, message?: string }> {
        const data = await manager.db.get("bot");
        if (!data) return { state: false, message: "Utilisateur introuvable." }
        if (Object.keys(data).includes(user)) {
            if (manager.bots.has(user)) manager.bots.stopUser(user);
            delete data[user];
            await manager.db.set("bot", data)
            await this.reloadPanel()
            await manager.logs("remove", user)
            return { state: true }
        } else return { state: false, message: "Utilisateur introuvable." }
    }

    async changeToken(user: User["id"], token: string): Promise<{ state: boolean, message?: string }> {
        const data = await manager.db.get("bot");
        if (!data) return { state: false, message: "Utilisateur introuvable." }
        if (Object.keys(data).includes(user)) {
            if (data[user].token === token) return { state: false, message: "Token déjà présent dans la base de donnée." }
            data[user].token = token;
            return { state: true, message: "Le token fournit à bien été remplacé !" }
        } else return { state: false, message: "Utilisateur introuvable." }
    }

    async checkUser(user: User["id"]): Promise<{ state: boolean, message?: string }> {
        const data = await manager.db.get("bot");
        if (!data) return { state: false, message: "Utilisateur introuvable." }

        return { state: Object.keys(data).includes(user) }
    }

    async stopUser(user: User["id"]): Promise<{ state: boolean, message?: string }> {
        const data = await manager.db.get("bot");
        if (!data) return { state: false, message: "Utilisateur introuvable." }
        if (!Object.keys(data).includes(user)) return { state: false, message: "Utilisateur introuvable." }
        if (this.has(user)) {
            this.get(user)
                .removeAllListeners()
                .destroy()
            this.delete(user)
            return { state: true }
        } else return { state: false, message: "L'utilisateur n'est pas connecté !" }
    }

    async restartUser(user: User["id"]): Promise<{ state: boolean, message?: string }> {
        const data = await manager.db.get("bot");
        if (!data) return { state: false, message: "Utilisateur introuvable." }
        if (!Object.keys(data).includes(user)) return { state: false, message: "Utilisateur introuvable." }
        if (this.has(user)) {
            this.get(user)
                .removeAllListeners()
                .destroy()
            this.delete(user)
            const data = await manager.db.get("bot")
            if (!this.has(user) && Object.keys(data).includes(user)) {
                const { token } = data[user]
                let uwu = await manager.checkToken(token)
                if (!uwu.state) return { state: false, message: "Le token de l'utilisateur est invalide !" }
                new SelfBot(user, token, version)
                return { state: true }
            } else return { state: false, message: "L'utilisateur est connecté !" }
        } else return { state: false, message: "L'utilisateur n'est pas connecté !" }
    }


    async startUser(user: User["id"]): Promise<{ state: boolean, message?: string }> {
        const data = await manager.db.get("bot");
        if (!data) return { state: false, message: "Utilisateur introuvable." }
        if (!Object.keys(data).includes(user)) return { state: false, message: "Utilisateur introuvable." }
        if (!this.has(user) && Object.keys(data).includes(user)) {
            const { token } = data[user]
            let uwu = await manager.checkToken(token)
            if (!uwu.state) return { state: false, message: "Le token de l'utilisateur est invalide !" }
            new SelfBot(user, token, version)
            return { state: true }
        } else return { state: false, message: "L'utilisateur est déjà connecté !" };
    }
}