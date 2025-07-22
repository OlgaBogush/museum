export default function popup() {
  const popup = document.querySelector(".popup")
  const overlay = document.querySelector(".overlay")
  const popupClose = document.querySelector(".modal-close")
  const buyButton = document.querySelector(".tickets-button")

  buyButton.addEventListener("click", openPopup)
  popupClose.addEventListener("click", closePopup)
  overlay.addEventListener("click", closePopup)

  function openPopup() {
    popup.classList.add("active")
    overlay.classList.add("active")
    document.documentElement.style.overflow = "hidden"
  }

  function closePopup() {
    popup.classList.remove("active")
    overlay.classList.remove("active")
    document.documentElement.style.overflow = ""
  }














}
