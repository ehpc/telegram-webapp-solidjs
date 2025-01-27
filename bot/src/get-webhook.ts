import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config({
  path: "./.dev.vars",
});

const bot = new Telegraf(process.env.BOT_TOKEN as string);

(async () => {
  // get webhook info
  await bot.telegram.getWebhookInfo().then(console.log);
})();
