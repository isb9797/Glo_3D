"use strict";
//Lesson 18.1

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
        const btnMenu = document.querySelector(".menu"),
            menu = document.querySelector("menu"),
            closeBtn = document.querySelector(".close-btn"),
            menuItems = menu.querySelectorAll("ul>li");

        const actionMenu = () => {
            menu.classList.toggle("active-menu");
        };
        btnMenu.addEventListener("click", actionMenu);

        closeBtn.addEventListener("click", actionMenu);

        menuItems.forEach(elem => {
            elem.addEventListener("click", actionMenu);
        });
    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector(".popup"),
            popupBtns = document.querySelectorAll(".popup-btn"),
            popupClose = document.querySelector(".popup-close"),
            popupWindow = document.querySelector(".popup-content");

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

        popupClose.addEventListener("click", () => {
            popup.style.display = "none";
        });
    };

    togglePopup();
});
