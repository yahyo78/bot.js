const TelegramBot = require('node-telegram-bot-api');

// 🔑 Token-и худро гузор
const token = '8123036885:AAFxc0DhrdHwbdScOliNsdx_d4q_dwrFaII';

// ▶️ Ботро фаъол мекунем
const bot = new TelegramBot(token, { polling: true });

// 💡 Барои санҷиш дар консол
console.log('Bot is running... 🚀');

// 👋 Паёми оғози бот
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeText = `
Вᴏ ᴀᴧᴇᴋʍ ᴄᴀᴧᴏʍ 😎  
🌟 Ба боти фурӯши Алмазҳои Free Fire хуш омадед!

📦 Ин ҷо метавонед 💎 Алмаз, 🎟️ Ваучер ва 💠 Пропуск харед!

👇 Аз меню интихоб кунед:
  `;

  bot.sendMessage(chatId, welcomeText, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💎 Алмазҳо", callback_data: "diamonds" }],
        [{ text: "🎟️ Ваучерҳо", callback_data: "vouchers" }],
        [{ text: "💠 Пропускҳо", callback_data: "passes" }],
        [{ text: "💳 Маълумот барои пардохт", callback_data: "payment" }]
      ]
    }
  });
});

// 📦 Менюи Алмазҳо ва дигарҳо
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "diamonds") {
    bot.sendMessage(chatId, `
💎 Нархномаи Алмазҳо — Free Fire ⚡️

☄️ 105💎 — 12 сомонӣ  
☄️ 210💎 — 23 сомонӣ  
☄️ 326💎 — 35 сомонӣ  
☄️ 546💎 — 56 сомонӣ  
☄️ 1113💎 — 110 сомонӣ  
☄️ 2398💎 — 225 сомонӣ  
☄️ 6160💎 — 555 сомонӣ  

📩 Барои фармоиш: Айди ё никнейми бозиятро фирист!
    `);
  }
  else if (query.data === "vouchers") {
    bot.sendMessage(chatId, `
🎟️ Ваучерҳо:

🗓️ 1 ҳафта (450💎) — 17 сомонӣ  
🗓️ 1 моҳ (2600💎) — 120 сомонӣ
    `);
  }
  else if (query.data === "passes") {
    bot.sendMessage(chatId, `
💠 Пропускҳо:

🔥 Пропуск Прокачки (1270💎) — 51 сомонӣ  
🏆 Booyah Пропуск (100lvl) — 70 сомонӣ
    `);
  }
  else if (query.data === "payment") {
    bot.sendMessage(chatId, `
💳 Маълумот барои пардохт:

🏦 Дуɯᴀнбᴇ Citi — 000222812  
💰 Алиф Кошелек — 000222812  

⚠️ Лутфан:
- Пулро бе фоиз гузаронед!  
- Чекро ҳатман фиристед!  
- Айди бозӣ ё никнеймро нависед!
    `);
  }
});