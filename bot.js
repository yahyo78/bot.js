const TelegramBot = require('node-telegram-bot-api');

const token = '8123036885:AAFxc0DhrdHwbdScOliNsdx_d4q_dwrFaII';
const bot = new TelegramBot(token, { polling: true });

console.log('Bot is running... 🚀');

// Объект барои нигоҳдории фармоишҳои фаровон
const userOrders = {};

// 👋 Паёми оғоз бо /start ё /салом
bot.onText(/\/(start|салом)/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeText = `
Вᴏ аᴧᴇᴋʍ ᴄаᴧᴏʍ 😎  
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

// 📦 Менюи асосӣ
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  if (query.data === "diamonds") {
    bot.editMessageText(`
💎 Нархномаи Алмазҳо — Free Fire ⚡️

☄️ 105💎 — 12 сомонӣ  
☄️ 210💎 — 23 сомонӣ  
☄️ 326💎 — 35 сомонӣ  
☄️ 546💎 — 56 сомонӣ  
☄️ 1113💎 — 110 сомонӣ  
☄️ 2398💎 — 225 сомонӣ  
☄️ 6160💎 — 555 сомонӣ  

👇 Барои фармоиш, тугмаи зерро пахш кунед ва Айди ё никнейми бозиятонро фиристед!
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🛒 Фармоиш диҳед", callback_data: "order_diamonds" }],
          [{ text: "🔙 Бозгашт", callback_data: "back_to_main" }]
        ]
      }
    });
  }
  else if (query.data === "vouchers") {
    bot.editMessageText(`
🎟️ Ваучерҳо:

🗓️ 1 ҳафта (450💎) — 17 сомонӣ  
🗓️ 1 моҳ (2600💎) — 120 сомонӣ

👇 Барои фармоиш, тугмаи зерро пахш кунед!
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🛒 Фармоиш диҳед", callback_data: "order_vouchers" }],
          [{ text: "🔙 Бозгашт", callback_data: "back_to_main" }]
        ]
      }
    });
  }
  else if (query.data === "passes") {
    bot.editMessageText(`
💠 Пропускҳо:

🔥 Пропуск Прокачки (1270💎) — 51 сомонӣ  
🏆 Booyah Пропуск (100lvl) — 70 сомонӣ

👇 Барои фармоиш, тугмаи зерро пахш кунед!
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🛒 Фармоиш диҳед", callback_data: "order_passes" }],
          [{ text: "🔙 Бозгашт", callback_data: "back_to_main" }]
        ]
      }
    });
  }
  else if (query.data === "payment") {
    bot.editMessageText(`
💳 Маълумот барои пардохт:

🏦 Дуɯᴀнбᴇ Citi — 000222812  
💰 Алиф Кошелек — 000222812  

⚠️ Лутфан:
- Пулро бе фоиз гузаронед!  
- Чекро ҳатман фиристед!  
- Айди бозӣ ё никнеймро нависед!

🔙 Ба менюи асосӣ бозгардед:
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔙 Бозгашт", callback_data: "back_to_main" }]
        ]
      }
    });
  }
  else if (query.data === "back_to_main") {
    bot.editMessageText(`
Вᴏ аᴧᴇᴋʍ ᴄаᴧᴏʍ 😎  
🌟 Ба боти фурӯши Алмазҳои Free Fire хуш омадед!

📦 Ин ҷо метавонед 💎 Алмаз, 🎟️ Ваучер ва 💠 Пропуск харед!

👇 Аз меню интихоб кунед:
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "💎 Алмазҳо", callback_data: "diamonds" }],
          [{ text: "🎟️ Ваучерҳо", callback_data: "vouchers" }],
          [{ text: "💠 Пропускҳо", callback_data: "passes" }],
          [{ text: "💳 Маълумот барои пардохт", callback_data: "payment" }]
        ]
      }
    });
  }
  else if (query.data.startsWith("order_")) {
    const productType = query.data.replace("order_", "");
    
    // Нигоҳ доштани навъи маҳсулот барои корбар
    if (!userOrders[chatId]) {
      userOrders[chatId] = {};
    }
    userOrders[chatId].productType = productType;
    userOrders[chatId].step = 'awaiting_id';

    bot.sendMessage(chatId, `
📝 Фармоиши ${getProductName(productType)}

Лутфан Айди ё Никнейми бозии худро фиристед:

⚠️ Диққат: Айди/Никнеймро дуруст ворид кунед!
    `);
  }
});

// Гирифтани ID/Никнейм аз корбар
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Агар паём матн бошад ва корбар дар ҳоли ворид кардани ID бошад
  if (userOrders[chatId] && userOrders[chatId].step === 'awaiting_id' && !text.startsWith('/')) {
    userOrders[chatId].playerId = text;
    userOrders[chatId].step = 'awaiting_payment';

    bot.sendMessage(chatId, `
✅ Айди/Никнейм қабул шуд: ${text}

💰 Лутфан пардохт кунед:

🏦 Дуɯᴀнбᴇ Citi: 000222812  
💰 Алиф Кошелек: 000222812

💳 Пас аз пардохт, чек (скрин ё акс)-ро фиристед!

⚠️ Дар чек нависед: ${text}
    `);
  }

  // Агар корбар чек фиристед (фото)
  if (msg.photo && userOrders[chatId] && userOrders[chatId].step === 'awaiting_payment') {
    const photo = msg.photo[msg.photo.length - 1];
    
    bot.sendMessage(chatId, `
✅ Чек қабул шуд! 

📦 Фармоиши шумо барои таҳия фиристода шуд:

🎮 Айди/Никнейм: ${userOrders[chatId].playerId}
📦 Навъ: ${getProductName(userOrders[chatId].productType)}

⏳ Лутфан мунтазир бошед, дар ҳолати мушкилот бо мо дар тамос бошед:

📞 Пуштибони: @username
    `);

    // Фиристодани огоҳӣ ба админ (агар лозим бошад)
    // bot.sendMessage(ADMIN_CHAT_ID, `Фармоиши нав: ${getProductName(userOrders[chatId].productType)} | Айди: ${userOrders[chatId].playerId} | Чат: ${chatId}`);

    // Пок кардани маълумоти фармоиш
    delete userOrders[chatId];
  }
});

// Функсия барои гирифтани номи маҳсулот
function getProductName(type) {
  const names = {
    'diamonds': '💎 Алмазҳо',
    'vouchers': '🎟️ Ваучерҳо', 
    'passes': '💠 Пропускҳо'
  };
  return names[type] || 'Маҳсулот';
}