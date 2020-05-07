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

export default checkInputNum