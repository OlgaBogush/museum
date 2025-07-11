// slider

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

let progressItem = document.querySelectorAll(".square")
progressItem[index].classList.add("active")

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

// compare

function initComparisons() {
  var x, i

  x = document.getElementsByClassName("explore-overlay")

  for (i = 0; i < x.length; i++) {
    compareImages(x[i])
  }

  function compareImages(img) {
    var slider,
      img,
      clicked = 0,
      w,
      h
    w = img.offsetWidth
    h = img.offsetHeight
    img.style.width = w / 2 + "px"

    slider = document.createElement("DIV")
    slider.setAttribute("class", "explore-slider")

    img.parentElement.insertBefore(slider, img)

    slider.style.top = h / 2 - slider.offsetHeight / 2 + "px"
    slider.style.left = w / 2 - slider.offsetWidth / 2 + "px"

    slider.addEventListener("mousedown", slideReady)
    window.addEventListener("mouseup", slideFinish)
    slider.addEventListener("touchstart", slideReady)
    window.addEventListener("touchstop", slideFinish)

    function slideReady(e) {
      e.preventDefault()
      clicked = 1
      window.addEventListener("mousemove", slideMove)
      window.addEventListener("touchmove", slideMove)
    }

    function slideFinish() {
      clicked = 0
    }

    function slideMove(e) {
      var pos
      if (clicked == 0) return false
      pos = getCursorPos(e)
      if (pos < 0) pos = 0
      if (pos > w) pos = w
      slide(pos)
    }

    function getCursorPos(e) {
      var a,
        x = 0
      e = e || window.e
      a = img.getBoundingClientRect()
      x = e.pageX - a.left
      x = x - window.scrollX
      return x
    }

    function slide(x) {
      img.style.width = x + "px"
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px"
    }
  }
}

initComparisons()


// video player
const player = document.querySelector(".video-player")
const video = document.querySelector(".video-poster")
const playIcon = document.querySelector(".play-icon")
const buttonPlay = document.querySelector(".button-play")
const buttonPause = document.querySelector(".button-pause")
const buttonVolume = document.querySelector(".button-volume")
const buttonMute = document.querySelector(".button-mute")
const fullScreen = document.querySelector(".button-fullscreen")
const fullExit = document.querySelector(".button-fullexit")


function togglePlay() {
  const method = video.paused ? "play" : "pause"
  video[method]()
}

function updateButton() {
  if(this.paused) {
    playIcon.style.display = "block"
    buttonPause.style.display = "none"
    buttonPlay.style.display = "block"
  } else {
    playIcon.style.display = "none"
    buttonPlay.style.display = "none"
    buttonPause.style.display = "block"
  }
}

function toggleMute() {
  if(video.muted) {
    video.muted = false
    buttonMute.style.display = "none"
    buttonVolume.style.display = "block"
  } else {
    video.muted = true
    buttonVolume.style.display = "none"
    buttonMute.style.display = "block"
  }
}

function toggleFullScreen() {
  if(document.fullscreenElement) {
    document.exitFullscreen()
    fullScreen.style.display = "block"
    fullExit.style.display = "none"
  } else {
    player.requestFullscreen()
    fullScreen.style.display = "none"
    fullExit.style.display = "block"
  }
}

video.addEventListener("click", togglePlay)
playIcon.addEventListener("click", togglePlay)
buttonPlay.addEventListener("click", togglePlay)
buttonPause.addEventListener("click", togglePlay)

video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)
buttonVolume.addEventListener("click", toggleMute)
buttonMute.addEventListener("click", toggleMute)
fullScreen.addEventListener("click", toggleFullScreen)
fullExit.addEventListener("click", toggleFullScreen)