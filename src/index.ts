import { Bot, Context } from "grammy";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { keyboardText } from "./keyboardText";
import { menu, userMenu } from "./userMenu";
import { commands } from "./actions";
import { toggle, toggleMenu } from "./toggleMenu";

const token = process.env.BOT_API!;

const bot = new Bot<Context>(token);

bot.command("start", keyboardText);

bot.use(menu);
bot.command("users", userMenu);

bot.api.setMyCommands(commands);

bot.hears("how are you", async (ctx) => {
  const message = ctx.message;
  ctx.reply("trying to do better");
});

bot.use(toggle);
bot.command("toggle", toggleMenu);

bot.on("message", async (ctx) => {
  console.log("ctx >>>", ctx);
  const message = ctx.message;
  ctx.reply(`message >>> ${message.text}`);
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!bot.isInited()) {
    await bot.init();
  }
  await bot.handleUpdate(req.body);

  console.log("req.body >>>", req.body);

  res.status(200).send("OK");
}
