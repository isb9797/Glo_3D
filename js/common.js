"use strict";
//Lesson 20

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

    countTimer("23 april 2020");

    //Меню
    const toggleMenu = () => {
        const bodyHandler = document.querySelector("BODY"),
            menu = document.querySelector("menu");

        bodyHandler.addEventListener("click", element => {
            const target = element.target;

            if (target.closest(".menu")) {
                menu.classList.add("active-menu");
            } else if (!target.closest(".active-menu") ||  target.matches(".close-btn") || target.matches("a")) {
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
});
