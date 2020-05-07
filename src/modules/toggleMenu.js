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

export default toggleMenu;