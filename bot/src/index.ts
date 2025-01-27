import { Telegraf } from "telegraf";
import { link } from "telegraf/format";
import { Application, Router } from "@cfworker/web";
import createTelegrafMiddleware from "cfworker-middleware-telegraf";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  console.log("start");
  return ctx.reply("Welcome");
});

bot.help((ctx) => {
  console.log("help");
  return ctx.reply("Send me a sticker");
});

bot.hears("hi", (ctx) => {
  console.log("hi");
  return ctx.reply("Hey there");
});

bot.command("webapp", (ctx) => {
  console.log("Opening webapp", WEBAPP_URL, "chat id:", ctx.chat.id);
  const chatId = ctx.chat.id;
  const params = {
    chatId,
  };
  const jsonParams = JSON.stringify(params);
  const base64Params = Buffer.from(jsonParams).toString("base64url");
  return ctx.reply(link("Launch", `${WEBAPP_URL}?startapp=${base64Params}`));
});

// Init webhook route
const router = new Router();
router.post(`/${SECRET_PATH}`, createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();
