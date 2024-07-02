import { CommandContext, Context, Keyboard } from "grammy";

const keyboard = new Keyboard()
  .text("/start")
  .text("/users")
  .text("/toggle")
  .resized();

export async function keyboardText(ctx: CommandContext<Context>) {
  await ctx.reply("Welcome", {
    reply_markup: keyboard,
  });
}
