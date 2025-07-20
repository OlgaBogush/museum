export default function sliderWelcome() {
  // slider for welcome section

  const prev = document.querySelector(".arrow-left")
  const next = document.querySelector(".arrow-right")

  const items = document.querySelector(".item-container")

  let slides = items.getElementsByClassName("welcome-item")
  let firstSlide = slides[0]
  let lastSlide = slides[slides.length - 1]
  let cloneFirst = firstSlide.cloneNode(true)
  let cloneLast = lastSlide.cloneNode(true)
  let slidesLength = slides.length

  items.prepend(cloneLast)
  items.append(cloneFirst)

  prev.addEventListener("click", shiftSlidePrev)
  next.addEventListener("click", shiftSlideNext)
  items.addEventListener("transitionend", checkIndex)

  let posInitial
  let slideSize = items.getElementsByClassName("welcome-item")[0].offsetWidth
  let index = 0
  let allowShift = true

  let progressItem = document.querySelectorAll(".square")
  progressItem[index].classList.add("active")

  progressItem.forEach((el, i) => el.addEventListener("click", () => {
    if(index === i) {
      return
    }
    progressItem[index].classList.remove("active")
    items.classList.add("smooth")
    if (allowShift) {
      if(i === 0) {
        items.style.left = -slideSize + "px"
        posInitial = -slideSize
        index = 0
      }
      if(i === 1) {
        items.style.left = -slideSize * 2 + "px"
        posInitial = -slideSize * 2
        index = 1
      }
      if(i === 2) {
        items.style.left = -slideSize * 3 + "px"
        posInitial = -slideSize * 3
        index = 2
      }
      if(i === 3) {
        items.style.left = -slideSize * 4 + "px"
        posInitial = -slideSize * 4
        index = 3
      }
      if(i === 4) {
        items.style.left = -slideSize * 5 + "px"
        posInitial = -slideSize * 5
        index = 4
      }
    }
    allowShift = false
  }))

  function shiftSlidePrev() {
    progressItem[index].classList.remove("active")
    items.classList.add("smooth")
    posInitial = items.offsetLeft
    if (allowShift) {
      items.style.left = posInitial + slideSize + "px"
      posInitial = posInitial + slideSize
      index--
    }
    allowShift = false
  }

  function shiftSlideNext() {
    progressItem[index].classList.remove("active")
    items.classList.add("smooth")
    posInitial = items.offsetLeft
    if (allowShift) {
      items.style.left = posInitial - slideSize + "px"
      posInitial = posInitial - slideSize
      index++
    }
    allowShift = false
  }

  let numberActual = document.querySelector(".number-actual")
  let numberAll = document.querySelector(".number-all")
  numberActual.innerHTML = `0${index + 1}`
  numberAll.innerHTML = `0${slidesLength}`


  function checkIndex() {
    items.classList.remove("smooth")
    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px"
      index = slidesLength - 1
    }
    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px"
      index = 0
    }
    progressItem[index].classList.add("active")
    numberActual.innerHTML = `0${index + 1}`
    allowShift = true
  }

  // swiper

  items.addEventListener("mousedown", dragStart)

  let posX1 = 0
  let posX2 = 0
  let threshold = 100
  let posFinal

  function dragStart(event) {
    event.preventDefault()
    posInitial = items.offsetLeft
    if (event.type == "touchstart") {
      posX1 = event.touches[0].clientX
    } else {
      posX1 = event.clientX
      document.addEventListener("mouseup", dragEnd)
      document.addEventListener("mousemove", dragAction)
    }
  }

  function dragAction(event) {
    if (event.type == "touchmove") {
      posX2 = posX1 - event.touches[0].clientX
      posX1 = event.touches[0].clientX
    } else {
      posX2 = posX1 - event.clientX
      posX1 = event.clientX
    }
    items.style.left = items.offsetLeft - posX2 + "px"
  }

  function dragEnd() {
    posFinal = items.offsetLeft
    if (posFinal - posInitial < -threshold) {
      swipSlideNext()
    } else if (posFinal - posInitial > threshold) {
      swipSlidePrev()
    } else {
      items.style.left = posInitial + "px"
    }
    document.removeEventListener("mouseup", dragEnd)
    document.removeEventListener("mousemove", dragAction)
  }

  function swipSlideNext() {
    progressItem[index].classList.remove("active")
    items.classList.add("smooth")
    if (allowShift) {
      items.style.left = posInitial - slideSize + "px"
      posInitial = posInitial - slideSize
      index++
    }
    allowShift = false
  }

  function swipSlidePrev() {
    progressItem[index].classList.remove("active")
    items.classList.add("smooth")
    if (allowShift) {
      items.style.left = posInitial + slideSize + "px"
      posInitial = posInitial + slideSize
      index--
    }
    allowShift = false
  }
}
