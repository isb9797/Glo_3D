const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
        calcType = document.querySelector(".calc-type"),
        calcSquare = document.querySelector(".calc-square"),
        calcDay = document.querySelector(".calc-day"),
        calcCount = document.querySelector(".calc-count"),
        totalValue = document.getElementById("total");

        const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = +calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (squareValue === "" && calcDay === "" && calcCount === "") {
            totalValue.textContent = 0;
        }

        if (calcCount.value > 1) {
            countValue += (+calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        //Анимация для калькулятора
        const animateTotal = () => {
            let start = Date.now(); //? Начало анимации

            let timer = setInterval(() => {
                let timePassed = Date.now() - start;

                if (timePassed >= 1000) {
                    clearInterval(timer); //? закончить анимацию через 1 секунду
                    totalValue.textContent = total;
                    return;
                }

                // отрисовать анимацию на момент timePassed, прошедший с начала анимации
                draw(timePassed);

            }, 20);
            console.log(total);

            function draw(timePassed) {
                totalValue.textContent = timePassed ;
            }
        };

        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
            total = parseInt(total);
             animateTotal();
            totalValue.textContent = total;
        }

        totalValue.textContent = total;
        };
        calcBlock.addEventListener("change", (event) => {
        const target = event.target;
        
        if (target.matches("select") || target.matches("input")) {
            countSum();
            
        }
        });
};

export default calc;
