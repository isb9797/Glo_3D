/* eslint-disable strict */

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

