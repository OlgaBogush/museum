export default function toggleBurger() {
  const burgerIcon = document.querySelector(".burger-icon")
  const burgerMenu = document.querySelector(".burger-menu")
  const burgerOverlay = document.querySelector(".burger-overlay")
  const welcomeTitle = document.querySelector(".welcome-title")

  burgerIcon.addEventListener("click", () => {
    if (burgerIcon.classList.contains("active")) {
      hideMenu()
    } else {
      openMenu()
    }
    burgerMenu.addEventListener("click", () => {
      hideMenu()
    })
    burgerOverlay.addEventListener("click", () => {
      hideMenu()
    })
  })

  function openMenu() {
    burgerIcon.classList.add("active")
    burgerMenu.classList.add("open")
    burgerOverlay.classList.add("active")
    welcomeTitle.classList.add("hidden")
    document.documentElement.style.overflow = "hidden"
  }
  function hideMenu() {
    burgerIcon.classList.remove("active")
    burgerMenu.classList.remove("open")
    burgerOverlay.classList.remove("active")
    welcomeTitle.classList.remove("hidden")
    document.documentElement.style.overflow = ""
  }

}
