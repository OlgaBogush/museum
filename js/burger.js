export default function toggleBurger() {

  const burgerIcon = document.querySelector(".burger-icon")
  const burgerMenu = document.querySelector(".burger-menu")
  const welcomeTitle = document.querySelector(".welcome-title")

  burgerIcon.addEventListener("click", () => {
    burgerIcon.classList.toggle("active")
    if(burgerIcon.classList.contains("active")) {
      welcomeTitle.classList.add("hidden")
      burgerMenu.classList.add("open")
    } else {
      welcomeTitle.classList.remove("hidden")
      burgerMenu.classList.remove("open")
    }
  })
}