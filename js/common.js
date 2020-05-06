/* eslint-disable eqeqeq */
"use strict";
//? Lesson 25

window.addEventListener("DOMContentLoaded", () => {
    function countTimer(deadline) {
        const timerHours = document.querySelector("#timer-hours"),
            timerMinutes = document.querySelector("#timer-minutes"),
            timerSeconds = document.querySelector("#timer-seconds");

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000;

            let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60); //% 24,
            //day = Math.floor(imeRemaining / 60 / 60 / 24);

            if (hours < 10) {
                hours = "0" + hours;
            }

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            if (timer.timeRemaining > 0) {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
                return true;
            } else {
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
                return false;
            }
        }

        if (!updateClock()) {
            clearInterval(updateClock);
        } else {
            setInterval(updateClock, 1000);
        }
    }

    countTimer("30 june 2020");

    //Меню
    const toggleMenu = () => {
        const bodyHandler = document.querySelector("BODY"),
            menu = document.querySelector("menu");

        bodyHandler.addEventListener("click", element => {
            const target = element.target;

            if (target.closest(".menu")) {
                menu.classList.add("active-menu");
            } else if (
                !target.closest(".active-menu") ||
        target.matches(".close-btn") ||
        target.matches("a")
            ) {
                menu.classList.remove("active-menu");
            }
        });
    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector(".popup"),
            popupBtns = document.querySelectorAll(".popup-btn"),
            popupWindow = document.querySelector(".popup-content");

        popup.addEventListener("click", event => {
            let target = event.target;

            if (target.classList.contains("popup-close")) {
                popup.style.display = "none";
            } else {
                target = target.closest(".popup-content");
                if (!target) {
                    popup.style.display = "none";
                }
            }
        });

        popupBtns.forEach(elem => {
            elem.addEventListener("click", () => {
                if (document.documentElement.offsetWidth < 768) {
                    popup.style.display = "block";
                } else {
                    let defaultPercent = 100;

                    popupWindow.style.top = defaultPercent + "%";
                    popup.style.display = "block";

                    // eslint-disable-next-line no-unused-vars
                    let popAnimate;

                    const animationPopup = () => {
                        popAnimate = requestAnimationFrame(animationPopup);
                        defaultPercent -= 2;

                        if (defaultPercent > 10) {
                            popupWindow.style.top = defaultPercent + "%";
                        }
                    };
                    popAnimate = requestAnimationFrame(animationPopup);
                }
            });
        });
    };

    togglePopup();

    //Табы
    const tabs = () => {
        const tabHeader = document.querySelector(".service-header"),
            tab = tabHeader.querySelectorAll(".service-header-tab"),
            tabContent = document.querySelectorAll(".service-tab");
        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add("active");
                    tabContent[i].classList.remove("d-none");
                } else {
                    tab[i].classList.remove("active");
                    tabContent[i].classList.add("d-none");
                }
            }
        };
        tabHeader.addEventListener("click", event => {
            let target = event.target;
            target = target.closest(".service-header-tab"); //Ищет ближайший к ребенку класс родителя
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //Слайдер

    const slider = () => {
        const slide = document.querySelectorAll(".portfolio-item"),
            slider = document.querySelector(".portfolio-content"),
            dotsContainer = document.querySelector(".portfolio-dots");
        let currentSlide = 0,
            interval,
            dot;

        const addDot = () => {
            currentSlide = 0;
            for (let i = 0; i < slide.length; i++) {
                const liDot = document.createElement("li");
                dotsContainer.appendChild(liDot);
                liDot.classList.add("dot");

                if (i === 0) {
                    liDot.classList.add("dot-active");
                }
            }
            dot = document.querySelectorAll(".dot");
        };

        addDot();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        //автоплей
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, "portfolio-item-active");
            nextSlide(dot, currentSlide, "dot-active");
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener("click", event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches("#arrow-right, #arrow-left, .dot")) {
                return;
            }

            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");

            if (target.matches("#arrow-right")) {
                currentSlide++;
            } else if (target.matches("#arrow-left")) {
                currentSlide--;
            } else if (target.matches(".dot")) {
                dot.forEach((element, index) => {
                    if (element === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, "portfolio-item-active");
            nextSlide(dot, currentSlide, "dot-active");
        });

        slider.addEventListener("mouseover", event => {
            const target = event.target;
            if (target.matches(".portfolio-btn") || target.matches(".dot")) {
                stopSlide();
            }
        });

        slider.addEventListener("mouseout", event => {
            const target = event.target;
            if (target.matches(".portfolio-btn") || target.matches(".dot")) {
                startSlide();
            }
        });

        startSlide();
    };

    slider();

    const changePhotoCommand = () => {
        const photoCommandContainer = document.querySelector("#command");
        let targetSrc;
        photoCommandContainer.addEventListener("mouseover", event => {
            const target = event.target;
            targetSrc = target.src;

            if (target.classList.contains("command__photo")) {
                target.src = target.dataset.img;
            }
        });

        photoCommandContainer.addEventListener("mouseout", event => {
            const target = event.target;

            if (target.classList.contains("command__photo")) {
                target.src = targetSrc;
            }
        });
    };

    //Смена фото при наведении

    changePhotoCommand();

    //Проверка на число и на ИМЯ
    const checkInputNum = () => {
        const calcBlock = document.querySelector(".calc-block");

        calcBlock.addEventListener("input", event => {
            const target = event.target;

            if (target.classList.contains("calc-item") && target.matches("input")) {
                const text = target.value;
                target.value = text.replace(/\d{10}/, "");
            }
        });
    };

    //! Функция проверки номера больше не нужна
    const phoneChecker = selector => {
        const searchBlocks = document.querySelectorAll(selector);

        searchBlocks.forEach(elem => {
            elem.setAttribute("autocomplete", "off");
            elem.addEventListener("input", event => {
                const target = event.target;

                const text = target.value;

                const regExp = /[+0-9]$/g;

                if (regExp.test(text)) {
                    return false;
                } else {
                    target.value = target.value.slice(0, -1);
                }
            });

            elem.addEventListener("change", event => {
                const target = event.target;
                const regExp = /[+0-9]$/g;
                if (!regExp.test(target.value)) {
                    target.value = "";
                }
            });
        });
    };
    //!
    const checkInputWord = selector => {
        const searchBlocks = document.querySelectorAll(selector);

        searchBlocks.forEach(elem => {
            elem.setAttribute("autocomplete", "off");
            elem.addEventListener("input", event => {
                const target = event.target;

                const text = target.value;

                const regExp = /[A-Za-z\d^!@#$%&*()_:"]$/g;

                if (!regExp.test(text)) {
                    return false;
                } else {
                    target.value = target.value.slice(0, -1);
                }
            });

            elem.addEventListener("change", event => {
                const target = event.target;
                const regExp = /^[A-Za-z^!@#$%&*()_:"][0-9]$/g;
                if (regExp.test(target.value)) {
                    target.value = "";
                }
            });
        });
    };

    checkInputNum();
    checkInputWord("#form1-name, #form2-name, #form3-name, .mess");

    //Калькулятор на сайте
    const calc = (price = 100) => {
        const calcBlock = document.querySelector(".calc-block"),
            calcType = document.querySelector(".calc-type"),
            calcSquare = document.querySelector(".calc-square"),
            calcDay = document.querySelector(".calc-day"),
            calcCount = document.querySelector(".calc-count"),
            totalValue = document.getElementById("total");

        const countSum = () => {
            let total = 0,
                countAnimate = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = +calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (squareValue === "" && calcDay === "" && calcCount === "") {
                totalValue.textContent = 0;
            }

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            //Анимация для калькулятора
            const animateTotal = () => {
                countAnimate += 10;
                totalValue.textContent = countAnimate;

                if (countAnimate < total) {
                    requestAnimationFrame(animateTotal);
                }
            };

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
                requestAnimationFrame(animateTotal);
            }

            totalValue.textContent = 0;
        };
        calcBlock.addEventListener("change", event => {
            const target = event.target;

            if (target.matches("select") || target.matches("input")) {
                countSum();
            }
        });
    };

    calc(100);

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = "Что-то пошло не так...",
            loadMessage = "Загрузка...",
            successMessage = "Спасибо! Мы скоро с вами свяжемся!";

        const forms = document.querySelectorAll("form");
        const bodyHtml = document.querySelector("body");

        //? Генерирую прелоадер из скомпилированого SCSS
        const loader = () => `
            <style>
            .preloader__container {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.8);
                height: 100%;
                width: 100%;
                z-index: 10;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-content: space-around;
                top: 0;
            }
            
            .sk-folding-cube {
                width: 4em;
                height: 4em;
                position: relative;
                margin: auto;
                transform: rotateZ(45deg);
            }
            
            .sk-folding-cube .sk-cube {
                float: left;
                width: 50%;
                height: 50%;
                position: relative;
                transform: scale(1.1);
            }
            
            .sk-folding-cube .sk-cube:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #337ab7;
                animation: sk-folding-cube-angle 2.4s infinite linear both;
                transform-origin: 100% 100%;
            }
            
            .sk-folding-cube .sk-cube-2 {
                transform: scale(1.1) rotateZ(90deg);
            }
            
            .sk-folding-cube .sk-cube-3 {
                transform: scale(1.1) rotateZ(180deg);
            }
            
            .sk-folding-cube .sk-cube-4 {
                transform: scale(1.1) rotateZ(270deg);
            }
            
            .sk-folding-cube .sk-cube-2:before {
                animation-delay: 0.3s;
            }
            
            .sk-folding-cube .sk-cube-3:before {
                animation-delay: 0.6s;
            }
            
            .sk-folding-cube .sk-cube-4:before {
                animation-delay: 0.9s;
            }
            
            @keyframes sk-folding-cube-angle {
                0%, 10% {
                    transform: perspective(140px) rotateX(-180deg);
                    opacity: 0;
                }
            
                25%, 75% {
                    transform: perspective(140px) rotateX(0deg);
                    opacity: 1;
                }
            
                90%, 100% {
                    transform: perspective(140px) rotateY(180deg);
                    opacity: 0;
                }
            }
			</style>
			<section></section>
			<div class="preloader">
				<div class="preloader__container">
                    <div class='sk-folding-cube'>
                        <div class='sk-cube sk-cube-1'></div>
                        <div class='sk-cube sk-cube-2'></div>
                        <div class='sk-cube sk-cube-3'></div>
                        <div class='sk-cube sk-cube-4'></div>
                    </div>
				</div>
			</div>
			`;

        const statusMessage = document.createElement("div");
        statusMessage.classList.add("status-message");
        statusMessage.style.cssText = "font-size: 2rem; color: #fff";

        //? Метод для общения с сервером и передачи данных формы (Принимает данные в обычном формате и отправляет JSON)
        const postData = body =>
            new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();

                request.addEventListener("readystatechange", () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
                });

                request.open("POST", "./server.php");
                request.setRequestHeader("Content-Type", "application/json");

                request.send(JSON.stringify(body));
            });

        //? Форма удаляю сообщение о статусе
        const removeStatusMessage = () => {
            const status = document.querySelector(".status-message");
            if (!status) return;
            setTimeout(() => {
                status.remove();
            }, 5000);
        };

        //? Добавляю слушателей для форм
        forms.forEach(form => {
            form.addEventListener("input", event => {
                const target = event.target;
                if (target.name === "user_phone") {
                    target.value = target.value.replace(/[^+\d]/g, "");
                }

                if (target.name === "user_name" || target.name === "user_message") {
                    target.value = target.value.replace(/[^а-яА-Я ]/gi, "");
                }
            });

            form.addEventListener("submit", event => {
                event.preventDefault();
                form.insertAdjacentElement("beforeend", statusMessage);
                //! Можно выключить, но есть уже прелоадер
                statusMessage.textContent = loadMessage;
                //!
                bodyHtml.insertAdjacentHTML("beforeend", loader());
                const loaderHtml = document.querySelector(".preloader");

                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                const outputData = () => {
                    removeStatusMessage();
                    statusMessage.textContent = successMessage;
                    form.reset();
                    loaderHtml.remove();
                };

                const error = () => {
                    removeStatusMessage();
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                    loaderHtml.remove();
                };

                //? Выполняю отправку данных на сервер
                postData(body).then(outputData).catch(error);
            });
        });
    };

    sendForm();
});
