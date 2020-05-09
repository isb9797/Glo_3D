const scrollId = () => {
  const anchors = document.querySelectorAll('a[href*="#"]')
  //! Не работает в IE, но ошибок не пораждает => пусть живет)
  for (let anchor of anchors) {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      
      const blockID = anchor.getAttribute('href').substr(1);
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}

export default scrollId;