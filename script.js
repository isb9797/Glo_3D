'use strict';

const bodyTimer = document.querySelector('body');

function getWeekDay(date) {
    date = new Date();
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const day = date.getDay();

    bodyTimer.insertAdjacentHTML('beforeend', `<p>Сегодня: ${days[day]}</p>`);
    bodyTimer.append();
}


function getHour() {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour <= 6) {
        bodyTimer.insertAdjacentHTML('beforeend', '<p>Доброй ночи</p>');

    } else if (hour >= 6 && hour <= 12) {
        bodyTimer.insertAdjacentHTML('beforeend', '<p>Доброе утро</p>');

    } else if (hour >= 12 && hour <= 15) {
        bodyTimer.insertAdjacentHTML('beforeend', '<p>Добрый день</p>');

    } else if (hour >= 15 && hour <= 23) {
        bodyTimer.insertAdjacentHTML('beforeend', '<p>Добрый вечер</p>');

    }




}

function getTime() {
    const date = new Date(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();


    bodyTimer.insertAdjacentHTML('beforeend', `<p>Сейчас: ${hour} часов ${minutes} минут ${seconds} секунд  </p>`);

}

function newYearDown() {
    const date = new Date(),
        newDate = Date.parse('01 january 2021'),
        nowDate = Date.parse(date);

    let happyDate = Math.floor(((newDate - nowDate) / 1000) / 60 / 60 / 24);

    if (happyDate === 0) {
        happyDate = 0;
    }





    bodyTimer.insertAdjacentHTML('beforeend', `<p>До Нового Года осталось: ${happyDate} дней  </p>`);

}

getHour();
getWeekDay();
getTime();
newYearDown();

