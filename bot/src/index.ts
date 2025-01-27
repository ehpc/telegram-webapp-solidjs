import { Telegraf } from "telegraf";
import { Application, Router } from "@cfworker/web";
import createTelegrafMiddleware from "cfworker-middleware-telegraf";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  console.log('start');
  return ctx.reply("Welcome");
});

bot.help((ctx) => {
  console.log('help');
  return ctx.reply("Send me a sticker");
});

bot.hears("hi", (ctx) => {
  console.log('hi');
  return ctx.reply("Hey there");
});

// Init webhook route
const router = new Router();
router.post(`/${SECRET_PATH}`, createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();
