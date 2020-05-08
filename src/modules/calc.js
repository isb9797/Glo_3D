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
        let start = Date.now(); //? Начало анимации

        let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        if (timePassed >= 2000) {
            clearInterval(timer); //? закончить анимацию через 2 секунды
            return;
        }

        // отрисовать анимацию на момент timePassed, прошедший с начала анимации
        draw(timePassed);

        }, 20);

        function draw(timePassed) {
            totalValue.textContent = timePassed / 5;
        }
    };

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
        animateTotal();
        totalValue.textContent = total;
    }

    totalValue.textContent = 0;
    };
    calcBlock.addEventListener("change", (event) => {
    const target = event.target;

    if (target.matches("select") || target.matches("input")) {
        countSum();
    }
    });
};

export default calc;
