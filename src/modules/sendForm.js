const sendForm = () => {
  const errorMessage = "Что-то пошло не так...",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";

  const forms = document.querySelectorAll("form");
  const bodyHtml = document.querySelector("body");

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

  const url = "./server.php";

  const postData = (body) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

  const removeStatusMessage = () => {
    const status = document.querySelector(".status-message");
    if (!status) return;
    setTimeout(() => {
      status.remove();
    }, 5000);
  };

  forms.forEach((form) => {
    form.addEventListener("input", (event) => {
      const target = event.target;
      if (target.name === "user_phone") {
        target.value = target.value.replace(/[^+\d]/g, "");
      }

      if (target.name === "user_name" || target.name === "user_message") {
        target.value = target.value.replace(/[^а-яА-Я ]/gi, "");
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.insertAdjacentElement("beforeend", statusMessage);

      statusMessage.textContent = loadMessage;

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

      postData(body)
        .then((outputData) => {
          if (outputData.status !== 200) {
            setTimeout(() => {
              loaderHtml.remove();
            }, 3000);

            setTimeout(() => {
              statusMessage.remove();
            }, 8000);
            

            throw new Error("Status is not OK");
          } else {
            setTimeout(() => {
                  loaderHtml.remove();
                  statusMessage.textContent = successMessage;
              }, 3000);
              setTimeout(() => {
                  statusMessage.remove();
              }, 8000);

          }
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });
  });
};

export default sendForm;
