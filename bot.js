const { Telegraf, Markup } = require('telegraf');


const bot = new Telegraf(process.env.BOT_TOKEN_30DAYS);


// Команда /start
bot.start((ctx) => {
    ctx.reply('Добро пожаловать в квиз! Нажмите на кнопку ниже, чтобы начать.', Markup.keyboard([
        [Markup.button.webApp('Начать квиз', 'https://sam5213.github.io/30-days-twa-quiz-day8')]
    ]));
    console.log('Приступили к квизу.. ');
});


const userIds = {
    user1: process.env.USER1_ID, 
    user2: 'USER2_ID'  // Заменить на еще реальный ID пользователя
};

// Обработчик для получения данных из веб-приложения
bot.on('web_app_data', (ctx) => {
    console.log('Начнем обработку... ');
    try {
        console.log('Щааа');
        const data = ctx.message.web_app_data.data;
        console.log('Полученные данные:', data);
        const parsedData = JSON.parse(data); // Парсим данные
        console.log('Распарсенные данные:', parsedData);
        const currentUser = ctx.from.id;
        const message = `Пользователь ${currentUser ? ctx.from.username : currentUser} прошел квиз. В качестве ответов выбирал: ${parsedData.resultsToSend}`; // Формируем сообщение
        console.log(message);

        // Отправляем сообщение другому пользователю
        console.log('Отправляем в чат:', userIds.user1);
        bot.telegram.sendMessage(userIds.user1, message) 
            .then(() => {
                ctx.reply('Ваш ответ был отправлен нам.');
            })
            .catch((error) => {
                console.error('Ошибка при отправке сообщения:', error);
                ctx.reply('Произошла ошибка при отправке сообщения.');
            });
    } catch (error) {
        console.error('Ошибка при обработке данных:', error);
        ctx.reply('Произошла ошибка при обработке вашего ответа.');
    }
});


bot.launch()
    .then(() => {
        console.log("Бот запущен!");
    })
    .catch((error) => {
        console.error("Ошибка при запуске бота: ", error);
    });
