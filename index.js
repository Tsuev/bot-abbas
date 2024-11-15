import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";

const API_KEY_BOT = "7992513284:AAH55hQ6ph3Ttkq-sBDJAJ6L2zC5zVi6Xqs";
const API_KEY_OPENAI =
  "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";

const MAGA = 7308891764;

const bot = new TelegramBot(API_KEY_BOT, {
  polling: true,
});

const openai = new OpenAI({ apiKey: API_KEY_OPENAI });

let num = 0;
let gameIsActive = false;

bot.on("text", async (msg) => {
  try {
    // const regex = /(^|[^a-zA-Z0-9])([Ал1а]бба[зс])($|[^a-zA-Z0-9])/;

    // if (msg.from.id === MAGA && regex.test(msg.text)) {
    //   const completion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content:
    //           "Ты участник телеграм чата, тебе написал величайший генерал из игры Command & Conquer: Generals по имени Мага, отдай честь и только потом отвечай на его вопрос и помни что тебя зовут lаббаз, отвечай коротко и в разговорном стиле",
    //       },
    //       {
    //         role: "user",
    //         content: msg.text,
    //       },
    //     ],
    //   });

    //   await bot.sendMessage(chatId, completion.choices[0].message, {
    //     reply_to_message_id: msg.message_id,
    //   });

    //   return;
    // }

    // if (regex.test(msg.text)) {
    //   console.log(msg.text);

    //   const completion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content:
    //           "Ты участник телеграм чата, отвечай коротко и в разговорном стиле, помни что тебя зовут lаббаз",
    //       },
    //       {
    //         role: "user",
    //         content: msg.text,
    //       },
    //     ],
    //   });

    //   await bot.sendMessage(chatId, completion.choices[0].message, {
    //     reply_to_message_id: msg.message_id,
    //   });
    // }

    if ("/game" === msg.text) {
      gameIsActive = true;
      num = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      bot.sendMessage(
        msg.chat.id,
        "Я задумал рандомное число от 1 до 100, попробуй его угадать"
      );
    }

    if (gameIsActive && +msg.text) {
      if (+msg.text > num)
        bot.sendMessage(msg.chat.id, `Моё число меньше чем ${msg.text}`, {
          reply_to_message_id: msg.message_id,
        });

      if (+msg.text < num)
        bot.sendMessage(msg.chat.id, `Моё число больше чем ${msg.text}`, {
          reply_to_message_id: msg.message_id,
        });

      if (+msg.text === num) {
        bot.sendMessage(msg.chat.id, `Ты угадал это ${msg.text} 🎆`, {
          reply_to_message_id: msg.message_id,
        });
        gameIsActive = false;
      }
    }
  } catch (error) {
    console.log(error.error.message);
  }
});
