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

export default changePhotoCommand;