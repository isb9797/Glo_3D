"use strict";

//? Подключение полифилов для IE
import "nodelist-foreach-polyfill";
import "@babel/polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import "formdata-polyfill";
import "es6-promise";
import "es6-promise";
import "fetch-polyfill"
import "remove-polyfill"

//? Подключение основных модулей
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhotoCommand from './modules/changePhotoCommand';
import checkInputNum from './modules/checkInputNum';
import checkInputWord from './modules/checkInputWord';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


//? Обратный отсчет
countTimer();

//?Меню
toggleMenu();

//?popup
togglePopup();

//?Табы
tabs();

//?Слайдер
slider();

//?Смена фото при наведении
changePhotoCommand();

checkInputNum();
checkInputWord("#form1-name, #form2-name, #form3-name, .mess");

//?Калькулятор на сайте
calc(100);

//?send-ajax-form
sendForm();
