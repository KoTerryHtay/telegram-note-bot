import { Menu } from "@grammyjs/menu";
import { CommandContext, Context } from "grammy";

const notifications = new Set<number>();

function toggleNotifications(id: number) {
  if (!notifications.delete(id)) notifications.add(id);
}

export const toggle = new Menu("toggle").text(
  (ctx) => (ctx.from && notifications.has(ctx.from.id) ? "🔔" : "🔕"),
  (ctx) => {
    toggleNotifications(ctx.from.id);
    ctx.menu.update(); // update the menu!
  }
);

export async function toggleMenu(ctx: CommandContext<Context>) {
  await ctx.reply("Users", { reply_markup: toggle });
}
