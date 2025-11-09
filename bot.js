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
💎 Интихоби Алмазҳо — Free Fire ⚡️

Лутфан як аз варианҳои зеринро интихоб кунед:
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "☄️ 105💎 - 12 сомонӣ", callback_data: "diamond_105" }],
          [{ text: "☄️ 210💎 - 23 сомонӣ", callback_data: "diamond_210" }],
          [{ text: "☄️ 326💎 - 35 сомонӣ", callback_data: "diamond_326" }],
          [{ text: "☄️ 546💎 - 56 сомонӣ", callback_data: "diamond_546" }],
          [{ text: "☄️ 1113💎 - 110 сомонӣ", callback_data: "diamond_1113" }],
          [{ text: "☄️ 2398💎 - 225 сомонӣ", callback_data: "diamond_2398" }],
          [{ text: "☄️ 6160💎 - 555 сомонӣ", callback_data: "diamond_6160" }],
          [{ text: "🔙 Бозгашт", callback_data: "back_to_main" }]
        ]
      }
    });
  }
  else if (query.data === "vouchers") {
    bot.editMessageText(`
🎟️ Интихоби Ваучерҳо

Лутфан як аз варианҳои зеринро интихоб кунед:
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🗓️ 1 ҳафта (450💎) - 17 сомонӣ", callback_data: "voucher_week" }],
          [{ text: "🗓️ 1 моҳ (2600💎) - 120 сомонӣ", callback_data: "voucher_month" }],
          [{ text: "🔙 Бозгашт", callback_data: "back_to_main" }]
        ]
      }
    });
  }
  else if (query.data === "passes") {
    bot.editMessageText(`
💠 Интихоби Пропускҳо

Лутфан як аз варианҳои зеринро интихоб кунед:
    `, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔥 Пропуск Прокачки (1270💎) - 51 сомонӣ", callback_data: "pass_elite" }],
          [{ text: "🏆 Booyah Пропуск (100lvl) - 70 сомонӣ", callback_data: "pass_booyah" }],
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
  else if (query.data.startsWith("diamond_") || query.data.startsWith("voucher_") || query.data.startsWith("pass_")) {
    // Обработка выбора конкретного товара
    handleProductSelection(query);
  }
});

// Функсия барои коркарди интихоби маҳсулот
function handleProductSelection(query) {
  const chatId = query.message.chat.id;
  const productData = query.data;

  // Маълумоти маҳсулот
  const products = {
    'diamond_105': { name: '105 Алмаз', price: 12, amount: 105, type: 'diamond' },
    'diamond_210': { name: '210 Алмаз', price: 23, amount: 210, type: 'diamond' },
    'diamond_326': { name: '326 Алмаз', price: 35, amount: 326, type: 'diamond' },
    'diamond_546': { name: '546 Алмаз', price: 56, amount: 546, type: 'diamond' },
    'diamond_1113': { name: '1113 Алмаз', price: 110, amount: 1113, type: 'diamond' },
    'diamond_2398': { name: '2398 Алмаз', price: 225, amount: 2398, type: 'diamond' },
    'diamond_6160': { name: '6160 Алмаз', price: 555, amount: 6160, type: 'diamond' },
    'voucher_week': { name: 'Ваучер 1 ҳафта', price: 17, amount: '450💎', type: 'voucher' },
    'voucher_month': { name: 'Ваучер 1 моҳ', price: 120, amount: '2600💎', type: 'voucher' },
    'pass_elite': { name: 'Пропуск Прокачки', price: 51, amount: '1270💎', type: 'pass' },
    'pass_booyah': { name: 'Booyah Пропуск', price: 70, amount: '100lvl', type: 'pass' }
  };

  const product = products[productData];
  
  if (!userOrders[chatId]) {
    userOrders[chatId] = {};
  }
  
  userOrders[chatId].currentProduct = product;
  userOrders[chatId].step = 'awaiting_id';

  // Генерация URL для оплаты
  const paymentUrl = `http://pay.expresspay.tj/?A=9762000004720255&s=&c=&f1=133&FIELD2=${product.price}&FIELD3=${chatId}`;

  bot.sendMessage(chatId, `
🎮 Фармоиши: ${product.name}
💵 Нарх: ${product.price} сомонӣ
📦 Миқдор: ${product.amount}

👇 Барои идома, лутфан Айди ё Никнейми бозии худро фиристед:

⚠️ Диққат: Айди/Никнеймро дуруст ворид кунед!
  `, {
    reply_markup: {
      inline_keyboard: [
        [{ text: `💳 Пардохти ${product.price} сомонӣ`, url: paymentUrl }],
        [{ text: "🔙 Бозгашт ба категория", callback_data: product.type + "s" }]
      ]
    }
  });
}

// Гирифтани ID/Никнейм аз корбар
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Агар паём матн бошад ва корбар дар ҳоли ворид кардани ID бошад
  if (userOrders[chatId] && userOrders[chatId].step === 'awaiting_id' && !text.startsWith('/')) {
    const product = userOrders[chatId].currentProduct;
    userOrders[chatId].playerId = text;
    userOrders[chatId].step = 'completed';

    const paymentUrl = `http://pay.expresspay.tj/?A=9762000004720255&s=&c=&f1=133&FIELD2=${product.price}&FIELD3=${chatId}`;

    bot.sendMessage(chatId, `
✅ Айди/Никнейм қабул шуд: ${text}

📦 Маълумоти фармоиш:
🎮 Маҳсулот: ${product.name}
💵 Нарх: ${product.price} сомонӣ
👤 Айди/Никнейм: ${text}

💰 Лутфан пардохт кунед:
    `, {
      reply_markup: {
        inline_keyboard: [
          [{ text: `💳 Пардохти ${product.price} сомонӣ`, url: paymentUrl }],
          [{ text: "📞 Пуштибонӣ", url: "https://t.me/your_support" }]
        ]
      }
    });

    // Истинод барои пардохт
    bot.sendMessage(chatId, `
🔗 Истиноди пардохт: ${paymentUrl}

💳 Пас аз пардохт, чек (скрин ё акс)-ро фиристед!

⚠️ Дар чек нависед: ${text}
    `);
  }

  // Агар корбар чек фиристед (фото)
  if (msg.photo && userOrders[chatId] && userOrders[chatId].step === 'completed') {
    const product = userOrders[chatId].currentProduct;
    
    bot.sendMessage(chatId, `
✅ Чек қабул шуд! 

📦 Фармоиши шумо барои таҳия фиристода шуд:

🎮 Маҳсулот: ${product.name}
👤 Айди/Никнейм: ${userOrders[chatId].playerId}
💵 Маблағ: ${product.price} сомонӣ

⏳ Лутфан мунтазир бошед, дар ҳолати мушкилот бо мо дар тамос бошед:

📞 Пуштибони: @username
    `);

    // Пок кардани маълумоти фармоиш
    delete userOrders[chatId];
  }
});