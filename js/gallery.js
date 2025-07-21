export default function gallery() {
  const array = new Array(15).fill(null).map((_, index) => index + 1)

  const pictureContainer = document.querySelector(".picture-inner-container")

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
  }

  const shuffledArray = shuffle(array)

  shuffledArray.map((item) => {
    const imgElement = document.createElement("img")
    imgElement.classList.add("picture-image")
    imgElement.src = `./assets/images/galery/${item}.jpg`
    imgElement.alt = `galery${item}`
    pictureContainer.append(imgElement)
  })

  const pictureImages = document.querySelectorAll(".picture-image")

  function animItems() {
    if (pictureImages.length < 15) return
    pictureImages.forEach((item) => {
      if (
        item.getBoundingClientRect().top <
        document.documentElement.clientHeight - item.offsetHeight / 4
      ) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", animItems)
  window.addEventListener("DOMContentLoaded", animItems)
}
