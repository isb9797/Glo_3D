const togglePopup = () => {
    const popup = document.querySelector(".popup"),
    popupBtns = document.querySelectorAll(".popup-btn"),
    popupWindow = document.querySelector(".popup-content");

    popup.addEventListener("click", (event) => {
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

    popupBtns.forEach((elem) => {
    elem.addEventListener("click", () => {
        if (document.documentElement.offsetWidth < 768) {
        popup.style.display = "block";
        } else {
        let defaultPercent = 100;

        popupWindow.style.top = defaultPercent + "%";
        popup.style.display = "block";

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

export default togglePopup;
