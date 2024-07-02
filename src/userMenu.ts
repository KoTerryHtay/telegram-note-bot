import { Menu, MenuRange } from "@grammyjs/menu";
import getUser from "./actions/getUsers";
import { CommandContext, Context } from "grammy";

export const menu = new Menu("user-menu");

const settings = new Menu("credits-menu")
  .text("Show Credits", async (ctx) => {
    ctx.reply("Powered by grammY");
  })
  .row()
  .back("Go Back");

menu
  .dynamic(async () => {
    const range = new MenuRange();

    const users = await getUser();

    users.map((user) => {
      range
        .text(`${user.userName}`, (ctx) => {
          const posts = user.post.map(
            (post, index) => `${index + 1}. ${post.post}`
          );

          console.log("user posts >>>", posts);

          ctx.reply(`
            User name : ${user.userName}\n\n ${posts.join("\n")}`);
        })
        .row();
    });

    return range;
  })
  .submenu("Credits", "credits-menu")
  .text("Cancel", (ctx) => ctx.deleteMessage())
  .register(settings);

export async function userMenu(ctx: CommandContext<Context>) {
  await ctx.reply("Users", { reply_markup: menu });
}
